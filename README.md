🌾 Agri-Nexus AI
Bridging the Digital Divide in Agriculture and Healthcare

Agri-Nexus AI is a local-first, offline AI agent built on GPT-OSS-20B, designed to deliver expert agricultural and health intelligence to underserved communities—without needing internet access. Optimized for low-cost hardware like Raspberry Pi 5, it empowers rural users with voice and text-based insights in multiple languages.

---

🎯 Vision
To democratize access to agricultural and healthcare knowledge for the 3.7 billion people without reliable internet. Agri-Nexus AI is scalable, impactful, and tailored for emerging markets.

---

🚀 Live Demo
Try it here: Agri-Nexus AI Demo

---

🌟 Key Features

🤖 AI-Powered Intelligence
- GPT-OSS-20B: Fine-tuned for agriculture and health  
- FAISS Vector Store: 15,000+ domain-specific entries  
- Offline Operation: No internet required  
- Multi-language Support: English, Swahili, French, Hausa  

🎤 Voice Interface
- Speech Recognition: Offline via Whisper.cpp  
- Text-to-Speech: Audio responses for non-literate users  
- Natural Language Input: Speak queries in local dialects  

📚 Knowledge Base
- Crop diseases, soil management, pest control  
- Basic healthcare, first aid, preventive care  
- Livestock health and veterinary guidance  
- Region-specific customization  

💻 Hardware Optimization
- Runs on Raspberry Pi 5 and consumer PCs  
- Energy-efficient for rural deployments  
- Compatible with solar power setups  

---

🏗️ System Architecture

`
┌────────────┐    ┌──────────────┐    ┌────────────┐
│  Frontend  │ ←→ │   Backend    │ ←→ │  Hardware  │
│ React UI   │    │ FastAPI      │    │ Raspberry  │
│ Voice I/O  │    │ GPT-OSS-20B  │    │ FAISS Store│
│ Multilang  │    │ Vector Search│    │ Offline AI │
└────────────┘    └──────────────┘    └────────────┘
`

---

🛠️ Tech Stack

Frontend
- React 18.3.1  
- TypeScript  
- Tailwind CSS  
- Vite  
- Lucide Icons  

Backend
- Python + FastAPI  
- FAISS for vector search  
- Ollama for model serving  
- SpeechRecognition + pyttsx3  

Hardware
- Raspberry Pi 5  
- Docker (optional)  
- Solar-compatible  

---

⚡ Quick Start

Prerequisites
- Node.js 18+  
- Python 3.10+  
- Conda or virtualenv  

Frontend Setup
`bash
git clone https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI.git
cd Agri-Nexus-AI
npm install
npm run dev
`

Visit: http://localhost:5173

Backend Setup
`bash
cd backend
pip install -r requirements.txt
python vector_store.py
uvicorn app:app --reload --host 0.0.0.0 --port 8000
`

Visit: http://localhost:8000/docs

---

🧪 API Testing

Endpoint: /query
Send a POST request with:

`json
{
  "query": "What are the symptoms of cassava mosaic disease?"
}
`

Expected response:
`json
{
  "answer": "Cassava mosaic disease causes leaf distortion, yellowing, and stunted growth..."
}
`

---

📊 Impact Metrics

- Internet Gap: 3.7B people lack reliable access  
- Crop Loss Reduction: Early disease detection  
- Health Outcomes: First aid and preventive care  
- Community Reach: One device serves entire villages  

---

🎯 Use Cases

👩‍🌾 Farmers
- Diagnose crop diseases  
- Fertilizer schedules and soil advice  
- Livestock health monitoring  

🏥 Health Workers
- First aid and emergency protocols  
- Preventive care guidance  
- Health education  

🏢 NGOs & Cooperatives
- Deploy community knowledge hubs  
- Scale expert knowledge offline  
- Empower local communities  

---

🔧 Extension Points

- Add New Data: Drop into datasets/*.json, rebuild with vector_store.py  
- Fine-Tune Models: Customize GPT-OSS-20B with local data  
- Hardware Scaling: Raspberry Pi → PC → GPU rigs  
- Off-Grid Ready: Solar-powered deployments  

---

🤝 Contributing

We welcome contributions!  

`bash

Fork and clone
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
`

Open a Pull Request and let’s build together.

---

📄 License
MIT License — see LICENSE file for details.

---

🌍 Global Impact

Agri-Nexus AI is built for the billions underserved by digital infrastructure. By enabling offline access to expert knowledge, we aim to improve food security, health outcomes, and community resilience worldwide.

---

📬 Submission Details

- Submitted by: Prince (Oracle69digitalmarketing)  
- Project: Agri-Nexus AI  
- Date: September 2025  
- Branch: main  
- Release Tag: v1.0  

---

📞 Contact & Support

- Website: agri-nexus-ai-c3m8.bolt.host  
- GitHub: Agri-Nexus-AI  
- Issues: Use GitHub Issues tab to report bugs or request features  

---

🌾 Empowering Rural Communities Through AI  
Built with ❤️ for global impact.
