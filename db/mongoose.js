import mongoose from "mongoose";
import '../models/mapModels.js';
import '../models/settingsModels.js';
import '../models/markerModels.js';

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB @ ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
})();
