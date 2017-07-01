import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = []

    for row in spamreader:
        if count != 0:
            summary = row[5]
            temp_index = summary.find("NUFORC reported speed:");
            if (temp_index > -1):
                temp_str = summary[temp_index:-1].split(" ")
                table_data.append(temp_str[len(temp_str) - 2])
        count = count + 1

with open('data/gauge_highcharts_data.json', 'w') as outfile:
	json.dump(table_data, outfile)