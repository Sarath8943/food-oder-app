const mongoose =require("mongoose")

const discountSchema = new mongoose.Schema({
    code:{

        type:String,
        required: true,
        unique: true,
        trim: true,

    },
    discount: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required:true,
        },

   endDate:{
            type: Date,
            required: true,
         },

isActive: {
            type: Boolean,
            default:true,
         },

      
}, { timestamps: true });

 module.exports = mongoose.model("discount", discountSchema);