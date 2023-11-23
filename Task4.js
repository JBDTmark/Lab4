const fs = require('fs');

// point to the files
const sourceFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/taggedcustomers.json';
const medicalFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/medicalDatastore.json';
const medicalAddressFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/medicalAddressDatastore.json';
const fullDataFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/fullDataDatastore.json';

// read the source file
fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the source file:', err);
    return;
  }

  const customers = JSON.parse(data);

  // create new datastores
  const medicalDatastore = customers.map(customer => {
    return { 'medication': customer.medication };
  });

  const medicalAddressDatastore = customers.map(customer => {
    return {
      'medication': customer.medication,
      'city': customer.city,
      'county': customer.county
    };
  });

  const fullDataDatastore = customers.map(customer => {
    return {
      'medication': customer.medication,
      'city': customer.city,
      'county': customer.county,
      'ethnicity': customer.ethnicity
    };
  });

  // save the datastores to files
  fs.writeFile(medicalFilePath, JSON.stringify(medicalDatastore, null, 2), err => {
    if (err) console.error('Error writing the medical records file:', err);
  });

  fs.writeFile(medicalAddressFilePath, JSON.stringify(medicalAddressDatastore, null, 2), err => {
    if (err) console.error('Error writing the medical and address records file:', err);
  });

  fs.writeFile(fullDataFilePath, JSON.stringify(fullDataDatastore, null, 2), err => {
    if (err) console.error('Error writing the full records file:', err);
  });
});
