import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    _id: requiredString,
    userID: requiredString,
    minecraftUUID: String,
    password: requiredString

})

export default mongoose.model('TempPasswordModel', schema)