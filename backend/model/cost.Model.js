import { Schema, model } from 'mongoose';

const CostSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: [ 'Website-Design', 'Website-Development','Application-Development', 'Software-Development'],
  },
  pages: { type: Number, required: true },
  domain: { type: [String], required: true },
  hosting: { type: [String], required: true },
  officialEmail: { type: String, required: true },
  specialRequirements: {
    type: [String],
    enum: ['SEO', 'Additional Features', 'Custom Design', 'Mobile Optimization', 'Others'],
    default: [],
  },
  features: { type: [String], required: true },
  totalCost: { type: Number, required: true },
  estimatedTime: { type: Number, required: true }, // Added for estimated time
  date: { type: Date, default: Date.now },
});

export default model('Cost', CostSchema);
