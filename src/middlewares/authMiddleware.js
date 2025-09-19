import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        console.log("🔹 Auth Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                status: "error",
                step: "no-header",
                message: "No token provided"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                step: "bad-format",
                message: "Invalid token format"
            });
        }

        const actualToken = authHeader.split(" ")[1];
        console.log("🔹 Extracted Token:", actualToken);

        let decoded;
        try {
            decoded = jwt.verify(actualToken, JWT_SECRET);
            console.log("🔹 Decoded JWT:", decoded);
        } catch (err) {
            console.error(" Token verification failed:", err.message);
            return res.status(401).json({
                status: "error",
                step: "verify-fail",
                message: "Invalid or expired token"
            });
        }

        const user = await User.findById(decoded.id).select("-password");
        console.log("User from DB:", user);

        if (!user) {
            return res.status(404).json({
                status: "error",
                step: "user-not-found",
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        res.status(500).json({
            status: "error",
            step: "middleware-crash",
            message: "Server error in auth middleware"
        });
    }
};
