import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Link DB successfully!");
  } catch (error) {
    console.log("ERROR when connect DB:", error);
    process.exit(1);
  }
};
