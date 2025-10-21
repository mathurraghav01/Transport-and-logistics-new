import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from  "../models/User.js";

export const register = async (req,res) => {
    try {
        const { name,email , password} = req.body;
        const userExists = await User.findOne({email});
        if ( userExists) return res.status(400).json({msg: "User already exists"});

        const hash = await bcrypt.hash(password,10);
        const newUser = await User.create({name , email, password:hash});

        res.status(201).json({ msg: "User registered",user: newUser});
    } catch (err){
        res.status(500).json({ error:err.message});
    }
};

export const login =  async (req,res) => {
    try{
        const { email , password} = req.body;
        const user = await User.findOne({ email});
        if (!user) return res.status(400).json({ msg: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token = jwt.sign({ is: user._id} , process.env.JWT_SECRET,{ expiresIn: "7d"});
        res.json({ token , user});
    } catch (err){
        res.status(500).json({ error: err.message});

    }
};
    
    

