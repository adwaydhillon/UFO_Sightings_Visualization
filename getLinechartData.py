import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = []
    table_data.append(['Triangle', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Fireball', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Formation', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Light', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Circle', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Chevron', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Egg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Diamond', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Cylinder', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Disk', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    table_data.append(['Changing', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    for row in spamreader:
        if count != 0:
            shape = row[4]
            date = row[0].split(" ")[0]
            month = int(date.split("/")[0])
            if shape == "Triangle":
                if month == 1:
                    table_data[0][1] += 1
                if month == 2:
                    table_data[0][2] += 1
                if month == 3:
                    table_data[0][3] += 1
                if month == 4:
                    table_data[0][4] += 1
                if month == 5:
                    table_data[0][5] += 1
                if month == 6:
                    table_data[0][6] += 1
                if month == 7:
                    table_data[0][7] += 1
                if month == 8:
                    table_data[0][8] += 1
                if month == 9:
                    table_data[0][9] += 1
                if month == 10:
                    table_data[0][10] += 1
                if month == 11:
                    table_data[0][11] += 1
                if month == 12:
                    table_data[0][12] += 1
                
            if shape == "Fireball":
                if month == 1:
                    table_data[1][1] += 1
                if month == 2:
                    table_data[1][2] += 1
                if month == 3:
                    table_data[1][3] += 1
                if month == 4:
                    table_data[1][4] += 1
                if month == 5:
                    table_data[1][5] += 1
                if month == 6:
                    table_data[1][6] += 1
                if month == 7:
                    table_data[1][7] += 1
                if month == 8:
                    table_data[1][8] += 1
                if month == 9:
                    table_data[1][9] += 1
                if month == 10:
                    table_data[1][10] += 1
                if month == 11:
                    table_data[1][11] += 1
                if month == 12:
                    table_data[1][12] += 1
                    
            if shape == "Formation":
                if month == 1:
                    table_data[2][1] += 1
                if month == 2:
                    table_data[2][2] += 1
                if month == 3:
                    table_data[2][3] += 1
                if month == 4:
                    table_data[2][4] += 1
                if month == 5:
                    table_data[2][5] += 1
                if month == 6:
                    table_data[2][6] += 1
                if month == 7:
                    table_data[2][7] += 1
                if month == 8:
                    table_data[2][8] += 1
                if month == 9:
                    table_data[2][9] += 1
                if month == 10:
                    table_data[2][10] += 1
                if month == 11:
                    table_data[2][11] += 1
                if month == 12:
                    table_data[2][12] += 1
                    
            if shape == "Light":
                if month == 1:
                    table_data[3][1] += 1
                if month == 2:
                    table_data[3][2] += 1
                if month == 3:
                    table_data[3][3] += 1
                if month == 4:
                    table_data[3][4] += 1
                if month == 5:
                    table_data[3][5] += 1
                if month == 6:
                    table_data[3][6] += 1
                if month == 7:
                    table_data[3][7] += 1
                if month == 8:
                    table_data[3][8] += 1
                if month == 9:
                    table_data[3][9] += 1
                if month == 10:
                    table_data[3][10] += 1
                if month == 11:
                    table_data[3][11] += 1
                if month == 12:
                    table_data[3][12] += 1
                    
            if shape == "Circle":
                if month == 1:
                    table_data[4][1] += 1
                if month == 2:
                    table_data[4][2] += 1
                if month == 3:
                    table_data[4][3] += 1
                if month == 4:
                    table_data[4][4] += 1
                if month == 5:
                    table_data[4][5] += 1
                if month == 6:
                    table_data[4][6] += 1
                if month == 7:
                    table_data[4][7] += 1
                if month == 8:
                    table_data[4][8] += 1
                if month == 9:
                    table_data[4][9] += 1
                if month == 10:
                    table_data[4][10] += 1
                if month == 11:
                    table_data[4][11] += 1
                if month == 12:
                    table_data[4][12] += 1
                    
            if shape == "Chevron":
                if month == 1:
                    table_data[5][1] += 1
                if month == 2:
                    table_data[5][2] += 1
                if month == 3:
                    table_data[5][3] += 1
                if month == 4:
                    table_data[5][4] += 1
                if month == 5:
                    table_data[5][5] += 1
                if month == 6:
                    table_data[5][6] += 1
                if month == 7:
                    table_data[5][7] += 1
                if month == 8:
                    table_data[5][8] += 1
                if month == 9:
                    table_data[5][9] += 1
                if month == 10:
                    table_data[5][10] += 1
                if month == 11:
                    table_data[5][11] += 1
                if month == 12:
                    table_data[5][12] += 1
                    
            if shape == "Egg":
                if month == 1:
                    table_data[6][1] += 1
                if month == 2:
                    table_data[6][2] += 1
                if month == 3:
                    table_data[6][3] += 1
                if month == 4:
                    table_data[6][4] += 1
                if month == 5:
                    table_data[6][5] += 1
                if month == 6:
                    table_data[6][6] += 1
                if month == 7:
                    table_data[6][7] += 1
                if month == 8:
                    table_data[6][8] += 1
                if month == 9:
                    table_data[6][9] += 1
                if month == 10:
                    table_data[6][10] += 1
                if month == 11:
                    table_data[6][11] += 1
                if month == 12:
                    table_data[6][12] += 1
                    
            if shape == "Diamond":
                if month == 1:
                    table_data[7][1] += 1
                if month == 2:
                    table_data[7][2] += 1
                if month == 3:
                    table_data[7][3] += 1
                if month == 4:
                    table_data[7][4] += 1
                if month == 5:
                    table_data[7][5] += 1
                if month == 6:
                    table_data[7][6] += 1
                if month == 7:
                    table_data[7][7] += 1
                if month == 8:
                    table_data[7][8] += 1
                if month == 9:
                    table_data[7][9] += 1
                if month == 10:
                    table_data[7][10] += 1
                if month == 11:
                    table_data[7][11] += 1
                if month == 12:
                    table_data[7][12] += 1
                    
            if shape == "Cylinder":
                if month == 1:
                    table_data[8][1] += 1
                if month == 2:
                    table_data[8][2] += 1
                if month == 3:
                    table_data[8][3] += 1
                if month == 4:
                    table_data[8][4] += 1
                if month == 5:
                    table_data[8][5] += 1
                if month == 6:
                    table_data[8][6] += 1
                if month == 7:
                    table_data[8][7] += 1
                if month == 8:
                    table_data[8][8] += 1
                if month == 9:
                    table_data[8][9] += 1
                if month == 10:
                    table_data[8][10] += 1
                if month == 11:
                    table_data[8][11] += 1
                if month == 12:
                    table_data[8][12] += 1
                    
            if shape == "Disk":
                if month == 1:
                    table_data[9][1] += 1
                if month == 2:
                    table_data[9][2] += 1
                if month == 3:
                    table_data[9][3] += 1
                if month == 4:
                    table_data[9][4] += 1
                if month == 5:
                    table_data[9][5] += 1
                if month == 6:
                    table_data[9][6] += 1
                if month == 7:
                    table_data[9][7] += 1
                if month == 8:
                    table_data[9][8] += 1
                if month == 9:
                    table_data[9][9] += 1
                if month == 10:
                    table_data[9][10] += 1
                if month == 11:
                    table_data[9][11] += 1
                if month == 12:
                    table_data[9][12] += 1
                    
            if shape == "Changing":
                if month == 1:
                    table_data[10][1] += 1
                if month == 2:
                    table_data[10][2] += 1
                if month == 3:
                    table_data[10][3] += 1
                if month == 4:
                    table_data[10][4] += 1
                if month == 5:
                    table_data[10][5] += 1
                if month == 6:
                    table_data[10][6] += 1
                if month == 7:
                    table_data[10][7] += 1
                if month == 8:
                    table_data[10][8] += 1
                if month == 9:
                    table_data[10][9] += 1
                if month == 10:
                    table_data[10][10] += 1
                if month == 11:
                    table_data[10][11] += 1
                if month == 12:
                    table_data[10][12] += 1
        count = count + 1

with open('data/c3data.json', 'w') as outfile:
	json.dump(table_data, outfile)