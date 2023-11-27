
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
 
app.use('/', userRoutes);
app.listen(port, () => console.log(`Server started on port ${port}`));
