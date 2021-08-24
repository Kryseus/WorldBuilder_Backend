import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['author', 'user'], required: true },
});

export default model('User', postSchema);
