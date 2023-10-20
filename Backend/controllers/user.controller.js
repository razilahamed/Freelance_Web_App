import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const deleteUser = async (req, res) => {
  const webtoken = req.cookies.loginToken;
  const currentUser = await userModel.findById(req.params.id);
  if(!webtoken){
    res.status(401).send("you are not logged in");
  }
  jwt.verify(webtoken,process.env.TOKEN_KEY, async (err,userinfo)=>{
        if(userinfo.id===currentUser._id.toString()) {
          await userModel.findByIdAndDelete(req.params.id);

          res.clearCookie("loginToken", {
              sameSite: "none",
              secure: true,
            });


          return res.status(200).send("User deleted successfully");
        }else{
          return res.status(403).send("you cannot delete other accounts");
        }
    })  
};

export const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.status(200).send(user);
};



