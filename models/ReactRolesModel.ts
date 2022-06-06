import mongoose from "mongoose";
import { requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  reactRoleChannel: {
    id: requiredString,
    messageId: requiredString,
  },
  roleList: [
    {
      id: requiredString,
      emoji: requiredString,
      category: String,
      description: requiredString,
    },
  ],
});

export default mongoose.model("ReactRolesModel", schema);
