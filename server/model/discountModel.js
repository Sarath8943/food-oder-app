const mongoose =require("mongoose")
const { validate } = require("./userModel")

const discountSchema = new mongoose.Schema({
    code:{

        type:String,
        required: true,
        unique: true,
        trim: true,

    },
    description: {
        type: String,
        default: "no description provided",
    },
    discount: {
        type: String,
        enum: ['percentage','fixed'],
        required: true,
    },
    value: {
        type: Number,
        required:true,
        validate: {
            validator: function (v) {
            return v > 0;
        },

        message: props => `${props.value} should br greater than 0!`
        }
        },
         startDate: {
            type: Date,
            required: true,
         },
         endDate:{
            type: Date,
            required: true,

         },
         isActive: {
            type: Boolean,
            default:true,
         },
         usageLimit: {
            type: Number,
            default: null,
         },
         usedcount: {
            type: Number,
            default: 0,
         },

         applicableprodcts: [
            {
                type: mongoose.Schema.Types,objectid,
                ref:"cart"

            }
         ]
       
}, { timestamps: true });

          module.exports = mongoose.nodel("discount", discountSchema);