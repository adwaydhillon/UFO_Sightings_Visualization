import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = []
    table_data.append(['Triangle', 0, 0, 0, 0])
    table_data.append(['Fireball', 0, 0, 0, 0])
    table_data.append(['Formation', 0, 0, 0, 0])
    table_data.append(['Light', 0, 0, 0, 0])
    table_data.append(['Circle', 0, 0, 0, 0])
    for row in spamreader:
        if count != 0:
            print "in here"
            shape = row[4]
            date = row[0].split(" ")[0]
            month = int(date.split("/")[0])
            print month
            if shape == "Triangle":
                if month >= 1 and month <= 3:
                    table_data[0][1] += 1
                if month >= 4 and month <= 6:
                    table_data[0][2] += 1
                if month >= 7 and month <= 9:
                    table_data[0][3] += 1
                if month >= 10 and month <= 12:
                    table_data[0][4] += 1
                
            if shape == "Fireball":
                if month >= 1 and month <= 3:
                    table_data[1][1] += 1
                if month >= 4 and month <= 6:
                    table_data[1][2] += 1
                if month >= 7 and month <= 9:
                    table_data[1][3] += 1
                if month >= 10 and month <= 12:
                    table_data[1][4] += 1
                    
            if shape == "Formation":
                if month >= 1 and month <= 3:
                    table_data[2][1] += 1
                if month >= 4 and month <= 6:
                    table_data[2][2] += 1
                if month >= 7 and month <= 9:
                    table_data[2][3] += 1
                if month >= 10 and month <= 12:
                    table_data[2][4] += 1
                    
            if shape == "Light":
                if month >= 1 and month <= 3:
                    table_data[3][1] += 1
                if month >= 4 and month <= 6:
                    table_data[3][2] += 1
                if month >= 7 and month <= 9:
                    table_data[3][3] += 1
                if month >= 10 and month <= 12:
                    table_data[3][4] += 1
                    
            if shape == "Circle":
                if month >= 1 and month <= 3:
                    table_data[4][1] += 1
                if month >= 4 and month <= 6:
                    table_data[4][2] += 1
                if month >= 7 and month <= 9:
                    table_data[4][3] += 1
                if month >= 10 and month <= 12:
                    table_data[4][4] += 1
        count = count + 1
    print table_data

with open('data/c3data.json', 'w') as outfile:
	json.dump(table_data, outfile)