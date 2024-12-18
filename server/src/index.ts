import express from "express"
import cors from "cors"
import connectToDB from "./connection";
import { UserModel } from "./models/users";
import { PostModel } from "./models/posts";
const app = express();


app.use(cors())
connectToDB()

app.get("/health-check", (req, res, next) => {
    res.status(200).send("Api is working!")
})

//  THIS IS ONLY FOR TEST _ INSERT DATA
app.get("/create-user", async (req, res, next) => {
    const user = new UserModel({
        email: `gal${Math.ceil(Math.random() * 99)}@gmail.com`,
        name: `gal${Math.ceil(Math.random() * 99)}`
    })
    await user.save()
    res.status(200).send("UserCreated!")
})
//  THIS IS ONLY FOR TEST _ INSERT DATA
app.get("/create-post", async (req, res, next) => {
    const post = new PostModel({
        title: `title${Math.ceil(Math.random() * 99)} ---- title`,
        content: `content${Math.ceil(Math.random() * 99)} --- content`,
        author: "6763142ae8f70fabfa0188a3"
    })
    await post.save()
    res.status(200).send("PostCreate!")
})

app.get("/data-posts", async (req, res, next) => {
    const result = await PostModel.find().populate("author")
    res.status(200).json({ result })
})

app.get("/update-post", async (req, res, next) => {
    const postId = req.query.id;
    const result = await PostModel.findByIdAndUpdate(postId, { title: "NEW POST BY ADI AND MICHAL PORTUGAL" })
    res.status(200).json({ result })
})

app.get("/find-posts-by-author", async (req, res, next) => {
    const authorId = req.query.id;
    console.log(authorId)
    const result = await PostModel.find({ author: authorId })
    console.log(result)
    res.status(200).json({ result })
})


app.use((error: any, req: any, res: any, next: any) => {
    console.log(error)
    res.status(409).send("Something went Wrong")
})



app.listen(5000, () => {
    console.log("Listen to API")
})