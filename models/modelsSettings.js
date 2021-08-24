import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({

  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['author', 'user'], required: true },

  title: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  genre: { type: String, enum: ['fantasy', 'sci-fi', 'history', 'sports'], required: true },
  date: { type: Date, default: Date.now }
});

export default model('Setting', postSchema);
