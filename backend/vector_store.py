import json
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
import os

def build_vector_store():
    """
    Builds a FAISS vector store from the knowledge base data.
    """
    APP_DIR = os.path.dirname(os.path.abspath(__file__))
    DATASET_PATH = os.path.join(APP_DIR, 'datasets', 'knowledge.json')
    VECTOR_STORE_DIR = os.path.join(APP_DIR, 'vector_store')
    INDEX_PATH = os.path.join(VECTOR_STORE_DIR, 'knowledge_base.index')
    DATA_PATH = os.path.join(VECTOR_STORE_DIR, 'knowledge_base.json')

    print("Loading knowledge base...")
    try:
        with open(DATASET_PATH, 'r') as f:
            knowledge_base = json.load(f)
    except FileNotFoundError:
        print(f"Error: {DATASET_PATH} not found.")
        return

    print("Extracting text for embedding...")
    # We'll embed the questions to find relevant answers.
    texts = [item['question'] for item in knowledge_base]

    print("Loading sentence transformer model...")
    # Using a lightweight model suitable for CPU.
    model = SentenceTransformer('all-MiniLM-L6-v2')

    print("Creating embeddings... (This may take a while)")
    embeddings = model.encode(texts, convert_to_numpy=True)
    embeddings = np.array(embeddings).astype('float32')

    # Dimension of embeddings
    d = embeddings.shape[1]

    print(f"Building FAISS index with {len(texts)} vectors of dimension {d}...")
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)

    # Create directory for storing the index if it doesn't exist
    if not os.path.exists(VECTOR_STORE_DIR):
        os.makedirs(VECTOR_STORE_DIR)

    print(f"Saving FAISS index to {INDEX_PATH}...")
    faiss.write_index(index, INDEX_PATH)

    print("Saving knowledge base data for retrieval...")
    with open(DATA_PATH, 'w') as f:
        json.dump(knowledge_base, f)

    print("\nVector store built successfully!")
    print(f"Total entries: {len(knowledge_base)}")
    print(f"Index file: backend/vector_store/knowledge_base.index")
    print(f"Data file: backend/vector_store/knowledge_base.json")

if __name__ == '__main__':
    build_vector_store()
