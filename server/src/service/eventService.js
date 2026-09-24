const notificationQueue = require("../jobs/notificationQueue");
const Event = require("../models/event")

const eventCreateDB=async({movieName,date})=>{
    return await Event.create({movieName,date})
}

const eventUpdateDB = async (eventId, updateData) => {
  const event= await Event.findByIdAndUpdate(eventId,updateData,{returnDocument:"after"});

  if(!event){
    throw new Error("Event not found")
  }

  await notificationQueue.add("event-updated",{
    eventId:event._id.toString()
  })

  return event;

};

module.exports={eventCreateDB,eventUpdateDB}