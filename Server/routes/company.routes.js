import express from "express";
import { getCompanyDetailsById, getCompanyDetailsByUser, registerCompany, updateCompany } from "../controllers/company.controllers.js";
import authUser from "../middlewares/authUser.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import { singleUpload } from "../middlewares/multer.js";

const companyRouter = express.Router()

companyRouter.post("/register", authUser, isRecruiter, registerCompany);
companyRouter.get("/get", authUser, isRecruiter, getCompanyDetailsByUser);
companyRouter.get("/get/:id", authUser, isRecruiter, getCompanyDetailsById);
companyRouter.post("/update/:id", authUser, isRecruiter, singleUpload, updateCompany);


export default companyRouter;

