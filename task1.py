import json

# 假设原始JSON数据存储在名为'original_data.json'的文件中
input_file_path = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/customers.json'  # 这里替换为实际文件路径

# 读取JSON文件
with open(input_file_path, 'r') as file:
    data = json.load(file)

# 过滤数据
filtered_data = [
    {
        "medication": entry["medication"],
        "volume": entry["volume"],
        "location": f"{entry['city']}, {entry['county']}"
    }
    for entry in data
]

# 保存过滤后的数据到新文件
output_file_path = '/Users/mark/Downloads/MSC/System Security/Labs/Lab4/medicationbyvolume.json'
with open(output_file_path, 'w') as file:
    json.dump(filtered_data, file, indent=2)
