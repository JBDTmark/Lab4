
const fs = require('fs');

const fileContent = fs.readFileSync('/Users/mark/Downloads/MSC/System Security/Labs/Lab4/customers.json', 'utf8');
const data = JSON.parse(fileContent);
const newArray = Array.from(data);

// Create an object to store the summary
const summary = {};

// Iterate over the newArray and count the occurrences
for (let i = 0; i < newArray.length; i++) {
    const element = newArray[i];
    const { medication, city, volume } = element;
    const key = `${medication}-${city}`;

    if (summary[key]) {
        summary[key].volume += volume;
    } else {
        summary[key] = { medication, city, volume };
    }
}

// Create a new object to store the updated summary
const updatedSummary = {};

// Iterate over the summary object and update the total volume
for (const key in summary) {
    const { medication, city, volume } = summary[key];
    const updatedKey = `${medication}-${city}`;

    if (updatedSummary[updatedKey]) {
        updatedSummary[updatedKey].volume += volume;
    } else {
        updatedSummary[updatedKey] = { medication, city, volume };
    }
}


// Transfer the values of updatedSummary object to an array
const updatedSummaryArray = [];
for (const key in updatedSummary) {
    updatedSummaryArray.push(updatedSummary[key]);
}

// Define the output path of the new file
const outputPath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/output1.json';

// Write the updatedSummaryArray to the new output file
fs.writeFileSync(outputPath, JSON.stringify(updatedSummaryArray, null, 2));

console.log(updatedSummary);
