import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const baseUrl = process.env.DATABASE_URL;

const connectToDb = async () => {
  try {
    await mongoose.connect(baseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Database");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
