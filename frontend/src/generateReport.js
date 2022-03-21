
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import formatDate from "./formatDate";

// define a generatePDF function that accepts a tickets argument
const generatePDF = records => {
    // initialize jsPDF
    const doc = new jsPDF();

    var imgData = 'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-1/275989349_1331440283934989_4025445647150003821_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeEyOftDJe_Rjn4LfGf-Wa7Xs3eKpW2RAwWzd4qlbZEDBWCxaqqRmLMQvEhV0VfVDkamulw-MJgf8omkPWkSqm68&_nc_ohc=6eALPmJum48AX-okpfb&_nc_ht=scontent.fmnl4-1.fna&oh=00_AT_nSXxRY2n818yALvaDhc5Js1Mwvtzu9bYuHkmUsR8Rmw&oe=623CF4A7'

    // define the columns we want and their titles
    const tableColumn = ["Id", "Date", "Name", "Platform", "Amount"];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    records.forEach((record, index) => {
        const recordData = [
            (index + 1),
            formatDate(record.date),
            record.record_name,
            record.record_platform,
            record.record_amount,
            // called date-fns to format the date on the ticket

        ];
        // push each tickcet's info into a row
        tableRows.push(recordData);
    });


    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 50 });
    doc.addImage(imgData, 'PNG', 97, 5, 20, 20)
    doc.setFontSize(8)
    // ticket title. and margin-top + margin-left
    doc.text("STREETS TO SCHOOLS", 91, 33);
    doc.text("DONATION REPORT", 93.6, 36.5);

    // we define the name of our PDF file.
    doc.save("report.pdf")
};

export default generatePDF;