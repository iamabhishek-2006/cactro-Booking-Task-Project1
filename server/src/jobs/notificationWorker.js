require("dotenv").config();
const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const Event = require("../models/event");
const Booking = require("../models/booking");
const DBConnection = require("../config/db");
const { sendEventUpdateEmail } = require("../utils/sendEmail");

DBConnection();

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Redis connected");
});

connection.on("error", (error) => {
  console.log("Redis error:", error);
});

const notificationWorker = new Worker(
  "notification",
  async (job) => {
    console.log("Job received");
    console.log("Job name:", job.name);
    console.log("Job data:", job.data);
    const { eventId } = job.data;

    console.log("Processing event:", eventId);

    const event = await Event.findById(eventId); // yaha hum is populate bhi kara sakte hai

    if (!event) {
      throw new Error("Event not found");
    }

    const booking = await Booking.find({ event: eventId });
    console.log(`Found ${booking.length} bookings`);

    for (const bookingMovie of booking) {
      console.log("Sending email to:", bookingMovie.customerEmail);

      try {
        await sendEventUpdateEmail({
          customerName: bookingMovie.customerName,
          customerEmail: bookingMovie.customerEmail,
          movieName: event.movieName,
          date: event.date,
          numberOfTickets: bookingMovie.numberOfTickets,
        });

        console.log("Email sent successfully to:", bookingMovie.customerEmail);
      } catch (error) {
        console.log("EMAIL ERROR:");
        console.log(error);
      }
    }
  },
  {
    connection,
  },
);

notificationWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

notificationWorker.on("failed", (job, error) => {
  console.log(`Job ${job?.id} failed`);
  console.log("Workder error",error);
});

console.log("Notification worker started");




