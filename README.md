# 🌾 Agri-Nexus AI

> **Bridging the Digital Divide in Agriculture and Healthcare**

A local-first, offline AI agent built on GPT-OSS-20B that delivers agricultural and health intelligence to underserved communities without internet access. Designed to run on low-cost hardware like Raspberry Pi 5.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-green)](https://agri-nexus-ai-c3m8.bolt.host)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)

## 🎯 Vision

Agri-Nexus AI bridges the digital divide by giving rural communities instant access to expert agricultural and health intelligence — all offline. This makes it a high-impact, scalable, and defensible solution for emerging markets.

## 🚀 Live Demo

Experience Agri-Nexus AI: **[https://agri-nexus-ai-c3m8.bolt.host](https://agri-nexus-ai-c3m8.bolt.host)**

## 🌟 Key Features

### 🤖 AI-Powered Intelligence
- **GPT-OSS-20B Model**: Local inference with fine-tuned agricultural and health knowledge
- **FAISS Vector Store**: 15,420+ entries of domain-specific knowledge
- **Offline Processing**: No internet required for AI responses
- **Multi-language Support**: English, Swahili, French, Hausa

### 🎤 Voice Interface
- **Speech Recognition**: Offline voice input using Whisper.cpp
- **Text-to-Speech**: Audio responses for non-literate users
- **Natural Language**: Speak queries in local languages

### 📚 Knowledge Base
- **Agricultural Intelligence**: Crop diseases, soil management, pest control
- **Health Guidance**: Basic healthcare, first aid, preventive care
- **Livestock Care**: Animal health and veterinary guidance
- **Local Adaptation**: Customizable for regional needs

### 💻 Hardware Optimized
- **Raspberry Pi 5**: Optimized for single-board computers
- **Low Power**: Energy-efficient for rural deployments
- **Scalable**: Works on consumer PCs and GPU rigs

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend      │    │    Hardware     │
│                 │    │                  │    │                 │
│ • React UI      │◄──►│ • FastAPI        │◄──►│ • Raspberry Pi 5│
│ • Voice I/O     │    │ • GPT-OSS-20B    │    │ • FAISS Store   │
│ • Multi-lang    │    │ • Vector Search  │    │ • Offline First │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

### Backend (Production)
- **Python** - Core language
- **FastAPI** - Lightweight serving framework
- **Ollama** - Model serving
- **FAISS** - Vector embeddings
- **SpeechRecognition + pyttsx3** - Offline voice I/O

### Hardware
- **Raspberry Pi 5** - Primary target platform
- **Docker** - Optional containerization
- **Solar Power Compatible** - For off-grid deployments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI.git
   cd Agri-Nexus-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Production Deployment (Raspberry Pi)

```bash
# Clone and setup
git clone https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI.git
cd Agri-Nexus-AI

# Install Python dependencies
pip install -r requirements.txt

# Build FAISS index
python vector_store.py

# Start server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## 📊 Impact Metrics

### Target Outcomes
- **3.7B people** globally lack reliable internet access
- **Crop Loss Reduction**: Early disease detection and treatment
- **Health Outcomes**: Basic first aid and preventive care guidance
- **Community Reach**: One device serves entire villages

### Market Opportunity
- **AgriTech in Africa**: $11B+ by 2030
- **Digital Health**: $350B global by 2032
- **NGO Deployments**: WHO, FAO, UNICEF partnerships

## 🎯 Use Cases

### 👩‍🌾 For Farmers
- Diagnose crop diseases from symptoms
- Get fertilizer schedules and soil management advice
- Livestock health monitoring and treatment
- Weather-based planting recommendations

### 🏥 For Rural Health Workers
- Basic first-aid guidance and emergency protocols
- Preventive care recommendations
- Triage support for medical emergencies
- Health education and awareness

### 🏢 For NGOs & Cooperatives
- Deploy community knowledge hubs
- Scale expert knowledge without internet
- Reduce dependency on external connectivity
- Empower local communities with AI tools

## 🔧 Extension Points

### Adding New Datasets
```python
# Add new knowledge to datasets/*.json
python vector_store.py  # Rebuild FAISS index
```

### Fine-tuning Models
```python
# Fine-tune GPT-OSS-20B with regional data
# Add local crops, health guidelines, languages
```

### Hardware Scaling
- **Single Board**: Raspberry Pi 4/5
- **Consumer PC**: Better performance
- **GPU Rig**: Maximum throughput
- **Solar Powered**: Off-grid deployments

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Global Impact

Agri-Nexus AI is designed to serve the **3.7 billion people** who lack reliable internet access, particularly in rural agricultural communities. By providing offline AI capabilities, we're democratizing access to expert knowledge and potentially improving food security and health outcomes worldwide.

## 📞 Contact & Support

- **Website**: [https://agri-nexus-ai-c3m8.bolt.host](https://agri-nexus-ai-c3m8.bolt.host)
- **GitHub**: [https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI](https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI)
- **Issues**: [Report bugs and request features](https://github.com/Oracle69digitalmarketing/Agri-Nexus-AI/issues)

---

<div align="center">
  <strong>🌾 Empowering Rural Communities Through AI 🌾</strong>
  <br>
  <em>Built with ❤️ for global impact</em>
</div>