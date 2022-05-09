import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    serverID: {
        type: String,
        required: true
    },
    roleList: [{ 
        role: {
            id: requiredString,
            emoji: requiredString,
            cataegory: requiredString,
            remove: {
                type: Boolean,
                required: true
            }
        }
        }]
})

export default mongoose.model('verify', schema)