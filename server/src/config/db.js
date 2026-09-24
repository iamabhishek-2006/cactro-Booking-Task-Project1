const mongoose=require("mongoose")

const DBConnection=async()=>{
    try {
     await mongoose.connect(process.env.DB_URL);
     console.log("database connected successfully 🐍");
    } catch (error) {
     console.log("database connection failed",error);
     process.exit(1)
    }
}

module.exports=DBConnection
