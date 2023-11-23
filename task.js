const fs = require('fs');

// 假设原始JSON数据存储在名为'original_data.json'的文件中
const inputFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/customers.json'; // 替换为实际文件路径

// 读取JSON文件
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // 解析JSON数据
  const entries = JSON.parse(data);

  // 使用对象来汇总数据
  const summary = {};

  entries.forEach(entry => {
    // 构建键名，用于标识同一种药物在同一地点
    const key = `${entry.medication}@${entry.city}, ${entry.county}`;
    // 如果该键名不存在，则初始化
    if (!summary[key]) {
      summary[key] = {
        medication: entry.medication,
        location: `${entry.city}, ${entry.county}`,
        volume: 0
      };
    }
    // 累加同种药物在同一地点的数量
    summary[key].volume += entry.volume;
  });

  // 将汇总对象的值转换为数组
  const aggregatedData = Object.values(summary);

  // 定义输出文件路径
  const outputFilePath = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/medicationbyvolume.json'; // 替换为实际文件路径

  // 将汇总后的数据写入新文件
  fs.writeFile(outputFilePath, JSON.stringify(aggregatedData, null, 2), err => {
    if (err) {
      console.error('Error writing the file:', err);
    } else {
      console.log('Aggregated data saved to', outputFilePath);
    }
  });
});
