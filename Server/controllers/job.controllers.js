import { Job } from "../models/job.models.js";
import { Company } from "../models/company.models.js";


// role === "recruiter"

export const postJob = async (req, res) => {
    try {
        const { title, description, location, requirements, salary, jobType, experience, position, companyId } = req.body;

        const userId = req.id;

        if (!title || !description || !location || !requirements || !salary || !jobType || experience < 0 || !position || !companyId || experience === "") {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }

        const company = await Company.findOne({ _id: companyId, userId: userId });
        if (!company) {
            return res.status(403).json({
                message: "You can only post jobs for your own company",
                success: false,
            })
        }

        const job = await Job.create({
            title,
            description,
            location,
            requirements: requirements.split(","),
            salary: Number(salary),
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "New job created",
            job,
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}


// role === "student"

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const query = {
            $or: [
                { title: { $regex: safeKeyword, $options: "i" } },
                
                { description: { $regex: safeKeyword, $options: "i" } },
                { location: { $regex: safeKeyword, $options: "i" } },
            ]
        };

        // salary filter values look like "6-10 LPA" or "100+"
        const salaryRange = keyword.match(/^(\d+)\s*-\s*(\d+)\s*LPA$/i);
        const salaryMin = keyword.match(/^(\d+)\s*\+$/);
        if (salaryRange) query.$or.push({ salary: { $gte: Number(salaryRange[1]), $lte: Number(salaryRange[2]) } });
        if (salaryMin) query.$or.push({ salary: { $gte: Number(salaryMin[1]) } });

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        // we can use more than two populate at a time

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "",
            jobs,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}


// role === "student"

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate(
            {
                path: "applications",
            }
        );
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Job found",
            job,
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}


// role === "recruiter"

export const getRecruiterJobs = async (req, res) => {
    try {
        const recruiterId = req.id;
        const jobs = await Job.find({ created_by: recruiterId }).populate(
            {
                path: "company",
                createdAt: -1,
            }
        );
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Jobs found",
            jobs,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

