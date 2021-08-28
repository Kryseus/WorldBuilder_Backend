import mongoose from 'mongoose';
const { Schema, model, Types:{ObjectId} } = mongoose;

const characterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  author: { type: ObjectId, ref: 'User', required: true },
  players: [{ type: ObjectId, ref: 'User' }],
  marker: [{ type: ObjectId, ref: 'Marker'}],
  date: { type: Date, default: Date.now },
  race: { type: String },
  personality: { type: String },
  background: { type: String },
  canvas: { type: String }
});

export default model('Character', characterSchema);