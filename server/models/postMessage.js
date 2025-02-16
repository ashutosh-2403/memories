import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    creator: { type: String, required: true },
    tags: [String],
    selectedFile: String,
    likeCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('PostMessage', postSchema);
