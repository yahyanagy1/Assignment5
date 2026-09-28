import chalk from "chalk";
import express from "express";
import { DBconnection, DBsync } from "./DB/db.connection.js";
import userModel from "./DB/models/User/user.model.js";
import { postModel } from "./DB/models/Post/post.model.js";
import { commentModel } from "./DB/models/Comments/comments.model.js";
import userRouter from "./modules/UserModule/user.controller.js";
import postRouter from "./modules/PostModule/post.controller.js";
import commentRouter from "./modules/Comment/comment.controller.js";

const app = express()

const bootstrap = async () => {

    app.use(express.json())
    app.use("/users", userRouter)
    app.use("/posts", postRouter)
    app.use("/comments", commentRouter);

    DBconnection()
    DBsync()
    app.listen(3000, () => {
        console.log(chalk.green("server running ..."));
    })

}

export default bootstrap