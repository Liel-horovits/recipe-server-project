const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- MongoDB Atlas Connected Successfully! ---');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    }
};

connectDB();

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});


app.use((req, res, next) => {
    const error = new Error('הנתיב המבוקש לא נמצא');
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        error: {
            message: err.message || 'שגיאת שרת פנימית'
        }
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


