//
//
////var first_column =  ['x', 'Jan - March', 'April - June', 'July - Sept', 'Oct- Dec'];
////var subs_columns = [[]];
//
//d3.json("data/c3data.json", function(monthly_json) {
//        d3.json("data/scatter_c3data.json", function(daily_json) {
//        subs_columns = monthly_json;
//        var first_column =  ['x', 'Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//        var months_list = first_column.slice();
//        months_list.splice(0, 1);
//        var full_data = subs_columns.slice();
//        var tempp = full_data.slice();
//        full_data.unshift(first_column);
//        var donut_data = [];
//        for (var i = 0, len = subs_columns.length; i < len; i++) {
//            sum = 0;
//            var row = subs_columns[i];
//            for (var j = 1, lenn = row.length; j < lenn; j++) {
//                sum = sum + row[j];
//            }
//            donut_data.push([row[0], sum]);
//        }
//        var types_of_shapes = []
//        for (var i = 0, len = donut_data.length; i < len; i++) {
//            types_of_shapes.push(donut_data[i][0]);
//        }
//    console.log(daily_json);
//    var chart_main = c3.generate({
//    bindto: '#main_chart_container',
//    size: {
//        height: 340
//    },
//    data: {
//        columns: monthly_json
//    },
//    type: 'spline',
//    subchart: {
//        show: true,
//        size: {
//            height: 20
//            }
//    },
//    zoom: {
//        enabled: true
//    },
//    axis: {
//        x: {
//            label: 'Day of the Year',
//            tick: {
//                values: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
//            }
//        },
//        y: {
//            label: 'No of sightings'
//        }
//    },
//    legend: {
//        show: false
//    }  
//});
//            
//
////var chart_donut = c3.generate({
////    bindto: '#donut_chart',
////    data: {
////        columns: donut_data,
////        type : 'donut',
////    },
////    legend: {
////        show: false
////    },
////    format: {
////          value: function (value, ratio, id) {
////                var format = d3.format('$,');
////                return format(value);
////            }
////        },
////    donut: {
////        title: "UFO Sighting Shape"
////    }
////});
//
//function toggle(id) {
//    chart_main.toggle(id);
//    chart_donut.toggle(id);
//}
//
//d3.select('.middle').selectAll('li')
//    .data(types_of_shapes)
//    .enter().append('li')
//    .attr('class', 'item')
//    .attr('data-id', function (id) { return id; })
//    .each(function (id) {
//    
//    d3.select(this).insert('span').attr('class', 'color').style('background-color', chart_main.color(id));
//    
//    d3.select(this).insert('span').attr('class', 'title').html(id);
//    })
//    .on('mouseover', function (id) {
////        chart_donut.focus(id);
//        chart_main.focus(id);
//    })
//    .on('mouseout', function (id) {
////        chart_donut.revert();
//        chart_main.revert();
//    })
//    .on('click', function (id) {
//    $(this).toggleClass("c3-legend-item-hidden")
////        chart_donut.toggle(id);
//        chart_main.toggle(id);
//    });
//    
//    $('#bar_button').on('click', function () {
//    //chart_main.transform('bar');
//        chart_main.unload();
//        chart_main.load({
//            columns: monthly_json,
//            type: 'bar'
//        });
//    });
//        
//    $('#curve_button').on('click', function () {
//    //chart_main.transform('spline');
//        console.log(monthly_json);
//        chart_main.unload();
//        chart_main.load({
//            columns: monthly_json,
//            type: 'spline'
//        });
//    });
//
//    $('#scatter_button').on('click', function () {
//    //chart_main.transform('scatter');
//        chart_main.unload();
//        chart_main.load({
//            columns: daily_json,
//            type: 'scatter'
//        });
//    });
//
//    $('#stacked_bar_button').on('click', function () {
//        //chart_main.transform('scatter');
//        chart_main.unload();
//        chart_main.load({
//            columns: monthly_json,
//            type: 'bar',
//            groups: types_of_shapes
//        });
//    });
//
//});
//});
//
