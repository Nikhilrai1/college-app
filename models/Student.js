const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    profile: { type: String, default:""},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    address: { type: String, required: true },
    grade: { type: String, required: true },
    stream: { type: String, required: true },
    group: { type: String, default: "" },
    dob: { type: String, required: true},
    mobile: { type: String, minLength: 10, maxLength: 10, required: true },
    isStudent: { type: Boolean, default: true },
    isTeacher: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
