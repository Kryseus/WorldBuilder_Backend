import mongoose from 'mongoose';
const { Schema, model , Types:{ObjectId} } = mongoose;

const mapSchema = new Schema({
  map: { type: ObjectId, ref: 'Settings', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  plane: { type: String, enum: ['Galaxy', 'Solar System', 'Planet', 'Continent', 'Country', 'City', 'Building'], required: true },
  visibility:[{ type: ObjectId, ref: 'User'  }]
});

export default model('Map', mapSchema);
