import mongoose from 'mongoose';
const { Schema, model , Types:{ObjectId} } = mongoose;

const markerSchema = new Schema({
  map: { type: ObjectId, ref: 'Map', required: true },        //  The map the marker is connected to
  type: { type: String, required: true },                     //  Character/Marker 
  title: { type: String, required: true },                    //  Name
  description: { type: String, required: true },              //  Description, duh
  image: { type: String },                                    //  Image of Character or map
  author: { type: ObjectId, ref: 'User', required: true },    //  Owner of Setting
  players: [{ type: ObjectId, ref: 'User' }],                 //  By Author invited User 
  date: { type: Date, default: Date.now },                    //  You guys don't have watches?
  race: { type: String },                                     //  Like in Elves, Dwarves, etc. 
  personality: { type: String },                              //  The Thing most people are missing
  background: { type: String },                               //  Backgroundstory of Place or Charakter
  canvas: { type: String },                                   //  Write whatever you want
 
  visibility:[{ type: ObjectId, ref: 'User'  }]               //  What is visible to Users
});

export default model('Marker', markerSchema);
