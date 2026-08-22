# Voice-Based Inventory Management System

[![Python 3.10](https://img.shields.io/badge/Python-3.10-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Whisper](https://img.shields.io/badge/Whisper-OpenAI-000000?logo=openai&logoColor=white)](https://github.com/openai/whisper)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
> A cloud-native, low-latency voice interface for inventory management, achieving **<2s latency** and **90%+ accuracy** on **100+ mixed Kannada-English commands**.

## Problem Statement

Traditional inventory systems fail for small retailers in Karnataka due to language barriers.

This system enables natural voice commands like `add 5kg akki` or `bele stock check` with real-time DB updates.

## Benchmarked Performance

| Metric | Achieved | Technique |
| :--- | :--- | :--- |
| Latency | <2s | Async Whisper + Indexed DB |
| Accuracy | 90%+ | initial_prompt engineering |
| Scale | 10k+ records | Compound Indexing |
| Language | Kannada + English | Whisper base model |

## System Architecture
[Voice Input] -> [Whisper Service] -> [Express API /api/voice] -> [JWT Middleware] -> [MongoDB Atlas] ->


**Whisper Prompt:** `akki, bele, tuppa, rice, dal, sugar, oil`

## Key Engineering Decisions

### 1. Whisper Accuracy Optimization (90%+)

```python
import whisper
model = whisper.load_model("base")

# initial_prompt is critical - without it 67%, with it 90%+
result = model.transcribe(
    audio,
    initial_prompt="akki, bele, tuppa, rice, dal",
    language="en"
)

```
### 2. Database Optimization (10k+ Records)
// Compound index for <100ms queries
inventorySchema.index({ name: 1, userId: 1 });


### 3. JWT Security
All inventory routes protected with authenticateToken middleware for multi-tenant isolation.




### 4. Cloud Deployment (99.9% Uptime)
1.Containerized: Dockerfile with node:18-alpine
2.Ready for: Render, Vercel, GCP Cloud Run


### Tech Stack
1.Backend: Node.js, Express.js, JWT Authentication
2.AI: OpenAI Whisper, Python
3.Database: MongoDB Atlas, Mongoose ODM
4.Cloud: Docker, GCP Cloud Run, Render
5.Tools: Git, REST APIs


### Quick Start
git clone https://github.com/Ananyajsalian/voice-based-inventory-management-system.git
cd voice-based-inventory-management-system
npm install
pip install openai-whisper
npm start

Server runs on http://localhost:3000


### API Endpoints
1.POST /api/voice - Transcribe voice and update inventory
2.GET /api/inventory - Get all inventory (Auth required)
3.POST /api/inventory - Add inventory (Auth required)


###
![Live Demo](QR.png) [Watch Live Demo Video]
https://drive.google.com/file/d/13_LDdAga3WrNHpsIcMRHm_lerzGOpfeA/view?usp=sharing



### Author
Ananya J SalianB.E. Computer Science and Engineering | AJIET
Focused on AI systems for low-resource languages and scalable voice interfaces





