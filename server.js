const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this path is correct
const Activity = require('./models/Activity'); // New Activity model
const Progress = require('./models/Progress'); // New Progress model
const Goal = require('./models/Goal'); // New Goal model
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://mahaveermarapally:Np65ve%403224@cluster1.yy5fc.mongodb.net/Fitness?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB connected');
        // Start the server after successful MongoDB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// User Registration Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error); // Log the error to the console
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful' });
});

// Log Activity Route
app.post('/activities', async (req, res) => {
    const { userId, type, duration } = req.body;

    const newActivity = new Activity({ userId, type, duration });
    try {
        await newActivity.save();
        res.status(201).json({ message: 'Activity logged successfully' });
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ message: 'Error logging activity', error: error.message });
    }
});

// Get Activities for User
app.get('/activities/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const activities = await Activity.find({ userId });
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error retrieving activities:', error);
        res.status(500).json({ message: 'Error retrieving activities', error: error.message });
    }
});

// Log Progress Route
app.post('/progress', async (req, res) => {
    const { userId, weight } = req.body;

    const newProgress = new Progress({ userId, weight });

    try {
        await newProgress.save();
        res.status(201).json({ message: 'Progress logged successfully' });
    } catch (error) {
        console.error('Error logging progress:', error);
        res.status(500).json({ message: 'Error logging progress', error: error.message });
    }
});

// Get Progress for User
app.get('/progress/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const progress = await Progress.find({ userId });
        res.status(200).json(progress);
    } catch (error) {
        console.error('Error retrieving progress:', error);
        res.status(500).json({ message: 'Error retrieving progress', error: error.message });
    }
});

// Create Goal Route
app.post('/goals', async (req, res) => {
    const { userId, type, target } = req.body;

    const newGoal = new Goal({ userId, type, target });
    try {
        await newGoal.save();
        res.status(201).json({ message: 'Goal created successfully' });
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Error creating goal', error: error.message });
    }
});

// Get Goals for User
app.get('/goals/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const goals = await Goal.find({ userId });
        res.status(200).json(goals);
    } catch (error) {
        console.error('Error retrieving goals:', error);
        res.status(500).json({ message: 'Error retrieving goals', error: error.message });
    }
});

// Update Goal Route
app.put('/goals/:goalId', async (req, res) => {
    const { goalId } = req.params;
    const { target, achieved } = req.body;

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(goalId, { target, achieved }, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Error updating goal', error: error.message });
    }
});

// Delete Goal Route
app.delete('/goals/:goalId', async (req, res) => {
    const { goalId } = req.params;

    try {
        const deletedGoal = await Goal.findByIdAndDelete(goalId);
        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Error deleting goal', error: error.message });
    }
});

// Dashboard Route
app.get('/dashboard/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const activities = await Activity.find({ userId });
        const goals = await Goal.find({ userId });
        const progress = await Progress.find({ userId });

        // Create a summary object
        const dashboardData = {
            activities,
            goals,
            progress,
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error retrieving dashboard data:', error);
        res.status(500).json({ message: 'Error retrieving dashboard data', error: error.message });
    }
});
