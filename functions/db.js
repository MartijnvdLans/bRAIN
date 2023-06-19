import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the database!");
});

// Define a schema
const UserInfoSchema = new mongoose.Schema({
  rainAmount: Number,
  waterDrains: Number,
  rainBarrels: Number,
  roofSurface: Number,
  rainBarrelEmptied: Boolean,
});

// Define a model
const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

export { UserInfo };