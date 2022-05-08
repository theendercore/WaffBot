import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    userID: requiredString,
    minecraftUUID: requiredString,
    verifyPWD: requiredString,
    pendingUUID: requiredString,
    verified: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('verify', schema)