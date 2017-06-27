$(document).ready(function () {
// Create the chart
d3.json("data/pie_highcharts_data.json", function(pie_json) {    
    
d3.json("data/scatter_highcharts_data.json", function(daily_json) {
    
d3.json("data/monthly_highcharts_data.json", function(monthly_json) {
    
d3.json("data/quarterly_highcharts_data.json", function(quarterly_json) {
var options = {
    chart: {
        polar: false,
//       events: {
//            drilldown: function (e) {
//                if (!e.seriesOptions) {
//                    var chart = this;
//                    // Show the loading label
//                    chart.showLoading('Loading ...');
//                    setTimeout(function () {
//                        chart.hideLoading();
//                        chart.addSeriesAsDrilldown(e.point, series);
//                    }, 1000); 
//                }
//            }
//        },
        plotBorderWidth: 0
    },
    title: {
        text: 'Monthly UFO Sightings',
    },
    credits: {
        enabled: false
    },
    subtitle: {
            text: 'Year of 2016'
    },
    xAxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
                margin: 10,
                text: 'Months of the Year'
            }
    },
    yAxis: {
            title: {
                margin: 10,
                text: 'No. of Sightings'
            },      
    },
    legend: {
        width: 0,
        enabled: true,
    },
    plotOptions: {
        column: {
            stacking: ''
        },
        series: {
            pointPadding: 0.2,
            borderWidth: 0,
            dataLabels: {
                enabled: false
            }
//            events: {
//                legendItemClick: function (event) {
//                    var XYZ = $('#donut_chart').highcharts(),
//                        point = XYZ.get(this.options.id); //get corresponding series
//
//                    if (point) {
//                         point.setVisible(!this.visible);
//                    }
//                }
//            }
        },
        pie: {
            plotBorderWidth: 0,
            allowPointSelect: true,
            cursor: 'pointer',
            size: '100%',
            dataLabels: {
                enabled: true,
                format: '{point.name}: <b>{point.y}</b>'
            }
        }
    },
    series: monthly_json,
    drilldown: {
        series: []
    }
};
    
var options2 = {
    chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Shapes of UFOs'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: pie_json
    };
    
options2.chart.renderTo = 'donut_chart';
options2.chart.type = 'pie';
var chart2 = new Highcharts.Chart(options2);

// Column chart
options.chart.renderTo = 'main_chart_container';
options.chart.type = 'column';
options.chart.zoomType = 'xy';
var chart1 = new Highcharts.Chart(options);
    
    $('#bar_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
        options.chart.type = 'column';
        options.chart.polar = false;
        options.plotOptions.column.stacking = '';
        options.title.text = 'Monthly UFO Sightings';
        options.xAxis.title.margin = 10;
        options.xAxis.title.text = 'Months of the Year';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.series = monthly_json;
        var chart1 = new Highcharts.Chart(options);
    });
        
    $('#curve_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
        options.chart.type = 'spline';
        options.chart.polar = false;
        options.plotOptions.column.stacking = '';
        options.title.text = 'Monthly UFO Sightings';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.xAxis.title.margin = 10;
        options.xAxis.title.text = 'Months of the Year';
        options.series = monthly_json;
        var chart1 = new Highcharts.Chart(options);
    });

    $('#scatter_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
         options.plotOptions.column.stacking = '';
        options.chart.type = 'scatter';
        options.chart.polar = false;
        options.xAxis.title.margin = 10;
        options.xAxis.title.text = 'Days of the Year';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.title.text = 'Daily UFO Sightings';
        options.series = daily_json;
        var chart1 = new Highcharts.Chart(options);
    });
    
    $('#stacked_bar_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
        options.chart.type = 'column';
        options.chart.polar = false;
        options.plotOptions.column.stacking = 'normal';
        options.xAxis.title.margin = 10;
        options.xAxis.title.text = 'Months of the Year';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.title.text = 'Monthly UFO Sightings';
        options.series = monthly_json;
        var chart1 = new Highcharts.Chart(options);
    });
    
    $('#spider_button').on('click', function () {
        console.log(options);
        options.chart.renderTo = 'main_chart_container';
        options.chart.polar = true;
        options.chart.type = 'line';
        options.xAxis.categories = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];

//                options.xAxis.title.margin = 10;
//                options.xAxis.title.text = 'Days of the Year';
        options.title.text = 'Daily UFO Sightings';
        options.series = quarterly_json;
        var chart1 = new Highcharts.Chart(options);
    });


});
});
});
});
});