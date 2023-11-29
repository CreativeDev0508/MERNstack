const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register route 
exports.registerUser = async(req, res) => {

    try {
        console.log(req.body);
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const email = username;

        await User.create({ email, password: hashedPassword });

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login route
 exports.loginUser = async (req, res) => {
    console.log("here===>", req.body)
    try {
        const { username, password } = req.body;
        const email = username;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
