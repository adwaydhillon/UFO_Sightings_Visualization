import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = []
    table_data.append({'name': 'Triangle', 'data': []});
    table_data.append({'name': 'Fireball', 'data': []});
    table_data.append({'name': 'Formation', 'data': []});
    table_data.append({'name': 'Light', 'data': []});
    table_data.append({'name': 'Circle', 'data': []});
    table_data.append({'name': 'Chevron', 'data': []});
    table_data.append({'name': 'Egg', 'data': []});
    table_data.append({'name': 'Diamond', 'data': []});
    table_data.append({'name': 'Cylinder', 'data': []});
    table_data.append({'name': 'Disk', 'data': []});
    table_data.append({'name': 'Changing', 'data': []});
    
    for x in range(0, 12):
        table_data[0]['data'].append(0);
        table_data[1]['data'].append(0);
        table_data[2]['data'].append(0);
        table_data[3]['data'].append(0);
        table_data[4]['data'].append(0);
        table_data[5]['data'].append(0);
        table_data[6]['data'].append(0);
        table_data[7]['data'].append(0);
        table_data[8]['data'].append(0);
        table_data[9]['data'].append(0);
        table_data[10]['data'].append(0);
    print table_data
    for row in spamreader:
        if count != 0:
            shape = row[4]
            date = row[0].split(" ")[0]
            month = int(date.split("/")[0])
            if shape == "Triangle":
                table_data[0]['data'][month-1] += 1
                
            if shape == "Fireball":
                table_data[1]['data'][month-1] += 1
                    
            if shape == "Formation":
                table_data[2]['data'][month-1] += 1
                    
            if shape == "Light":
                table_data[3]['data'][month-1] += 1
                    
            if shape == "Circle":
                table_data[4]['data'][month-1] += 1
                    
            if shape == "Chevron":
                table_data[5]['data'][month-1] += 1
                    
            if shape == "Egg":
                table_data[6]['data'][month-1] += 1
                    
            if shape == "Diamond":
                table_data[7]['data'][month-1] += 1
                    
            if shape == "Cylinder":
                table_data[8]['data'][month-1] += 1
                    
            if shape == "Disk":
                table_data[9]['data'][month-1] += 1
                    
            if shape == "Changing":
                table_data[10]['data'][month-1] += 1
        count = count + 1

with open('data/monthly_highcharts_data.json', 'w') as outfile:
	json.dump(table_data, outfile)