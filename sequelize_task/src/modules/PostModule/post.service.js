import { postModel } from "../../DB/models/Post/post.model.js";
import userModel from "../../DB/models/User/user.model.js";
import { commentModel } from "../../DB/models/Comments/comments.model.js";


// 1️⃣ Create new post
export const createPost = async (postData) => {
    const post = new postModel(postData);

    await post.save();

    return post;
};


// 2️⃣ Delete post by id
export const deletePost = async (postId, userId) => {

    const post = await postModel.findByPk(postId);

    // Post doesn't exist
    if (!post) {
        return {
            status: 404,
            message: "Post not found."
        };
    }

    // User is not the owner
    if (post.userId != userId) {
        return {
            status: 403,
            message: "You are not authorized to delete this post."
        };
    }

    await post.destroy();

    return {
        status: 200,
        message: "Post deleted."
    };
};


// 3️⃣ Get all posts with user and comments
export const getPostsDetails = async () => {

    const posts = await postModel.findAll({
        attributes: ["id", "title"],

        include: [
            {
                model: userModel,
                attributes: ["id", "name"]
            },
            {
                model: commentModel,
                attributes: ["id", "content"]
            }
        ]
    });

    return posts;
};


// 4️⃣ Get all posts with comments count
export const getPostsCommentCount = async () => {

    const posts = await postModel.findAll({
        attributes: ["id", "title"]
    });

    const result = await Promise.all(
        posts.map(async (post) => {

            const commentCount = await commentModel.count({
                where: {
                    postId: post.id
                }
            });

            return {
                id: post.id,
                title: post.title,
                commentCount
            };
        })
    );

    return result;
};