import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

dotenv.config();



export const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        let curr = new Date();
        if(user.blockedTill)
        if(!user){
            return res.status(400).send({message:"Invalid Email"});
        }else if(user.blockedTill){
            let time = (user.blockedTill.getTime()-curr.getTime())/(1000*60*60);
            return res.status(400).send({message:`User Blocked for ${time}hrs`, data:user});
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                user.attempts++;
                let limit = 5;
                if(user.attempts>=limit){
                    user.attempts=0;
                    curr.setHours(curr.getHours()+24);           
                    user.blockedTill=curr;
                    return res.status(400).send({message:`User Blocked for 24hrs`, data:user});
                }
                await user.save();
                return res.status(400).send({message:`Invalid Password ${limit-user.attempts} attempts left`});
            }
            
            let token = jwt.sign({_id:user._id, email: user.email},process.env.JWT_SECRET);
            // console.log(token);
            user.attempts = 0;
            user.blockedTill = null;
            return res.status(200).send({token:`Bearer ${token}`});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Login"});
    }
}

export const register = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = new User({
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        console.log(password,salt);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        return res.status(200).send(user);

    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Signup"});
    }
}

export const getUser = async ( req,res )=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({user:decode});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching user details"});
    }
}