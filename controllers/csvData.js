const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const cardModel = require("../models/card")
let csvFileNames = ['Sample Card Status Info - Delivery exceptions.csv', 'Sample Card Status Info - Delivered.csv',  'Sample Card Status Info - Pickup.csv', 'Sample Card Status Info - Returned.csv'];

// async function instertCsvData(){
//  let  csvFilePath;
//  for(csvFileName of csvFileNames){
// csvFilePath = path.join(__dirname,'/..', 'csvFiles', csvFileName);
 



// const readStream = fs.createReadStream(csvFilePath);

// // Pipe the stream through csv-parser
// readStream.pipe(csv())
//   .on('data', async(row) => {
//     const status =  await getLastWordBeforeExtension(csvFileName)
//     console.log(status)
//    await cardModel.storeCardDetails(row, status)
//     // Each row represents a record in the CSV file
//     console.log(row);
//   })
//   .on('end', () => {
//     // This is called when the parsing is done
//     console.log('CSV file successfully processed');
//   })
//   .on('error', (error) => {
//     // Handle errors during parsing
//     console.error('Error during CSV parsing:', error.message);
//   });
// }
// }

async function insertCsvData(req, res, next) {
  try {
   
  let csvFilePath;
  
  for (const csvFileName of csvFileNames) {
    csvFilePath = path.join(__dirname, '/..', 'csvFiles', csvFileName);
    const readStream = fs.createReadStream(csvFilePath);

    readStream.pipe(csv())
      .on('data', async (row) => {
        const status = await getLastWordBeforeExtension(csvFileName);
        console.log(row.status=status);
        await cardModel.storeCardDetails(row, status);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      })
      .on('error', (error) => {
        console.error('Error during CSV parsing:', error.message);
      });
  }

} catch (error) {
    return res.status(500).json({success:false, message : "Some internal server error"})
}
}

function getLastWordBeforeExtension(filename) {
    // Extract the filename without extension
    const filenameWithoutExtension = filename.replace(/\.[^.]+$/, '');
  
    // Split the filename into words
    const words = filenameWithoutExtension.split(' ');
  
    // Return the last word
    return words[words.length - 1];
  }

  // Example usage:
//   const filename = 'Sample Card Status Info - Delivered.csv';
//   const lastWord = getLastWordBeforeExtension(filename);
//   console.log(lastWord);  // Output: Delivered
  
module.exports = {insertCsvData}