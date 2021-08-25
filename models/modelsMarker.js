import mongoose from 'mongoose';
const { Schema, model , Types:{ObjectId} } = mongoose;

const markerSchema = new Schema({
  map: { type: ObjectId, ref: 'Maps', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
 // image: { type: String, required: true },
  visibility:[{ type: ObjectId, ref: 'User'  }]
});

export default model('Marker', markerSchema);
