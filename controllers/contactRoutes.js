import Contact from "../models/contact.js";

export const submitContact = async (req,res) => {

    try{
        const { name, email,message} = req.body;
        const newMsg = await Contact.create({ name , email,mesage});
        res.status(201).json({ msg: "Message received!" , contact : newMsg});
        
    } catch (err){
        res.status(500).json({ error:err.message})
    }
};