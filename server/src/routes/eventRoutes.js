const express=require("express");
const { createEvent, updateEvent } = require("../controller/eventController");

const router=express.Router();

router.post("/", createEvent);
router.put("/:id",updateEvent);

module.exports=router