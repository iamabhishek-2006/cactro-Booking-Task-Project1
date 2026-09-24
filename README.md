Questions (cactro-task)

<h3>Design and implement the backend APIs for an Event Booking System</h1>
<p>AI tools are encouraged. Document ALL Your design decisions in the README.md file . Do spend some time initially to plain out how you will do it. manage your time accordingly. Deploy it online. You can use Vercel , Netliy , Cloudflare , Heroku , Render, etc </p>

<h2>Support two types of users:</h2>
<strong>Event Organizes</strong>
<strong>Customers</strong>

<p>Event Organizers manage event , while Customers browse event and book tickets. API access must be controlled based on user roles.</p>

<h3>Implement background tasks using any job queue or async processing mechanism of your choice.</h2>

<h1><strong>Background Task 1:</strong> Booking Confirmation</h1>
<p>Trigger when a customer successfully books tickers</p>

<p>Sends a real booking confirmation email (a console log/ print statement indicating the email actions is NOT sufficient)</p>

<h1><strong>Background Task 2:</strong> Event Update Notification</h1>

<p>Notifies all customers who have booked tickets for that event (a console log/ print statement indicating notification is NOT sufficient)</p>

<h1>Performance</h1>

<p>Run a stress scenario on Your APIs and find out how many users can it handle simultaneously for booking an event</p>

📊 Complete Task 1 Architecture
                    ┌──────────────┐
                    │   Client     │
                    └──────┬───────┘
                           │
                           │ POST /booking
                           ▼
                  ┌──────────────────┐
                  │ Booking Route    │
                  └────────┬─────────┘
                           ▼
                  ┌──────────────────┐
                  │ Booking          │
                  │ Controller       │
                  └────────┬─────────┘
                           ▼
                  ┌──────────────────┐
                  │ Booking Service  │
                  └────────┬─────────┘
                           ▼
                  ┌──────────────────┐
                  │    MongoDB       │
                  │    Booking       │
                  └────────┬─────────┘
                           ▼
                    Populate Event
                           │
                           ▼
                  ┌──────────────────┐
                  │  Email Service   │
                  └────────┬─────────┘
                           ▼
                    ┌─────────────┐
                    │ Nodemailer  │
                    └──────┬──────┘
                           ▼
                    Customer Email

📊 Complete Task 2 Architecture
                    ┌──────────────┐
                    │     Admin    │
                    └──────┬───────┘
                           │
                           │ Update Event
                           ▼
                  ┌──────────────────┐
                  │ Event Controller │
                  └────────┬─────────┘
                           ▼
                  ┌──────────────────┐
                  │ Event Service    │
                  └────────┬─────────┘
                         
  │
                     Update MongoDB
                           │
                           ▼
                  ┌──────────────────┐
                  │   BullMQ Queue   │
                  └────────┬─────────┘
                           ▼
                    ┌────────────┐
                    │   Redis    │
                    └─────┬──────┘
                          │
                          ▼
               ┌─────────────────────┐
               │ Notification Worker │
               └──────────┬──────────┘
                          │
                          ▼
                  Find Event Bookings
                          │
                          ▼
                    ┌────────────┐
                    │  Bookings  │
                    └─────┬──────┘
                          │
                          ▼
                   Send Emails
                          │
                          ▼
                    Customers

🚀 Project Folder Structure

The backend follows a modular structure:

server/
│
├── app.js
├── package.json
├── pnpm-lock.yaml
├── .env
├── .gitignore
│
└── src/
    │
    ├── db/
    │   └── DBconnection.js
    │
    ├── models/
    │   ├── booking.js
    │   └── event.js
    │
    ├── routes  │   
    │   ├── bookingRoutes.js
    │   └── eventRoutes.js
    │
    ├── controllers/
    │   ├── bookingController.js
    │   └── eventController.js
    │
    ├── services/
    │   ├── bookingService.js
    │   ├── eventService.js
    │
    │ 
    └── jobs/
        ├── notificationQueue.js
        └── notificationWorker.js
  
Booking Model

A booking contains customer and event information.

Example:

{
    customerName: String,
    customerEmail: String,
    event: ObjectId,
    numberOfTickets: Number
}

The event field references the Event collection.

event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
}


<h2>🛠️ Technologies and libraries used</h2>

<strong>🟢 Node.js</strong>
<p>Used as the **backend runtime environment** to run JavaScript on the server and handle the application logic.</p>
 
<strong>🚀Express.js</strong>
<p>Used to build the **REST APIs**, handle HTTP requests, create routes, and manage server-side operations.</p>

<strong> 🍃 MongoDB</strong>
<p>Used as the **database** to store events, bookings, customer details, and ticket information.</p>

<strong>🔗Mongoose</strong>
<p>Used to connect the Node.js application with MongoDB and manage **schemas, models, validation, queries, and document relationships**.</p>

<strong>🔴Redis</strong>
<p>Used to store and manage **background job data** required by the notification system.</p>

<strong>📦 BullMQ</strong>
<p>Used to create and manage **asynchronous job queues**. When an event is updated, a notification job is added to the queue for background processing.</p>

<strong> 🐳 Docker </strong>
<p>Used to run **Redis inside a Docker container**, making the Redis setup easier and consistent during development.</p>

<strong>📧 Nodemailer</strong>
<p>Used to send **real emails** to customers, including booking confirmation emails and event update notification emails.</p>

### 🟨 JavaScript

Used as the **main programming language** for implementing the server, APIs, database operations, email service, queue system, and worker logic.


