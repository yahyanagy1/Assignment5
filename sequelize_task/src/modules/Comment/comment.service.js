import { commentModel } from "../../DB/models/Comments/comments.model.js";
import userModel from "../../DB/models/User/user.model.js";
import { postModel } from "../../DB/models/Post/post.model.js";


// 1. Create bulk of comments
export const createComments = async (commentsData) => {

    const comments = await commentModel.bulkCreate(commentsData);

    return comments;
};


// 2. Update comment by ID
export const updateComment = async (commentId, userId, content) => {

    const comment = await commentModel.findByPk(commentId);

    if (!comment) {
        return {
            status: 404,
            message: "Comment not found."
        };
    }

    if (comment.userId != userId) {
        return {
            status: 403,
            message: "You are not authorized to update this comment."
        };
    }

    comment.content = content;

    await comment.save();

    return {
        status: 200,
        message: "Comment updated."
    };
};


// 3. Find or create comment
export const findOrCreateComment = async (postId, userId, content) => {

    const [comment, created] = await commentModel.findOrCreate({
        where: {
            postId,
            userId,
            content
        }
    });

    return {
        comment,
        created
    };
};


// 4. Search comments by word
export const searchComments = async (word) => {

    const comments = await commentModel.findAll();

    const filteredComments = comments.filter((comment) =>
        comment.content.toLowerCase().includes(word.toLowerCase())
    );

    return filteredComments;
};


// 5. Get 3 newest comments for specific post
export const getNewestComments = async (postId) => {

    const comments = await commentModel.findAll({
        where: {
            postId
        },
        order: [
            ["createdAt", "DESC"]
        ],
        limit: 3
    });

    return comments;
};


// 6. Get specific comment with User and Post information
export const getCommentDetails = async (commentId) => {

    const comment = await commentModel.findByPk(commentId, {

        include: [
            {
                model: userModel,
                attributes: ["id", "name", "email"]
            },
            {
                model: postModel,
                attributes: ["id", "title", "content"]
            }
        ]

    });

    return comment;
};