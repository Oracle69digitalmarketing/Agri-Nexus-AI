import faiss
import json
import numpy as np
from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import os
import random
import subprocess

# Initialize FastAPI app
app = FastAPI(
    title="Agri-Nexus AI Backend",
    description="Offline-first AI agent for agricultural and health intelligence.",
    version="1.0.0"
)

# --- CORS Configuration ---
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AI Model and Vector Store Loading ---
APP_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.index')
DATA_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.json')

print("Loading sentence transformer model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded.")

index = None
knowledge_base = []

if os.path.exists(INDEX_PATH) and os.path.exists(DATA_PATH):
    print(f"Loading FAISS index from {INDEX_PATH}...")
    index = faiss.read_index(INDEX_PATH)
    print("Index loaded.")

    print(f"Loading knowledge base data from {DATA_PATH}...")
    with open(DATA_PATH, 'r') as f:
        knowledge_base = json.load(f)
    print(f"{len(knowledge_base)} knowledge base entries loaded.")
else:
    print("Warning: Vector store not found.")
    print("Please run 'python backend/vector_store.py' to build it.")

# --- Pydantic Models ---
class AskRequest(BaseModel):
    query: str

class AskResponse(BaseModel):
    answer: str
    confidence: float
    context: list[str]

class SystemMetrics(BaseModel):
    cpu_usage: int
    memory_usage: int
    storage_usage: int
    temperature: int
    is_online: bool

class KnowledgeBaseStats(BaseModel):
    total_entries: int
    categories: list[dict]

class KnowledgeSearchRequest(BaseModel):
    category: str

class VoiceRequest(BaseModel):
    audio_data: bytes

class SyncRequest(BaseModel):
    dataset_url: str

# --- API Endpoints ---

@app.get("/health", summary="Health Check")
def read_root():
    return {"status": "ok"}

@app.post("/api/ask", response_model=AskResponse, summary="Query the AI Agent")
def ask(request: AskRequest):
    if not index or not knowledge_base:
        raise HTTPException(status_code=500, detail="Vector store not loaded. Please build it first.")

    query_embedding = model.encode([request.query], convert_to_numpy=True).astype('float32')
    k = 3
    distances, indices = index.search(query_embedding, k)

    retrieved_context = [knowledge_base[i] for i in indices[0]]
    context_for_response = [f"Q: {c['question']}\nA: {c['answer']}" for c in retrieved_context]

    # --- Real GPT-OSS Response via Ollama ---
    context_text = "\n\n".join(context_for_response)
    prompt = f"{request.query}\n\nContext:\n{context_text}"

    try:
        result = subprocess.run(
            ["ollama", "run", "gpt-oss:20b"],
            input=prompt.encode("utf-8"),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=60
        )

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Ollama error: {result.stderr.decode('utf-8')}")

        gpt_response = result.stdout.decode("utf-8").strip()

    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="GPT-OSS model timed out.")

    avg_distance = np.mean(distances[0])
    confidence = max(0.0, 1 - (avg_distance / 100))

    return {
        "answer": gpt_response,
        "confidence": round(confidence, 2),
        "context": context_for_response
    }

@app.get("/api/system-status", response_model=SystemMetrics, summary="Get System Metrics")
def get_system_status():
    return {
        "cpu_usage": random.randint(15, 50),
        "memory_usage": random.randint(20, 60),
        "storage_usage": random.randint(40, 80),
        "temperature": random.randint(40, 60),
        "is_online": random.choice([True, False])
    }

@app.get("/api/knowledge-base-stats", response_model=KnowledgeBaseStats, summary="Get Knowledge Base Statistics")
def get_kb_stats():
    if not knowledge_base:
        raise HTTPException(status_code=500, detail="Knowledge base not loaded.")

    category_counts = {}
    for item in knowledge_base:
        category = item.get("category", "Uncategorized")
        category_counts[category] = category_counts.get(category, 0) + 1

    categories = [{"name": name, "count": count} for name, count in category_counts.items()]

    return {
        "total_entries": len(knowledge_base),
        "categories": categories
    }

@app.post("/api/knowledge-base/search", summary="Search Knowledge Base by Category")
def search_kb(request: KnowledgeSearchRequest):
    if not knowledge_base:
        raise HTTPException(status_code=500, detail="Knowledge base not loaded.")

    results = [item for item in knowledge_base if item.get("category") == request.category]
    return results

@app.post("/api/voice", summary="Voice Query (Placeholder)")
def voice_query(request: VoiceRequest):
    raise HTTPException(status_code=501, detail="Voice interface not implemented yet.")

@app.post("/api/sync", summary="Sync New Datasets (Placeholder)")
def sync_data(request: SyncRequest):
    raise HTTPException(status_code=501, detail="Data sync not implemented yet.")

if __name__ == '__main__':
    import uvicorn
    print("Starting FastAPI server...")
    print("API documentation will be available at http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
