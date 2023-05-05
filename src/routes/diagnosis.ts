import express from "express";
import diagnosisService from "../services/diagnosisService";


const router = express.Router();


router.get("/",  (_req, res) => {
    
      res.json(diagnosisService.getAll());
});

export default router;

