//later

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateTicketPDF = async (ticketData) => {
  const doc = new PDFDocument();
  const filePath = path.join("tickets", `ticket_${Date.now()}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Trip Ticket", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${ticketData.name}`);
  doc.text(`Email: ${ticketData.email}`);
  doc.text(`From: ${ticketData.trip.from}`);
  doc.text(`To: ${ticketData.trip.to}`);
  doc.text(`Date: ${ticketData.trip.date}`);
  doc.text(`Seats: ${ticketData.seats.join(", ")}`);
  doc.text(`Price: ₹${ticketData.price}`);
  doc.text(`Booking Date: ${ticketData.bookingDate}`);

  doc.end();
  return filePath;
};
