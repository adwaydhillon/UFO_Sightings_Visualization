

//var first_column =  ['x', 'Jan - March', 'April - June', 'July - Sept', 'Oct- Dec'];
//var subs_columns = [[]];

d3.json("data/c3data.json", function(monthly_json) {
        d3.json("data/scatter_c3data.json", function(daily_json) {
        subs_columns = monthly_json;
        var first_column =  ['x', 'Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var months_list = first_column.slice();
        months_list.splice(0, 1);
        var full_data = subs_columns.slice();
        var tempp = full_data.slice();
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
      columns: daily_json,
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

d3.select('.middle').insert('div', '#legend').attr('class', 'legend').selectAll('span')
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
    
    $('#bar_button').on('click', function () {
    //chart_main.transform('bar');
        chart_main.unload();
        chart_main.load({
            columns: monthly_json,
            type: 'bar'
        });
    });
        
    $('#curve_button').on('click', function () {
    //chart_main.transform('spline');
        console.log(monthly_json);
        chart_main.unload();
        chart_main.load({
            columns: monthly_json,
            type: 'spline'
        });
    });

    $('#scatter_button').on('click', function () {
    //chart_main.transform('scatter');
        chart_main.unload();
        chart_main.load({
            columns: daily_json,
            type: 'scatter'
        });
    });

    $('#stacked_bar_button').on('click', function () {
        //chart_main.transform('scatter');
        chart_main.unload();
        chart_main.load({
            columns: monthly_json,
            type: 'bar',
            groups: types_of_shapes
        });
    });

});
});

