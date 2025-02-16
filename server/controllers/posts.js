import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single post by ID
export const getPost = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid post ID" });
    }

    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid post ID" });
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid post ID" });
    }

    try {
        const deletedPost = await PostMessage.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like a post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid post ID" });
    }

    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.likeCount += 1;
        const updatedPost = await post.save();
        
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
