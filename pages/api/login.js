import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const { email,password } = req.body;
            const student = await Student.findOne({ email: email });
            if (student) {
                let bytes = CryptoJS.AES.decrypt(student.password, process.env.SECRET_KEY);
                let orginalPassword = bytes.toString(CryptoJS.enc.Utf8);
                if (password == orginalPassword) {
                    let token = jwt.sign({
                        name: student.name,
                        gender: student.gender,
                        dob: student.dob,
                        email: student.email,
                        address: student.address,
                        grade: student.grade,
                        stream: student.stream,
                        group: student.group,
                        mobile: student.mobile,
                        profile: student.profile,
                        isTeacher: student.isTeacher
                    }, process.env.SECRET_KEY);
                    console.log(token)
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