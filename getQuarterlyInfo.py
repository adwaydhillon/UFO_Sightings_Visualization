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
    
    for x in range(0, 4):
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
    for row in spamreader:
        if count != 0:
            shape = row[4]
            date = row[0].split(" ")[0]
            month = int(date.split("/")[0])
            if shape == "Triangle":
                if month >= 1 and month <= 3:
                    table_data[0]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[0]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[0]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[0]['data'][3] += 1
                
            if shape == "Fireball":
                if month >= 1 and month <= 3:
                    table_data[1]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[1]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[1]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[1]['data'][3] += 1
                    
            if shape == "Formation":
                if month >= 1 and month <= 3:
                    table_data[2]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[2]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[2]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[2]['data'][3] += 1
                    
            if shape == "Light":
                if month >= 1 and month <= 3:
                    table_data[3]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[3]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[3]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[3]['data'][3] += 1
                    
            if shape == "Circle":
                if month >= 1 and month <= 3:
                    table_data[4]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[4]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[4]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[4]['data'][3] += 1
                    
            if shape == "Chevron":
                if month >= 1 and month <= 3:
                    table_data[5]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[5]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[5]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[5]['data'][3] += 1
                    
            if shape == "Egg":
                if month >= 1 and month <= 3:
                    table_data[6]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[6]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[6]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[6]['data'][3] += 1
                    
            if shape == "Diamond":
                if month >= 1 and month <= 3:
                    table_data[7]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[7]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[7]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[7]['data'][3] += 1
                    
            if shape == "Cylinder":
                if month >= 1 and month <= 3:
                    table_data[8]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[8]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[8]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[8]['data'][3] += 1
                    
            if shape == "Disk":
                if month >= 1 and month <= 3:
                    table_data[9]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[9]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[9]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[9]['data'][3] += 1
                    
            if shape == "Changing":
                if month >= 1 and month <= 3:
                    table_data[10]['data'][0] += 1
                if month >= 4 and month <= 6:
                    table_data[10]['data'][1] += 1
                if month >= 7 and month <= 9:
                    table_data[10]['data'][2] += 1
                if month >= 10 and month <= 12:
                    table_data[10]['data'][3] += 1
        count = count + 1

with open('data/quarterly_highcharts_data.json', 'w') as outfile:
	json.dump(table_data, outfile)