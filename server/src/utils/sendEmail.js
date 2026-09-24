const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});

const sendBookingEmail=async({customerName,customerEmail,movieName,date,numberOfTickets})=>{
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: "Booking Confirmation",
      html: `
      <h2>Booking Confirmed</h2>

      <p>Hello ${customerName},</p>

      <p>Your movie ticket booking has been successfully confirmed.</p>

      <p><strong>Movie:</strong> ${movieName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Tickets:</strong> ${numberOfTickets}</p>

      <p>Thank you for booking with us.</p>
    `,
    });
}

const sendEventUpdateEmail = async ({ customerName, customerEmail, movieName, date, numberOfTickets,}) => {
  console.log("sendEventUpdateEmail called");

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Event Update - ${movieName}`,
    html: `
      <div>
        <h2>Event Update</h2>

        <p>Hello dear ${customerName},</p>

        <p>
          There has been an update regarding your booked event.
        </p>

        <p><strong>Movie:</strong> ${movieName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Tickets:</strong> ${numberOfTickets}</p>

        <p>Please check the updated details before attending.</p>

        <p>Thank you for booking with us.</p>
      </div>
    `,
  });

  console.log("Nodemailer response:", info);
};

module.exports={sendBookingEmail,sendEventUpdateEmail}