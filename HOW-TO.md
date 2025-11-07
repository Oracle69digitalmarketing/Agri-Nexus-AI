# How to Build and Deploy Agri-Nexus AI

This document outlines the steps required to build, test, and deploy the Agri-Nexus AI application.

## 1. Setting Up the Development Environment

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.9 or higher)
- pip
- npm
- Docker

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI.git
   cd Agri-Nexus-AI
   ```
2. **Install backend dependencies:**
   ```bash
   pip install -r backend/requirements.txt
   ```
3. **Install frontend dependencies:**
   ```bash
   npm install
   ```
4. **Build the vector store:**
   ```bash
   python backend/vector_store.py
   ```

## 2. Running the Application

### Backend
To start the FastAPI server, run the following command from the root directory:
```bash
python backend/app.py
```
The API documentation will be available at `http://localhost:8000/docs`.

### Frontend
To start the React development server, run the following command from the root directory:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 3. Running with Docker

To build and run the application with Docker, use the following commands:

1. **Build the Docker image:**
   ```bash
   docker build -t agri-nexus-ai .
   ```
2. **Run the Docker container:**
   ```bash
   docker run -p 8000:8000 agri-nexus-ai
   ```
The application will be available at `http://localhost:8000`.

## 4. Running Tests

To run the test suite, use the following command:
```bash
npm test
```
This will execute all the tests in the `src/components/__tests__` directory.

## 5. Aligning with the GenAI for Good Challenge

To align the project with the GenAI for Good Challenge, follow these steps:

1. **Update the project documentation:**
   - Modify the `README.md` file to reflect the project's new strategic positioning as an official GENIE.AI-aligned pilot under ITU's "Connecting the World and Beyond" vision.
   - Emphasize the project's alignment with GENIE.AI's core principles, such as open source, GovStack alignment, and inclusive language design.
2. **Create a `HOW-TO.md` file:**
   - This file should provide clear and concise instructions on how to build, test, and deploy the application.
   - It should also include a section on how to align the project with the GenAI for Good Challenge.
3. **Update the technical design document:**
   - Modify the `Agri-Nexus-AI-Technical-Design.md` file to include a section on how the project leverages the GENIE.AI framework.
   - Highlight the project's use of a RAG pipeline, modular AI stack, and other GENIE.AI components.
4. **Update the project's pitch:**
   - When submitting to the challenge, emphasize the project's alignment with ITU's open-source public AI stack and its support for ITU-D's inclusive development agenda.
   - Tie the project back to the WTDC 2025 (World Telecommunication Development Conference) to showcase its potential for global impact.
