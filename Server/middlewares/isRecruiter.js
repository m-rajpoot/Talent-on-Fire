import { User } from "../models/user.model.js";

// use after authUser: allows the request only if the logged-in user is a recruiter
const isRecruiter = async (req, res, next) => {
    try {
        const user = await User.findById(req.id).select("role");
        if (!user || user.role !== "recruiter") {
            return res.status(403).json({
                message: "Only recruiters can do this",
                success: false,
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export default isRecruiter;
