import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    clicks: {
        type: Number,
        require: true,
        default: 0,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
}, { timestamps: true, });

const urlSchema = mongoose.model('shortUrl', shortUrlSchema);

export default urlSchema;
