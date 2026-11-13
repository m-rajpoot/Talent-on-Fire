import express from 'express';
import { getAllJobs, getJobById, getRecruiterJobs, postJob } from '../controllers/job.controllers.js';
import authUser from '../middlewares/authUser.js';
import isRecruiter from '../middlewares/isRecruiter.js';

const jobRouter = express.Router()


jobRouter.post("/post", authUser, isRecruiter, postJob);
jobRouter.get("/get", getAllJobs);
jobRouter.get("/get-recruiter-job", authUser, isRecruiter, getRecruiterJobs);
jobRouter.get("/get/:id", getJobById);



export default jobRouter;