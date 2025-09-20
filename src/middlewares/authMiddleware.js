import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';

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

        // Split the header to get the token
        const parts = authHeader.split(" "); // ["Bearer", "<token>"]
        let actualToken = parts[1]; // use let
        if (actualToken.startsWith("Bearer")) {
            actualToken = actualToken.slice(7); // remove extra Bearer
        }

        let decoded;
        try {
            decoded = jwt.verify(actualToken, process.env.JWT_SECRET); // ✅ correct

        } catch (err) {
            console.error(" Token verification failed:", err.message);
            return res.status(401).json({
                status: "error",
                step: "verify-fail",
                message: "Invalid or expired token"
            });
        }

        const user = await User.findById(decoded.id).select("-password");

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
