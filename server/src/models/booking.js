const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    customerName:{type:String,required:true},
    customerEmail:{type:String,required:true},
    event:{type:mongoose.Schema.Types.ObjectId,ref:"Event",required:true},
    numberOfTickets:{type:String,required:true},
},{timestamps:true});

const Booking=mongoose.model("Booking",bookingSchema);
module.exports=Booking;