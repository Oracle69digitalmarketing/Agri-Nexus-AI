import faiss
import json
import numpy as np
from sentence_transformers import SentenceTransformer
import os

# --- Configuration ---
APP_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATHS = [
    os.path.join(APP_DIR, 'datasets', 'knowledge.json'),
    os.path.join(APP_DIR, 'datasets', 'lesotho_knowledge.json')
]
INDEX_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.index')
JSON_PATH = os.path.join(APP_DIR, 'vector_store', 'knowledge_base.json')
MODEL_NAME = 'all-MiniLM-L6-v2'

def build_vector_store():
    """
    Builds and saves a FAISS index and a JSON file for the knowledge base.
    """
    # --- 1. Load Knowledge Base ---
    print("Loading knowledge base...")
    knowledge_base = []
    for path in DATASET_PATHS:
        if not os.path.exists(path):
            print(f"Warning: Dataset not found at {path}")
            continue
        with open(path, 'r') as f:
            knowledge_base.extend(json.load(f))

    if not knowledge_base:
        print("Error: No knowledge base data found.")
        return

    # --- 2. Extract Text for Embedding ---
    print("Extracting text for embedding...")
    texts_to_embed = [
        f"Question: {item['question']} Answer: {item['answer']}"
        for item in knowledge_base
    ]

    # --- 3. Load Sentence Transformer Model ---
    print("Loading sentence transformer model...")
    model = SentenceTransformer(MODEL_NAME)

    # --- 4. Create Embeddings ---
    print("Creating embeddings... (This may take a while)")
    embeddings = model.encode(texts_to_embed, convert_to_numpy=True).astype('float32')

    # --- 5. Build FAISS Index ---
    embedding_dimension = embeddings.shape[1]
    print(f"Building FAISS index with {len(knowledge_base)} vectors of dimension {embedding_dimension}...")
    index = faiss.IndexFlatL2(embedding_dimension)
    index.add(embeddings)

    # --- 6. Save FAISS Index and Knowledge Base JSON ---
    os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)

    print(f"Saving FAISS index to {INDEX_PATH}...")
    faiss.write_index(index, INDEX_PATH)

    print("Saving knowledge base data for retrieval...")
    with open(JSON_PATH, 'w') as f:
        json.dump(knowledge_base, f, indent=2)

    print("\nVector store built successfully!")
    print(f"Total entries: {len(knowledge_base)}")
    print(f"Index file: {INDEX_PATH}")
    print(f"Data file: {JSON_PATH}")

if __name__ == '__main__':
    build_vector_store()
