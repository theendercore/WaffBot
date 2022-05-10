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
<<<<<<< HEAD:models/react_roles.ts
            cataegory: requiredString,
            remove: {
                type: Boolean,
                required: true
            }
=======
<<<<<<< HEAD
            cataegory: String
>>>>>>> fc72cbc (finished reaload roles comand):models/ReactRolesModdel.ts
        }
        }]
=======
            cataegory: String
}]
>>>>>>> 12b1a91 (finished reaload roles comand)
})

export default mongoose.model('verify', schema)