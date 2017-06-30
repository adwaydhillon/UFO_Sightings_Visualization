$(document).ready(function () {
// Create the chart
d3.json("data/pie_highcharts_data.json", function(pie_json) {    
    
d3.json("data/scatter_highcharts_data.json", function(daily_json) {
    
d3.json("data/monthly_highcharts_data.json", function(monthly_json) {
    
d3.json("data/quarterly_highcharts_data.json", function(quarterly_json) {
var options2 = {
    chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
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
                    enabled: true
                },
                showInLegend: true
            }
        },
        series: pie_json
    };
    
options2.chart.renderTo = 'donut_chart';
options2.chart.type = 'pie';
var chart2 = new Highcharts.Chart(options2);    
    
    
var options = {
    chart: {
        polar: false,
        plotBorderWidth: 0
    },
    title: {
        text: 'Daily UFO Sightings',
    },
    credits: {
        enabled: false
    },
    size: '100%',
    pane: {
        size: '100%'
    },
    subtitle: {
            text: 'Year of 2016'
    },
    xAxis: {
            type: 'category',
        title: {
                margin: 10,
                text: 'Days of the Year'
            }
    },
    yAxis: {
            title: {
                margin: 10,
                text: 'No. of Sightings'
            },
            gridLineInterpolation: '',
            lineWidth: 0,
            min: 0
    },
    legend: {
        width: 0,
        enabled: true,
        itemStyle: {
            	'cursor': 'pointer'
            }
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
            },
            events: {
                    legendItemClick: function (event) {
                        console.log(this.options.name);
                        var donut = $('#donut_chart').highcharts(),
                            series_arr = donut.series[0].data;
//                            series = donut.get(this.options.name); //get corresponding series
                        console.log(series_arr);
                        for (series in series_arr) {
                            if (this.options.name === series.name) {
                                if (this.visible) {
                                series.visible = true;
                            } else {
                                series.visible = false;
                            }
                        }
                    }
                }
            }
        }
    },
    series: daily_json,
    drilldown: {
        series: []
    }
};
    


// Column chart
options.chart.animation = false;
options.chart.renderTo = 'main_chart_container';
options.chart.type = 'scatter';
options.chart.zoomType = 'xy';
var chart1 = new Highcharts.Chart(options);

    $('#bar_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
        options.chart.animation = true;
        options.chart.type = 'column';
        options.legend.itemStyle.cursor = 'pointer';
        options.chart.zoomType = 'xy';
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
        options.chart.animation = true;
        options.plotOptions.column.stacking = '';
        options.chart.zoomType = 'xy';
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
        options.chart.animation = false;
        options.chart.zoomType = 'xy';
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
        options.chart.animation = true;
        options.plotOptions.column.stacking = 'normal';
        options.chart.zoomType = 'xy';
        options.xAxis.title.margin = 10;
        options.xAxis.title.text = 'Months of the Year';
        options.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        options.title.text = 'Monthly UFO Sightings';
        options.series = monthly_json;
        var chart1 = new Highcharts.Chart(options);
    });
    
    $('#spider_button').on('click', function () {
        options.chart.renderTo = 'main_chart_container';
        options.chart.polar = true;
        options.pane.size = '100%';
        options.chart.zoomType = 'xy';
        options.chart.animation = true;
        options.chart.type = 'line';
        options.xAxis.categories = ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
        options.xAxis.title.text = '';
        options.yAxis.title.text = '';
        options.yAxis.gridLineInterpolation = 'polygon';
        options.yAxis.lineWidth = '0';
        options.yAxis.min = '0';
        options.title.text = 'Daily UFO Sightings';
        options.series = quarterly_json;
        var chart1 = new Highcharts.Chart(options);
    });

});
});
});
});
});