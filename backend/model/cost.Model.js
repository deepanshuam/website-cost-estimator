import { Schema, model } from 'mongoose';

const CostSchema = new Schema({
  name: String,
  email: String,
  pages: Number,
  features: [String],
  totalCost: Number,
  date: { type: Date, default: Date.now },
});

export default model('Cost', CostSchema);
