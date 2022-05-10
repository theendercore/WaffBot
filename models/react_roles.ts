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
<<<<<<< HEAD:models/react_roles.ts
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
=======
>>>>>>> 68cf080 (fixed my boo boos):models/ReactRolesModdel.ts
            cataegory: String
}]
})

export default mongoose.model('verify', schema)