//function get_csv_data() {
//    d3.csv("data/dataCSV.csv",
//    function(d) {
//        var date_arr = d.Date_Time.split(" ")[0];
//        date_arr = date_arr.split("/");
//        
//        for (var i = 0, len = date_arr.length; i < len; i++) {
//            if (date_arr[i].length < 2) {
//                date_arr[i] = "0" + date_arr[i];
//            } 
//        }
//        
//        date_arr[2] = "20" + date_arr[2];
//        var str_date = date_arr[0] + "-" + date_arr[1] + "-" + date_arr[2];
//        return{
//            Shape: d.Shape,
//            Date: str_date
//        };
//    }, function(data) {
//        var temp = {};
//        for (var i = 0, len = data.length; i < len; i++) {
//            var key = data[i].Shape + "_" + data[i].Date;
//            if (key in temp) {
//                temp[key] = temp[key] + 1;
//            } else {
//                temp[key] = 1;
//            }
//        }
//        chart_data = [];
//        var dateSet = new Set();
//        var shapeSet = new Set();
//        for (shape_date in temp) {
//            shapeSet.add(shape_date.split("_")[0]);
//            dateSet.add(shape_date.split("_")[1]);
//        }
//        var column_table = [];
//        dates_arr = dateSet.values();
//        column_table.push(dates_arr);
//        for (shape in shapeSet.values()) {
//            console.log("hege");
//            column_table.push([""].push(shape));
//        }
//        console.log("look here");
//        console.log(temp);
//        for (var i = 0, len = temp.length; i < len; i++) {
//            
//        }
//    });
//}

//get_csv_data();

var first_column =  ['x', '2013-01-21', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'];
var subs_columns = [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350],
            ['data3', 400, 500, 450, 700, 600, 500]
        ];


var full_data = subs_columns.slice();
full_data.unshift(first_column);
var donut_data = [];
for (var i = 0, len = subs_columns.length; i < len; i++) {
    sum = 0;
    var row = subs_columns[i];
    for (var j = 1, lenn = row.length; j < lenn; j++) {
        sum = sum + row[j];
    }
    donut_data.push([row[0], sum]);
}
var types_of_shapes = []
for (var i = 0, len = donut_data.length; i < len; i++) {
    types_of_shapes.push(donut_data[i][0]);
}

var chart_main = c3.generate({
    bindto: '#main_chart',
    size: {
        height: 240,
        width: 480
    },
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: full_data
    },
//    subchart: {
//        show: true
//    },
    legend: {
        position: 'inset',
        show: false
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%m-%d-%Y'
            },
            label :{
                text: 'The year of 2016',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'No of UFOs Sighted',
                position: 'outer-middle'
            }
        }
    }
});

var chart_donut = c3.generate({
    bindto: '#donut_chart',
    data: {
        columns: donut_data,
        type : 'donut',
    },
    legend: {
        show: false
    },
    donut: {
        title: "UFO Sighting Shape"
    }
});

function toggle(id) {
    chart_main.toggle(id);
    chart_donut.toggle(id);
}

d3.select('.container').insert('div', '#legend').attr('class', 'legend').selectAll('span')
    .data(types_of_shapes)
    .enter().append('span')
    .attr('data-id', function (id) { return id; })
    .html(function (id) { return id; })
    .each(function (id) {
        d3.select(this).style('background-color', chart_main.color(id));
    })
    .on('mouseover', function (id) {
        chart_donut.focus(id);
        chart_main.focus(id);
    })
    .on('mouseout', function (id) {
        chart_donut.revert();
        chart_main.revert();
    })
    .on('click', function (id) {
    $(this).toggleClass("c3-legend-item-hidden")
        chart_donut.toggle(id);
        chart_main.toggle(id);
    });

$('#A').on('click', function () {
    chart_main.transform('bar');
});

//$('#B').on('click', function () {
//    var chart = c3.generate({
//    bindto: '#main_chart',
//    data: {
//        columns: subs_columns,
//        type: 'bar',
//        groups: [
//            types_of_shapes
//        ]
//    },
//    grid: {
//        y: {
//            lines: [{value:0}]
//        }
//    }
//});
//});

$('#C').on('click', function () {
    chart_main.transform('line');
});