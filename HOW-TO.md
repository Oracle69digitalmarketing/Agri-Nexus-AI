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

## 2. Running the Application without Docker

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

## 3. Building and Running with Docker

The `Dockerfile` in this project is designed to create a self-contained, optimized image that runs the entire application.

### Step 1: Build the Docker Image

To build the Docker image, run the following command from the root directory of the project:
```bash
docker build -t agri-nexus-ai .
```

**What this command does:**
*   `docker build`: The command to build a Docker image from a `Dockerfile`.
*   `-t agri-nexus-ai`: The `-t` flag tags the image with the name `agri-nexus-ai`, making it easy to reference later.
*   `.`: This specifies the build context (the current directory), giving Docker access to all project files.

This command will execute the multi-stage build defined in the `Dockerfile`:
1.  **Stage 1 (Frontend Build):** It builds the React application and creates optimized static files.
2.  **Stage 2 (Final Image):** It copies the backend code and the built frontend files into a lightweight Python image, discarding all the build-time dependencies to keep the image small and secure.

### Step 2: Run the Docker Container

Once the build is complete, you can run the application as a container with this command:
```bash
docker run -p 8000:8000 agri-nexus-ai
```

**What this command does:**
*   `docker run`: The command to start a new container from an image.
*   `-p 8000:8000`: This maps port `8000` on your host machine to port `8000` inside the container, allowing you to access the application.
*   `agri-nexus-ai`: The name of the image to run.

The application will now be available at **`http://localhost:8000`**.

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
