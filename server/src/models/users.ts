import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

export const UserModel = mongoose.model("users", userSchema)

