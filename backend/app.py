import faiss
import json
import numpy as np
from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import os
import random

# Initialize FastAPI app
app = FastAPI(
    title="Agri-Nexus AI Backend",
    description="Offline-first AI agent for agricultural and health intelligence.",
    version="1.0.0"
)

# --- CORS Configuration ---
# Allows the frontend to communicate with this backend
origins = [
    "http://localhost:5173",  # Default Vite dev server port
    "http://localhost:3000",  # Common React dev server port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AI Model and Vector Store Loading ---
# Determine the absolute path to the vector store files
APP_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.index')
DATA_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.json')

# Load the sentence transformer model
# Using a lightweight model suitable for CPU.
print("Loading sentence transformer model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded.")

# Load the FAISS index and knowledge base data
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

# --- Pydantic Models for API ---
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

# --- API Endpoints ---

@app.get("/health", summary="Health Check")
def read_root():
    """
    Health check endpoint to confirm the server is running.
    """
    return {"status": "ok"}

@app.post("/api/ask", response_model=AskResponse, summary="Query the AI Agent")
def ask(request: AskRequest):
    """
    Receives a query, finds relevant context from the vector store,
    and returns a simulated AI-generated answer.
    """
    if not index or not knowledge_base:
        raise HTTPException(status_code=500, detail="Vector store not loaded. Please build it first.")

    query_embedding = model.encode([request.query], convert_to_numpy=True).astype('float32')

    # Search the FAISS index for the 3 most similar vectors
    k = 3
    distances, indices = index.search(query_embedding, k)

    # Retrieve the context from the knowledge base
    retrieved_context = [knowledge_base[i] for i in indices[0]]
    context_for_response = [f"Q: {c['question']}\nA: {c['answer']}" for c in retrieved_context]

    # --- Mocked Generative AI Response ---
    # In a real system, the query and context would be sent to a large language model
    # like GPT-OSS-20B. Here, we simulate this by combining the retrieved answers.
    simulated_answer = "Based on the available information:\n\n"
    for item in retrieved_context:
        simulated_answer += f"- {item['answer']}\n"

    # Simulate confidence based on the distance from the query vector
    # (closer distance = higher confidence)
    avg_distance = np.mean(distances[0])
    confidence = max(0.0, 1 - (avg_distance / 100)) # Simple scaling for confidence

    return {
        "answer": simulated_answer,
        "confidence": round(confidence, 2),
        "context": context_for_response
    }

@app.get("/api/system-status", response_model=SystemMetrics, summary="Get System Metrics")
def get_system_status():
    """
    Returns simulated system metrics for the host machine.
    In a real application, this would read from system files or use a library like `psutil`.
    """
    return {
        "cpu_usage": random.randint(15, 50),
        "memory_usage": random.randint(20, 60),
        "storage_usage": random.randint(40, 80),
        "temperature": random.randint(40, 60),
        "is_online": random.choice([True, False]) # Simulate online/offline status
    }

@app.get("/api/knowledge-base-stats", response_model=KnowledgeBaseStats, summary="Get Knowledge Base Statistics")
def get_kb_stats():
    """
    Returns statistics about the knowledge base, including a list of categories.
    """
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

class KnowledgeSearchRequest(BaseModel):
    category: str

@app.post("/api/knowledge-base/search", summary="Search Knowledge Base by Category")
def search_kb(request: KnowledgeSearchRequest):
    """
    Searches the knowledge base for entries in a specific category.
    """
    if not knowledge_base:
        raise HTTPException(status_code=500, detail="Knowledge base not loaded.")

    results = [item for item in knowledge_base if item.get("category") == request.category]

    return results

# --- Placeholder Endpoints from Documentation ---

class VoiceRequest(BaseModel):
    audio_data: bytes # This would be more complex in reality

class SyncRequest(BaseModel):
    dataset_url: str

@app.post("/api/voice", summary="Voice Query (Placeholder)")
def voice_query(request: VoiceRequest):
    """
    Placeholder for the voice query endpoint.
    A real implementation would require audio processing libraries.
    """
    raise HTTPException(status_code=501, detail="Voice interface not implemented yet.")

@app.post("/api/sync", summary="Sync New Datasets (Placeholder)")
def sync_data(request: SyncRequest):
    """
    Placeholder for the data synchronization endpoint.
    A real implementation would download, process, and re-index data.
    """
    raise HTTPException(status_code=501, detail="Data sync not implemented yet.")

if __name__ == '__main__':
    import uvicorn
    print("Starting FastAPI server...")
    print("API documentation will be available at http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
