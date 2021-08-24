import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  genre: { type: String, enum: ['fantasy', 'sci-fi', 'history', 'sports'], required: true },
  date: { type: Date, default: Date.now }
});

export default model('Setting', postSchema);
