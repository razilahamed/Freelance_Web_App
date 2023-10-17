import express from "express";
import {createGig,deleteGig,getGigs,getAGig} from "../controllers/gig.controller.js"


const router = express.Router();

router.post("/",createGig);
router.delete("/:id", deleteGig);
router.get("/", getGigs);
router.get("/gigbyid/:id",getAGig);


export default router;
