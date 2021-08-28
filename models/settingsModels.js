import mongoose from 'mongoose';
const { Schema, model, Types:{ObjectId} } = mongoose;

const settingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  players: [{ type: ObjectId, ref: 'User' }],
  maps: [{type: ObjectId, ref: 'Maps'}],
  date: { type: Date, default: Date.now }
});

export default model('Setting', settingSchema);