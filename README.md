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

