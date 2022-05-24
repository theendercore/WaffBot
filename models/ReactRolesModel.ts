import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    _id: requiredString,
    reactRoleChannel:{
        id: requiredString,
        messageId: requiredString
    },
    roleList: [{ 
            id: requiredString,
            emoji: requiredString,
            category: String,
            description: requiredString
}]
})

export default mongoose.model('ReactRolesModel', schema)