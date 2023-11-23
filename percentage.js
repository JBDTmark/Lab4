const fs = require('fs');

// read and write files
const taggedCustomersFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/taggedcustomers.json'; // 输出文件的路径

fs.readFile(taggedCustomersFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const taggedCustomers = JSON.parse(data);
  
  const tagCounts = {
    hsi: 0,
    si: 0,
    qsi: 0,
    lsi: 0
  };

  let totalTags = 0;

  // calculate the number of occurrences of each tag
  taggedCustomers.forEach(customer => {
    for (const key in customer) {
      const tag = customer[key].tag;
      if (tagCounts.hasOwnProperty(tag)) {
        tagCounts[tag]++;
        totalTags++;
      }
    }
  });

  // calculate the percentage of each tag
  const tagPercentages = {};
  for (const tag in tagCounts) {
    tagPercentages[tag] = ((tagCounts[tag] / totalTags) * 100).toFixed(2) + '%';
  }

  // print
  console.log(tagPercentages);

  // save the percentages to a new file
  const outputFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/tagPercentages.json';
  fs.writeFile(outputFilePath, JSON.stringify(tagPercentages, null, 2), err => {
    if (err) {
      console.error('Error writing the percentages file:', err);
    } else {
      console.log('Tag percentages saved to', outputFilePath);
    }
  });
});
