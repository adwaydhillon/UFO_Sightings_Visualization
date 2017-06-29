import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = []
    table_data.append({'name': 'Triangle', 'y': 0});
    table_data.append({'name': 'Fireball', 'y': 0});
    table_data.append({'name': 'Formation', 'y': 0});
    table_data.append({'name': 'Light', 'y': 0});
    table_data.append({'name': 'Circle', 'y': 0, 'sliced': 'true'});
    table_data.append({'name': 'Chevron', 'y': 0});
    table_data.append({'name': 'Egg', 'y': 0});
    table_data.append({'name': 'Diamond', 'y': 0});
    table_data.append({'name': 'Cylinder', 'y': 0});
    table_data.append({'name': 'Disk', 'y': 0});
    table_data.append({'name': 'Changing', 'y': 0});

    for row in spamreader:
        if count != 0:
            shape = row[4]
            if shape == "Triangle":
                table_data[0]['y'] += 1
                
            if shape == "Fireball":
                table_data[1]['y'] += 1
                    
            if shape == "Formation":
                table_data[2]['y'] += 1
                    
            if shape == "Light":
                table_data[3]['y'] += 1
                    
            if shape == "Circle":
                table_data[4]['y'] += 1
                    
            if shape == "Chevron":
                table_data[5]['y'] += 1
                    
            if shape == "Egg":
                table_data[6]['y'] += 1
                    
            if shape == "Diamond":
                table_data[7]['y'] += 1
                    
            if shape == "Cylinder":
                table_data[8]['y'] += 1
                    
            if shape == "Disk":
                table_data[9]['y'] += 1
                    
            if shape == "Changing":
                table_data[10]['y'] += 1
        count = count + 1
        
dict = {'name': 'Share', 'colorByPoint': 'true', 'data': table_data}
table_data = [dict]

with open('data/pie_highcharts_data.json', 'w') as outfile:
	json.dump(table_data, outfile)