import csv
import json

with open('data/data.csv', 'rU') as csvfile:
	spamreader = csv.reader(csvfile)
	count = 0
	data = {}
	for row in spamreader:
		dict = {"key": row[4], "region": row[1], "subregion": row[3], "value": 1};
		if count != 0:
			temp_str = row[1] + "_" + row[3] + "_" + row[4]
			if (temp_str in data):
				new_val = data[temp_str]["value"] + 1
				data[temp_str] = {"key": row[4], "region": row[1], "subregion": row[3], "value": new_val}
			else:
				data[temp_str] = {"key": row[4], "region": row[1], "subregion": row[3], "value": 1}
		count = count + 1

with open('countries.json', 'w') as outfile:
	json.dump(data.values(), outfile)
	data = data.values();