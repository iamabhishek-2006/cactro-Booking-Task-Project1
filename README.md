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

📌 Important Notes
1. Server and Worker are separate processes

The Express server handles API requests.

The worker handles background notification jobs.

Both need to be running during local testing of Task 2.

🧠 Important Concepts Demonstrated

This project demonstrates several backend development concepts:

<ul> <li>REST API development</li> <li>Express routing</li> <li>Controller-Service architecture</li> <li>MongoDB CRUD operations</li> <li>Mongoose schemas and models</li> <li>MongoDB ObjectId relationships</li> <li>Mongoose populate()</li> <li>Environment variables</li> <li>SMTP email sending</li> <li>Background job processing</li> <li>Redis queues</li> <li>BullMQ workers</li> <li>Docker container usage</li> <li>Asynchronous JavaScript</li> <li>Promises and async/await</li> <li>Error handling</li> <li>Separation of concerns</li> </ul>

🧱 Separation of Responsibilities

The project separates different responsibilities into different files.

Routes

Routes define API endpoints.

routes/
Controllers

Controllers handle HTTP requests and responses.

controllers/
Services

Services contain business logic and database operations.

services/
Models

Models define MongoDB schemas.

models/
Jobs

Jobs contain queue and worker-related functionality.

jobs/
Database

Database connection is maintained separately.

db/

This structure makes the application easier to maintain and extend.

🧪 Development Workflow

For local development, run the following:

Terminal 1 — Redis
docker start cactro-redis

If the container does not exist:

docker run --name cactro-redis -p 6379:6379 -d redis
Terminal 2 — Express Server
pnpm dev
Terminal 3 — Notification Worker
pnpm worker

Now the application is ready to process:

API Requests
     +
MongoDB
     +
Redis
     +
BullMQ
     +
Background Worker
     +
Email Notifications

🐳 Start Redis with Docker --> your choice if you don't use Docker then you use cloud redis

Start Redis:
docker run --name cactro-redis -p 6379:6379 -d redis

Verify:
docker ps
The application can then connect using:

REDIS_URL=redis://localhost:6379

👷 Start Notification Worker

The worker must run separately from the Express server.

pnpm worker
npm run worker

This executes:

👷 Notification Worker

The worker is responsible for processing notification jobs.

The worker runs independently from the main Express server.

Example command:

npm run worker

The worker:

1.Connects to MongoDB.
2.Connects to Redis through BullMQ.
3.Waits for notification jobs.
4.Receives an event update job.
5.Finds bookings related to that event.
6.Iterates through the bookings.
7.Sends notification emails.
8.Marks the job as completed.

node src/jobs/notificationWorker.js

🧵 Why Use a Worker?

Without a worker:

Request
  ↓
Update Event
  ↓
Find Bookings
  ↓
Send Email 1
  ↓
Send Email 2
  ↓
Send Email 3
  ↓
Response

The API request could take longer if many customers need to be notified.

With BullMQ:

Request
  ↓
Update Event
  ↓
Add Job
  ↓
Response

Then separately:

Worker
  ↓
Get Job
  ↓
Find Bookings
  ↓
Send Emails

This separates the API request from background notification processing.

⚙️ Environment Variables


Create a .env file in the project root.

PORT=3001
MONGO_URI=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

Suggested testing order
1. Start MongoDB
       ↓
2. Start Redis Docker container
       ↓
3. Start Express server
       ↓
4. Start notification worker
       ↓
5. Create Event
       ↓
6. Create Booking
       ↓
7. Check confirmation email
       ↓
8. Update Event
       ↓
9. Check BullMQ job
       ↓
10. Worker processes job
       ↓
11. Customer receives notification email


