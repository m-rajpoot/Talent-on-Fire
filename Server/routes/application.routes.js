import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controllers.js";
import authUser from "../middlewares/authUser.js";
import isRecruiter from "../middlewares/isRecruiter.js";

const applicantionRouter = express.Router()

applicantionRouter.post("/apply/:id", authUser, applyJob);
applicantionRouter.get("/get", authUser, getAppliedJobs);
applicantionRouter.get("/:id/applicants", authUser, isRecruiter, getApplicants);
applicantionRouter.post("/status/:id/update", authUser, isRecruiter, updateStatus);


export default applicantionRouter;
