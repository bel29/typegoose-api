import mongoose from "mongoose";
import config from "../config/default";
import log from "./logger";

async function connectToDb() {
  const dbUri = config.dbUri;

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;
