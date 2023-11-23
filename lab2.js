const fs = require('fs');

// read and write files
const customersFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/customers.json'; 
const taggedCustomersFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/taggedcustomers.json'; 

fs.readFile(customersFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

// map fields to tags
const sensitivityMapping = {
  'chino': 'hsi',
  'name': 'si',
  'medication': 'si',
  'county': 'qsi',
  'city': 'qsi',
  'ethnicity': 'qsi',
  'volume': 'lsi'
};

const MRPMapping = {
  'chino': '1 year',
  'name': '1 year',
  'medication': '1 year',
  'county': '1 year',
  'city': '1 year',
  'ethnicity': '1 year',
  'volume': '1 year'
};

// allocate tags to customer data
function tagCustomerData(customer) {
  const taggedCustomer = {};
  for (const [key, value] of Object.entries(customer)) {
    taggedCustomer[key] = {
      value: value,
      tag: sensitivityMapping[key] || 'lsi',
      MRP: MRPMapping[key] || '1 year'
    };
  }
  return taggedCustomer;
}



  const customers = JSON.parse(data);
  const taggedCustomers = customers.map(tagCustomerData);

  // save the tagged customer data to a new file
  fs.writeFile(taggedCustomersFilePath, JSON.stringify(taggedCustomers, null, 2), err => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Tagged customer data saved to', taggedCustomersFilePath);
    }
  });
});
