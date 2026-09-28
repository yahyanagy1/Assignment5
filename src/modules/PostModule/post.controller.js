import { Router } from "express";

import {
    createPost,
    deletePost,
    getPostsDetails,
    getPostsCommentCount
} from "./post.service.js";


const postRouter = Router();


// 1️⃣ Create new post
// POST /posts
postRouter.post("/", async (req, res) => {

    try {

        const post = await createPost(req.body);

        return res.status(201).json({
            message: "Post created successfully.",
            post
        });

    } catch (error) {

        return res.status(500).json({
            message: "Failed to create post.",
            error: error.message
        });

    }
});


// 2️⃣ Delete post
// DELETE /posts/:postId
postRouter.delete("/:postId", async (req, res) => {

    try {

        const { postId } = req.params;
        const { userId } = req.body;

        const result = await deletePost(postId, userId);

        return res.status(result.status).json({
            message: result.message
        });

    } catch (error) {

        return res.status(500).json({
            message: "Failed to delete post.",
            error: error.message
        });

    }
});


// 3️⃣ Get all posts with user and comments
// GET /posts/details
postRouter.get("/details", async (req, res) => {

    try {

        const posts = await getPostsDetails();

        return res.status(200).json(posts);

    } catch (error) {

        return res.status(500).json({
            message: "Failed to get posts.",
            error: error.message
        });

    }
});


// 4️⃣ Get all posts with comments count
// GET /posts/comment-count
postRouter.get("/comment-count", async (req, res) => {

    try {

        const posts = await getPostsCommentCount();

        return res.status(200).json(posts);

    } catch (error) {

        return res.status(500).json({
            message: "Failed to get posts.",
            error: error.message
        });

    }
});


export default postRouter;