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
    
#    table_data.append(['Fireball'])
#    table_data.append(['Formation'])
#    table_data.append(['Light'])
#    table_data.append(['Circle'])
#    table_data.append(['Chevron'])
#    table_data.append(['Egg'])
#    table_data.append(['Diamond'])
#    table_data.append(['Cylinder'])
#    table_data.append(['Disk'])
#    table_data.append(['Changing'])
    
    for x in range(0, 365):
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
            day = int(date.split("/")[1])
            if month == 1:
                day = day;
            if month == 2:
                day = 31 + day;
            if month == 3:
                day = 31 + 29 + day;
            if month == 4:
                day = 31 + 29 + 31 + day;
            if month == 5:
                day = 31 + 29 + 31 + 30 + day;
            if month == 6:
                day = 31 + 29 + 31 + 30 + 31 + day;  
            if month == 7:
                day = 31 + 29 + 31 + 30 + 31 + 30 + day;
            if month == 8:
                day = 31 + 29 + 31 + 30 + 31 + 30 + 31 + day;
            if month == 9:
                day = 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + day;
            if month == 10:
                day = 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + day;
            if month == 11:
                day = 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + day;
            if month == 12:
                day = 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + day;
            
            day -= 1
            
            if shape == "Triangle":
                table_data[0]['data'][day] += 1
            if shape == "Fireball":
                table_data[1]['data'][day] += 1
            if shape == "Formation":
                table_data[2]['data'][day] += 1
            if shape == "Light":
                table_data[3]['data'][day] += 1
            if shape == "Circle":
                table_data[4]['data'][day] += 1
            if shape == "Chevron":
                table_data[5]['data'][day] += 1
            if shape == "Egg":
                table_data[6]['data'][day] += 1
            if shape == "Diamond":
                table_data[7]['data'][day] += 1
            if shape == "Cylinder":
                table_data[8]['data'][day] += 1
            if shape == "Disk":
                table_data[9]['data'][day] += 1
            if shape == "Changing":
                table_data[10]['data'][day] += 1
        count += 1
        
with open('data/scatter_highcharts_data.json', 'w') as outfile:
	json.dump(table_data, outfile)