require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Inventory = require('./models/Inventory');
const { authenticateToken, requestLogger } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://user:pass@cluster0.mongodb.net/voice_inventory";
mongoose.connect(MONGO_URI)
 .then(() => console.log("MongoDB Atlas Connected - 10k+ ready"))
 .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.json({ status: "Cloud-native Voice Inventory API running", db: "MongoDB Atlas" });
});

app.post('/api/voice', authenticateToken, async (req, res) => {
  const { transcript } = req.body;
  const parsed = parseIntent(transcript);
  if (!parsed) return res.status(400).json({ error: "Could not parse" });
  const existing = await Inventory.findOne({ item: parsed.item, userId: req.user.id });
  if (existing) {
    existing.quantity += parsed.quantity;
    existing.history.push({ action: 'voice_add', qty: parsed.quantity, at: new Date() });
    await existing.save();
    return res.json({ message: "Smart Added (duplicate merged)", data: existing });
  }
  const newItem = await Inventory.create({...parsed, userId: req.user.id, history: [{ action: 'create', qty: parsed.quantity }] });
  res.json({ message: "New item added", data: newItem });
});

app.post('/api/inventory/add', authenticateToken, async (req, res) => {
  const item = await Inventory.create({...req.body, userId: req.user.id });
  res.json(item);
});

app.get('/api/inventory/view', authenticateToken, async (req, res) => {
  const items = await Inventory.find({ userId: req.user.id }).sort({ updatedAt: -1 }).limit(10000);
  res.json({ count: items.length, data: items });
});

function parseIntent(text) {
  if (!text) return null;
  text = text.toLowerCase();
  const match = text.match(/(\d+)\s*(kg|g|litre|packet)?\s*([a-z]+)/);
  if (!match) return null;
  return { item: match[3], quantity: parseInt(match[1]), unit: match[2] || 'kg', rawText: text };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
