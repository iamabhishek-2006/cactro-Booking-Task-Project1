const { createBookingDB } = require("../service/bookingService");
const sendBookingEmail = require("../utils/sendEmail");

const createBooking=async(req,res)=>{
   const { customerName, customerEmail,event,numberOfTickets } =req.body; 
 
   try {
    const data = await createBookingDB({ customerName, customerEmail,event, numberOfTickets});
    await sendBookingEmail({
      customerName,
      customerEmail,
      movieName: data.event.movieName,
      date: data.event.date,
      numberOfTickets,
    });   
    
     return res.json({
        success:true,
        message:"customer booking successfully",
        data:data
    })
   } catch (error) {
    console.log(error)
    return res.json({
        success:false,
        error:"something went wrong"
    })
   }
}

module.exports={createBooking};