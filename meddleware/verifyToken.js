const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = {
    verifyToken
};