import {User} from '../model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) =>{
    try {
    const {username} = req.body;
    const {email} = req.body;
    const userCheck = await User.findOne({username})
    const emailCheck = await User.findOne({email})
    if(userCheck){
        return res.status(400).json({message: "username already exist"})
    }
    else if(username.length < 4){
       return res.status(400).json({message: "username atleast 4 character long"})
    }

    if(emailCheck){
       return res.status(400).json({message: "Email already exist"})
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await newUser.save();
    return res.status(200).json({message: "SignIn successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    }

export const login = async (req, res) =>{
    try {
        console.log("LOGIN BODY:", req.body);
        const {username, password} = req.body || {};
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const userCheck = await User.findOne({ username });
        console.log("USER FOUND:", userCheck);
        if (!userCheck) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const match = await bcrypt.compare(password, userCheck.password);
        console.log("PASSWORD MATCH:", match);
        if (!match) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server configuration error: missing JWT_SECRET" });
        }

        // create token
        const authClaim = { name: username };
        const token = jwt.sign(authClaim, process.env.JWT_SECRET, { expiresIn: "2d" });
        return res.status(200).json({ id: userCheck._id, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}