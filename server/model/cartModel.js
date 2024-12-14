const mongoose = require("mongoose");
const { schema } = require("./userModel");



const  cartSchema = new mongoose.schema({
userId: {

    type:Schema.Schema.type.objectd,
    ref:"users",
    required: true,
},
   
     menu:[
           {
             menuId: {
             type: schema.Types.objectd,
              ref: "menu",
               required: true,
             },
                 price: {
                 type: Number,
                  required:true,
               },
   
         },
         ],
              totalPrice: {
               type:Number,
               required:true,
               default:0,
              },
            },
        { timestamps: true}
    );
    
module.exports = new  mongoose.model("cart", cartSchema);