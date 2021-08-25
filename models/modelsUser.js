import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['author', 'user'], required: true },
});

export default model('User', userSchema);
