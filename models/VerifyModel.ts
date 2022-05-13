import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    userID: requiredString,
    minecraftUUID: requiredString,
    verifiedSerevrs: [{ 
        serverID: requiredString,
        verified: {
            type: Boolean,
            required: true
        }
        }]
})

export default mongoose.model('VerifyModel', schema)