const Booking = require("../models/booking");

const createBookingDB=async({customerName, customerEmail,event, numberOfTickets})=>{
    const data= new Booking({customerName,customerEmail,event,numberOfTickets})
    return (await data.save()).populate("event")
    // await data.save();
    // await data.populate("event");
    // return data;
}




module.exports={createBookingDB };