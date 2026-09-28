import { Router } from "express";

import {
    createComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails
} from "./comment.service.js";


const commentRouter = Router();


// 1. Create bulk of comments
// POST /comments
commentRouter.post("/", async (req, res) => {

    try {

        const comments = await createComments(req.body);

        return res.status(201).json({
            comments,
            message: "Comments created."
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


// 2. Update comment
// PATCH /comments/:commentId
commentRouter.patch("/:commentId", async (req, res) => {

    try {

        const { commentId } = req.params;
        const { userId, content } = req.body;

        const result = await updateComment(
            commentId,
            userId,
            content
        );

        return res.status(result.status).json({
            message: result.message
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


// 3. Find or create comment
// POST /comments/find-or-create
commentRouter.post("/find-or-create", async (req, res) => {

    try {

        const { postId, userId, content } = req.body;

        const result = await findOrCreateComment(
            postId,
            userId,
            content
        );

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


// 4. Search comments
// GET /comments/search?word=the
commentRouter.get("/search", async (req, res) => {

    try {

        const { word } = req.query;

        const comments = await searchComments(word);

        if (comments.length === 0) {
            return res.status(404).json({
                message: "No comments found."
            });
        }

        return res.status(200).json({
            comments,
            count: comments.length
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


// 5. Get 3 newest comments
// GET /comments/newest/:postId
commentRouter.get("/newest/:postId", async (req, res) => {

    try {

        const { postId } = req.params;

        const comments = await getNewestComments(postId);

        return res.status(200).json(comments);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


// 6. Get specific comment with User and Post information
// GET /comments/details/:id
commentRouter.get("/details/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const comment = await getCommentDetails(id);

        if (!comment) {
            return res.status(404).json({
                message: "No comment found."
            });
        }

        return res.status(200).json(comment);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
});


export default commentRouter;