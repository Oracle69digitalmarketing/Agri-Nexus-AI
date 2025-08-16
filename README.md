Agri-Nexus AI
An on-premise, local-first AI agent powered by gpt-oss-20b that delivers critical agricultural and health information to underserved rural communities, bypassing internet connectivity barriers.
Table of Contents
 * Project Description
 * Features
 * Hackathon Categories
 * Technical Stack
 * Getting Started
 * Testing Instructions
 * License
Project Description
Agri-Nexus AI is a solution designed to solve the digital divide in rural areas. By leveraging the local-first capabilities and powerful reasoning of OpenAI's gpt-oss-20b model, this project creates a self-contained AI appliance. Running on low-cost hardware like a Raspberry Pi 5, the system provides instant, expert-level advice on everything from crop disease diagnosis to basic first aid, all without an internet connection. The model is fine-tuned on specialized domain knowledge, making it a highly accurate and indispensable tool for its target audience.
Features
 * Offline Operation: The entire system runs locally, making it ideal for areas with limited or no internet access.
 * Fine-Tuned Expertise: The gpt-oss-20b model is fine-tuned on custom datasets for rural agriculture and health, ensuring highly relevant and accurate responses.
 * Voice/Text Interface: Simple and intuitive interface designed for easy use by a broad audience.
 * Low-Cost Hardware: Built for deployment on affordable, single-board computers.
 * Agentic Capabilities: Leverages the model's native ability to retrieve information from a local vector database for context-aware responses.
Hackathon Categories
This project was built for the OpenAI Open Model Hackathon and is submitted under the following categories:
 * Best Local Agent: The project's core functionality is a completely offline, autonomous agent.
 * Most Useful Fine-Tune: The model's fine-tuning on specialized agri-tech and health data provides immediate and tangible value.
 * For Humanity: It directly benefits underserved communities by addressing a critical information gap.
 * Weirdest Hardware: The use of a Raspberry Pi as a dedicated AI appliance is an unconventional and creative application.
Technical Stack
 * Languages: Python
 * Frameworks: Ollama, FastAPI
 * Model: gpt-oss-20b
 * Hardware: Raspberry Pi 5 (optimized for), but can run on any consumer hardware with sufficient VRAM.
 * Database: Local Vector Store (FAISS)
Getting Started
These instructions will get a copy of the project up and running on your local machine.
 * Clone the repository:
   git clone https://github.com/Oracle69/Agri-Nexus-AI.git
cd Agri-Nexus-AI

 * Install dependencies:
   pip install -r requirements.txt

 * Download the model: Ensure Ollama is installed and running, then pull the model.
   ollama pull gpt-oss:20b

Testing Instructions
Follow these steps to test the application's core features.
 * Run the application:
   python app.py

   The application will launch on http://localhost:5000.
 * Verify Offline Capability:
   * Once the server is running, disconnect from the internet.
   * Submit a query (e.g., "What are the symptoms of cassava mosaic disease?").
   * The model should provide a detailed, accurate response, proving its independence from cloud-based services.
 * Test Fine-Tuned Responses:
   * Query the model with domain-specific questions that a general model might struggle with.
   * Example agriculture query: "How do I make organic fertilizer from farm waste?"
   * Example health query: "What's the immediate first aid for a snake bite?"
License
This project is licensed under the Apache 2.0 License.
