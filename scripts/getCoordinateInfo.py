import csv
import json

with open('data/dataCSV.csv', 'rU') as csvfile:
    spamreader = csv.reader(csvfile)
    count = 0
    table_data = {}
    for row in spamreader:
        if count != 0:
            lat = row[6].split(".")
            lat = lat[0] + "." + lat[1][:2]
            lng = row[7].split(".")
            lng = lng[0] + "." + lng[1][:2]
            lat_lng = lat + "_" + lng
            
            date = row[0].split(" ")[0]
            time = row[0].split(" ")[1]
            country = row[1]
            city = row[2]
            state = row[3]
            shape = row[4]
            summary = row[5]

            try:
                summary.decode('utf-8')
                #print "string is UTF-8, length %d bytes" % len(string)
            except UnicodeError:
                print summary + "string is not UTF-8" + "\n"

            table_data[str(lat_lng)] = [str(date), str(time), str(country), str(city), str(state), str(shape), str(summary)]
        count += 1
    table_data = table_data
    print len(table_data)

with open('data/clickedSighting.json', 'w') as outfile:
	json.dump(table_data, outfile)