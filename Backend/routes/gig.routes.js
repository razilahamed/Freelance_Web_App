import express from "express";
import {createGig,deleteGig,getGigs,getAGig,getMyGigs,updateGig} from "../controllers/gig.controller.js"


const router = express.Router();

router.post("/",createGig);
router.delete("/:id", deleteGig);
router.get("/", getGigs);
router.get("/gigbyid/:id",getAGig);

router.get("/mygigs/:id", getMyGigs);

router.delete("/:id", updateGig);


export default router;
