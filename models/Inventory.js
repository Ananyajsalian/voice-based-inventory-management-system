const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true, index: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  rawText: String,
  userId: { type: String, required: true, index: true },
  history: [{ action: String, qty: Number, at: Date }],
}, { timestamps: true });
inventorySchema.index({ item: 1, userId: 1 });
module.exports = mongoose.model('Inventory', inventorySchema);
