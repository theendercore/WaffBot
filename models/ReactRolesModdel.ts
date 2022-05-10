import mongoose from "mongoose";

const requiredString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema({
    _id: requiredString,
    roleList: [{ 
            id: requiredString,
            emoji: requiredString,
            cataegory: String
}]
})

export default mongoose.model('ReactRolesModdel', schema)