import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            required: false,
            default: "ADMIN",
        },
    },
    {
        timestamps: true,
    }
);
adminSchema.methods.matchPassword = async function (enteredPassword) {
    console.log("reached here");
    return await bcrypt.compare(enteredPassword, this.password);
};
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
