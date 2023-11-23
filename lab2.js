const fs = require('fs');

// 读取客户数据的JSON文件
const customersFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/customers.json'; // 替换为实际文件路径
const taggedCustomersFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/taggedcustomers.json'; // 输出文件的路径

// 映射字段到敏感性标签
const sensitivityMapping = {
  'chino': 'hsi',
  'name': 'si',
  'medication': 'si',
  'county': 'qsi',
  'city': 'qsi',
  'ethnicity': 'qsi',
  'volume': 'lsi'
};

// 为每个字段分配标签
function tagCustomerData(customer) {
  const taggedCustomer = {};
  for (const [key, value] of Object.entries(customer)) {
    taggedCustomer[key] = {
      value: value,
      tag: sensitivityMapping[key] || 'lsi' // 默认分配为'lsi'
    };
  }
  return taggedCustomer;
}

// 读取并处理JSON文件
fs.readFile(customersFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const customers = JSON.parse(data);
  const taggedCustomers = customers.map(tagCustomerData);

  // 保存带标签的客户数据
  fs.writeFile(taggedCustomersFilePath, JSON.stringify(taggedCustomers, null, 2), err => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Tagged customer data saved to', taggedCustomersFilePath);
    }
  });
});
