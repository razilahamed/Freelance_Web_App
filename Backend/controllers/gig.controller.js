import Gig from "../models/gig.model.js";
import jwt from "jsonwebtoken";

export const createGig= async (req,res) => {

     const webtoken = req.cookies.loginToken;
     //const currentUser = await userModel.findById(req.params.id);
     if (!webtoken) {
       res.status(401).send("you are not logged in");
     }else{

      jwt.verify(webtoken, process.env.TOKEN_KEY, async (err, userinfo) => {
              
         const newGig = new Gig({
           userId: userinfo.id,
           ...req.body ,
         });
     
         try {
           const savedGig = await newGig.save();
           //res.status(201).json(savedGig);
           res.status(200).send("gig successfully added");
         } catch (err) {
        
           res.status(500).send(err);
         }
       
     });}
  







};
export const deleteGig = async (req, res) => {

    const webtoken = req.cookies.loginToken;
    //const currentUser = await userModel.findById(req.params.id);
    if (!webtoken) {
      res.status(401).send("you are not logged in");
    }else{
    jwt.verify(webtoken, process.env.TOKEN_KEY, async (err, userinfo) => {
        try {
          const gig = await Gig.findById(req.params.id);
          if (gig.userId !== userinfo.id)
            return res.status(403).send( "You can delete only your gig!");

          await Gig.findByIdAndDelete(req.params.id);
          res.status(200).send("Gig has been deleted!");
        } catch (err) {
        
          res.status(500).send(err);
        }
    });}

};
export const getGigs = async (req, res) => {
    try {
        const gigs = await Gig.find();
        res.status(200).send(gigs);
    } catch (err) {
        res.status(500).send(err);
    }
};
export const getAGig = async (req, res) => {

};