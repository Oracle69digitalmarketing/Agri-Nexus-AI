#!/bin/bash
cd "$(dirname "$0")"
echo "Installing dependencies..."
pip install -r requirements.txt

echo "Building FAISS index..."
python vector_store.py

echo "Starting FastAPI server..."
uvicorn app:app --host 0.0.0.0 --port 8000
