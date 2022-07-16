import connectDB from "../../middleware/mongoose";
import Teacher from "../../models/Teacher";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const { email, password } = req.body;
            const teacher = await Teacher.findOne({ email: email });
            if (teacher) {
                let bytes = CryptoJS.AES.decrypt(teacher.password, process.env.SECRET_KEY);
                let orginalPassword = bytes.toString(CryptoJS.enc.Utf8);
                if (password == orginalPassword) {
                    let token = jwt.sign({ email: teacher.email, isTeacher : teacher.isTeacher}, process.env.SECRET_KEY);
                    res.status(200).json({ success: true, token: token })
                } else {
                    res.status(400).json({ success: false, error: "Invalid credentials" });
                }
            }
            else {
                res.status(400).json({ success: false, error: "Invalid credentials" });
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json("Internal Server Error");
        }
    }
    else {
        res.status(500).json("Method is not valid");
    }
}
export default connectDB(handler)