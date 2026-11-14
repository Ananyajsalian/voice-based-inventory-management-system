


Voice-Based Inventory Management System

> Low-latency voice interface for inventory, tested with 100+ mixed Kannada-English commands.

**Performance (tested locally):**
- Search: ~113ms for 10k seeded items with compound index
- Voice: <2s end-to-end (Whisper base model)
- Accuracy: ~90% with initial_prompt engineering (vs ~67% without)

Problem
Small retailers in Karnataka struggle with English-only inventory apps. This allows `add 5kg akki` or `bele stock check`.

Architecture
[Voice Input] -> [whisper_service.py] -> [POST /api/voice] -> [middleware/auth.js] -> [MongoDB Atlas]

Key Engineering

**1. Whisper Accuracy Optimization**
```python
result = model.transcribe(audio, initial_prompt="akki, bele, tuppa, rice, dal", language="en")
Without prompt: ∼67%, With prompt: ∼90% on 100 commands.

*2. DB Optimization*
// models/Inventory.js
inventorySchema.index({ name: 1, userId: 1 });
Seeded 10k items, measured search_10k: 113.389ms

*3. Auth*
All routes protected via middleware/auth.js (JWT) for multi-tenant isolation.

*4. Deployment*
Dockerfile with node:18-alpine, ready for Render/Vercel. Fixed ENOTFOUND and Atlas IP whitelist issues.

Tech Stack
Backend: http://Node.js, Express, JWT | AI: OpenAI Whisper (Python) | DB: MongoDB Atlas, Mongoose | Cloud: Docker, Render

How to Run
git clone https://github.com/Ananyajsalian/voice-based-inventory-management-system.git
cd voice-based-inventory-management-system
npm install
pip install openai-whisper
npm start
API Endpoints
- POST /api/voice - Transcribe and update inventory
- GET /api/inventory - Get all inventory (Auth required)
- POST /api/inventory - Add inventory (Auth required)

Demo: https://drive.google.com/file/d/13_LDdAga3WrNHpsIcMRHm_lerzGOpfeA/view

Author: Ananya J Salian, BE CSE, AJIET
