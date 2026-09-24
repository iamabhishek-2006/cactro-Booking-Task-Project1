const { eventCreateDB, eventUpdateDB } = require("../service/eventService");

const createEvent=async(req,res)=>{
    const {movieName, date } = req.body;
    try {
    const data=await eventCreateDB({movieName,date});
    if(!data){
        return res.json({
            success:false,
            error:"data not found"
        })
    }
    return res.json({
      success: true,
      message: "event created successfully",
      data: data,
    });
    } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "something went wrong",
    });
    }
}

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { movieName, date } = req.body;

  try {
    const data = await eventUpdateDB(id, { movieName, date });
    if (!data) {
      return res.json({
        success: false,
        error: "event not found",
      });
    }

    return res.json({
      success: true,
      message: "event updated successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports={createEvent,updateEvent}