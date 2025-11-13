# Agri-Nexus AI: Technical Design & RAG Architecture

This document outlines the technical design for the **Agri-Nexus AI**, a specialized version of the GENIE.AI framework tailored for the Agriculture Extension Chatbot for Lesotho.

## 1. System Overview

Agri-Nexus AI is an AI-powered chatbot designed to provide real-time, context-aware agricultural advice to farmers in Lesotho. It leverages a Retrieval-Augmented Generation (RAG) pipeline to deliver accurate information via multiple channels, including WhatsApp, SMS, and a web-based interface.

### Key Features:
- **Localized Knowledge Base:** Curated data on Lesotho's specific crops, weather patterns, and market prices.
- **Multilingual Support:** Hybrid understanding of Sesotho and English.
- **Multi-channel Access:** Delivers information through WhatsApp, SMS, and a web app.
- **Farmer Profiling:** Personalizes advice based on farmer's region, crops, and historical queries.
- **Admin Dashboard:** Monitors usage and gathers insights for continuous improvement.

## 2. Alignment with the GENIE.AI Framework

Agri-Nexus AI is built on the principles of the **GENIE.AI framework**, ITU's open-source AI infrastructure for public services. The project is a real-world implementation of GENIE.AI's mission, which is to democratize access to AI in the public sector, reduce vendor dependency, and promote sovereign, transparent AI systems.

The project leverages the following GENIE.AI components:

- **Frontend UI:** A modular chatbot interface built with React and Tailwind CSS.
- **Backend API:** A FastAPI-based backend that handles RAG queries, authentication, and data access.
- **RAG Engine:** A LangChain-based RAG pipeline that uses a vector store (FAISS) and a large language model (LLM) to generate responses.
- **Model Hub:** A connection to local or cloud-based LLMs, such as Llama 3.1 or GPT-4.
- **Containerization:** A Dockerized deployment that is ready for the cloud.

## 3. RAG Pipeline Architecture

The core of Agri-Nexus AI is its RAG pipeline, which is built on the GENIE.AI framework. This pipeline ensures that the responses are not only contextually relevant but also grounded in factual, localized agricultural data.

```mermaid
graph TD
    A[Farmer Query via WhatsApp/SMS/Web] --> B{Query Pre-processing};
    B --> C[Language Detection & Translation];
    C --> D{Intent Classification};
    D --> E[Hybrid Keyword & Semantic Search];
    E --> F{Vector Store (FAISS)};
    F --> G[Retrieve Top-K Documents];
    G --> H{LLM Prompt Augmentation};
    H --> I[Response Generation (GPT/Llama)];
    I --> J{Post-processing & Formatting};
    J --> K[Deliver Response];

    subgraph "Data Ingestion & Processing"
        L[Lesotho Agri Data Sources] --> M{ETL Pipeline};
        M --> N[Text Chunking & Cleaning];
        N --> O[Embedding Generation];
        O --> P{Vector Store Population};
        P --> F;
    end
```

### Pipeline Stages:
1. **Query Pre-processing:** User queries are standardized, and farmer metadata (e.g., location, crop type) is attached.
2. **Language Detection & Translation:** Hugging Face models detect the language (Sesotho/English) and translate if necessary.
3. **Intent Classification:** A fine-tuned model identifies the user's intent (e.g., "pest control," "market prices").
4. **Hybrid Search:** Both keyword-based and semantic search are used to query the vector store for relevant documents.
5. **Document Retrieval:** The top-K most relevant documents are retrieved from the FAISS-powered vector store.
6. **Prompt Augmentation:** The retrieved documents are combined with the user's query and a pre-defined prompt template.
7. **Response Generation:** The augmented prompt is sent to a large language model (LLM) like GPT-4 or Llama 3.1 to generate a response.
8. **Post-processing:** The response is formatted for the specific delivery channel (e.g., plain text for SMS, rich text for the web app).
9. **Response Delivery:** The final response is sent to the user via the appropriate channel.

## 4. Tech Stack

The technology stack is based on the GENIE.AI framework, with specific additions for the Lesotho context.

- **Backend:** Python, FastAPI
- **Frontend:** React, Tailwind CSS
- **RAG Pipeline:** LangChain, FAISS
- **Database:** SQLite (for farmer profiles), ChromaDB (for vector store)
- **AI Models:**
  - **Embeddings:** `all-MiniLM-L6-v2`
  - **LLM:** Llama 3.1 / GPT-4-turbo
  - **Translation:** Hugging Face models
- **Multi-channel Delivery:** Twilio (SMS/WhatsApp), Vocode (Voice)
- **Deployment:** Docker, AWS/Azure/GCP

## 5. Data Ingestion and Management

The knowledge base is built from a variety of localized data sources. The ETL (Extract, Transform, Load) pipeline processes these sources and populates the vector store.

### Data Sources:
- FAO e-Agriculture database
- Lesotho Meteorological Services
- Lesotho Bureau of Statistics
- World Bank agricultural datasets
- Local market price feeds (CSVs)

### ETL Process:
1. **Data Extraction:** Data is pulled from APIs or scraped from PDFs and CSVs.
2. **Transformation:** Text is cleaned, structured, and chunked into manageable pieces.
3. **Embedding Generation:** Each chunk is converted into a vector embedding using the `all-MiniLM-L6-v2` model.
4. **Vector Store Population:** The embeddings are stored in a FAISS index for efficient retrieval.

## 6. Next Steps

- **Develop ETL pipeline:** Ingest and process the initial set of Lesotho-specific agricultural data.
- **Fine-tune translation models:** Improve the accuracy of Sesotho-to-English translation.
- **Build out multi-channel support:** Integrate Twilio for SMS and WhatsApp messaging.
- **Develop admin dashboard:** Create a Streamlit or React-based dashboard for monitoring and analytics.
- **Conduct user testing:** Gather feedback from local farmers to refine the system.

This technical design provides a solid foundation for building the Agri-Nexus AI chatbot and sets a clear path for the development and deployment of a successful solution for the GenAI for Good Challenge.
