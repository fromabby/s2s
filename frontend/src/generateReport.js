import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import formatDate from "./formatDate";

import logo from "./sts_log.png";

// define a generatePDF function that accepts a tickets argument
const generatePDF = ({ records, user }) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Date", "Name", "Platform", "Amount"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  records.forEach((record, index) => {
    const recordData = [
      index + 1,
      formatDate(record.record_date),
      record.record_name,
      record.record_platform,
      record.record_amount,
      // called date-fns to format the date on the ticket
    ];
    // push each tickcet's info into a row
    tableRows.push(recordData);
  });
  doc.setFontSize(8);
  doc.text(formatDate(Date.now()).toUpperCase(), 15, 5);
  doc.text(`${user.name.first_name?.toUpperCase()} ${user.name.last_name?.toUpperCase()}`, 15, 10);
  doc.text("streetstoschools.org@gmail.com".toUpperCase(), 15, 15);


  doc.addImage(logo, "PNG", 90, 18, 30, 30);
  doc.setFontSize(12);
  doc.setFont("calibri");
  // ticket title. and margin-top + margin-left

  doc.text("STREETS TO SCHOOLS", 83, 53);
  doc.text("DONATION REPORT", 86, 58);

  doc.autoTable(tableColumn, tableRows, { startY: 65 });

  // we define the name of our PDF file.
  doc.save("report.pdf");
};

export default generatePDF;
