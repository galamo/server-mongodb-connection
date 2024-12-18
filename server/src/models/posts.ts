import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
})

export const PostModel = mongoose.model("posts", postSchema)


