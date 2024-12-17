import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import calculatorRoutes from './Routes/cost.Controller.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
connect('mongodb://localhost:27017/websiteCalculator', {

});

app.use('/api', calculatorRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
