

//var first_column =  ['x', 'Jan - March', 'April - June', 'July - Sept', 'Oct- Dec'];
//var subs_columns = [[]];

d3.json("data/scatter_c3data.json", function(json) {
        subs_columns = json;
        var first_column =  ['x', 'Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var months_list = first_column.slice();
        console.log(months_list);
        months_list.splice(0, 1);
        console.log(months_list);
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
    bindto: '#line_chart',
    data: {
      columns: subs_columns,
        type: 'scatter'
    },
    legend: {
        show: false
    },
        tooltip: {
        show: true
    },
        subchart: {
        show: true
    },
        bar: {
        width: {
            ratio: 0.06 // this makes bar width 6% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
        axis: {
      y: {
        label: { // ADD
          text: 'No of UFOs sighted',
          position: 'outer-middle'
            }
      },
    x: {
        tick: {
            values: months_list,
            culling: {
                    max: 12 // the number of tick texts will be adjusted to less than this value
                }
            },
        label: { // ADD
            text: 'Months of the year',
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
    size: {
        width: 540
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

d3.select('.bottom_half').insert('div', '#legend').attr('class', 'legend').selectAll('span')
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
    chart_main.transform('spline');
});
        
});