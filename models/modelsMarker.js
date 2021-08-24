import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
  setting: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  parentID: { type: String, required: true },
  children: { type: String, required: true },
  visibility: { type: String, required: true }
});

export default model('Marker', postSchema);
