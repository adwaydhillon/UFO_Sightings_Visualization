var col_orange = "#E66A39",
    col_red    = "#D04E33",
    col_gray  = "#353C3E",
    col_black   = "#1C2021",
    col_white  = "#EEEEEE";

//Global Variables
var mode = "mouse";         //Available modes: 'mouse' or 'select'
var sighting_dict = {};
var states;
var heatmap;
var globalLowerDate, globalUpperDate;
var globalAggSighting;
var clicked_sighting = {};

var width = 600,
    height = 400,
    centered;

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#heatmap").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", click);

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .append("g")
    .attr("id", "states");

d3.csv("data/data.csv",
    //Accessor function to parse our CSV converting the date time column from string to Date object
    function(d){
        if(d.Country == "USA"){
            return {
                ["Date/Time"] : new Date(d["Date / Time"]),
                Country : d.Country,
                City : d.City,
                State : d.State,
                Shape : d.Shape,
                Summary : d.Summary,
                Lat : d.lat,
                Lng : d.lng

            };
        }
    },
    //Callback function
    function(data){
        //Setting global data
        window.data = data;
        //Setting default date range
        var defaultDateRangeLower = new Date(2016, 1, 1, 0, 0, 0);
        var defaultDateRangeUpper = new Date(2016, 12, 31, 23, 59, 59);
        //Aggregating data
        var defaultSightingsAggArray = aggregateSighting(defaultDateRangeLower, defaultDateRangeUpper, data);       
        
        //Populate graphs initially
        selectedStates.push("ga");
//        sendDataToBarChart(window.statesHashmap);
//        updateData_LineChart(window.datesHashmapArray);
        

        console.log(defaultSightingsAggArray);

        d3.json("data/states.json", function(json) {
          console.log(json);
          heatmap = d3.scale.linear()
            .domain([0,d3.max(json.features, function(d) { return Math.log(window.statesHashmap[d.properties.abbr.toUpperCase()] || 1); })])
            .interpolate(d3.interpolateRgb)
            .range(["#ffffff","#BB432A"]);

          var curStateFill;
          states = g.selectAll("path")
            .data(json.features)
            .enter().append("path")
              .attr("d", path)
              .attr("id", function(d) { return d.properties.abbr; })
              .style("fill", function(d) { 
                return heatmap(Math.log(window.statesHashmap[d.properties.abbr.toUpperCase()] || 1));
              })
              .on("click.zoom", click)
              .on('click.select', select)
              .on('mouseover', function() {
                  console.log('Mousing over ' + this.id + ' and isSelected is ' + this.isSelected);
                  //console.log(this.style.fill);
                  curStateFill = this.style.fill;
                  this.style.fill = col_white;
                  //console.log(this.isSelected);
              })
              .on('mouseout', function() {
                  if (mode == 'mouse') {
                      this.style.fill = curStateFill;
                      console.log(1);
                  } else {
                      if (this.isSelected == 'true') {
                          console.log('Moused out of ' + this.id + ' and isSelected is ' + this.isSelected);
                          this.style.fill = col_white;
                          //console.log(2);
                      } else {
                          this.style.fill = curStateFill;
                          console.log('Moused out of ' + this.id + ' and isSelected is ' + this.isSelected);
                      }
                  }
              });

          var labels = g.selectAll("text")
            .data(json.features)
            .enter().append("text")
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("id", function(d) { return 'label-'+d.properties.abbr; })
            .style('pointer-events', 'none')
            .attr("dy", ".35em")
            .on("click", click)
            .text(function(d) { return d.properties.abbr; });
        });

});
//console.log(sighting_dict);


// FOR USE WITH COORDINATES
var statesCoord = [];
d3.csv("data/data.csv",
    function(d){
        return{
            State : d.State,
            lat : +d.lat,
            lng : +d.lng,
        };
    }, function(data){
    console.log("why not here");
    console.log([data]);
        data.forEach(function(currentVal){
            if (!statesCoord[currentVal.State]){
                statesCoord[currentVal.State] = [[currentVal.lng,currentVal.lat]];

            } else {
                statesCoord[currentVal.State].push([currentVal.lng,currentVal.lat]);
            }
        });
    });

var selectedStates = [];

function select(d) {
    if (mode == 'select') {

        //Make Send Buttons Selectable Here Rather Than on click of select button.
        sendToBarChart.attr('class', 'selectable');
        sendToBarChart.attr('opacity', 0.5);
        sendToBarChart.attr('fill', col_orange);

        sendToLineChart.attr('class', 'selectable');
        sendToLineChart.attr('opacity', 0.5);
        sendToLineChart.attr('fill', col_orange);

        this.isSelected = 'true';

        if (this.isSelected == 'true') {
            console.log(this.style.fill);
            this.style.fill = col_white;
        }
        console.log(this.isSelected);
        console.log('Selected State: ' + this.id);
        if (selectedStates.indexOf(this.id) < 0) {
            selectedStates.push(this.id);
        }
    }
}

var pushableData = [];
function combineData() {
    pushableData = [];
    console.log("These are the now selected states: ");
    console.log(selectedStates);
    for (var i = 0; i < selectedStates.length; i++) {
        var newState = selectedStates[i];
        var newSighting = window.statesHashmap[newState.toUpperCase()];
        console.log(newState);
        console.log(newSighting);
        var newItem = {State: newState, Sightings: newSighting}
        console.log(newItem);
        pushableData.push(newItem)
    }
    console.log(pushableData);
}

function deselectStates() {
    states.style("fill", function(d) {
        console.log(this.id);
        this.isSelected = 'false'
        return heatmap(Math.log(window.statesHashmap[d.properties.abbr.toUpperCase()] || 1)); });
    selectedStates = [];
}

//function sendDataToBarChart(newData) {
//    pushableData = [];
//    console.log("this is the pushable data after supposedly being emptied:");
//    console.log(pushableData);
//    combineData();
//    console.log("Data Being Pushed: " + pushableData);
//    updateData(pushableData);
//    //selectedStates = [];
//
//}
//
//function sendDataToLineChart(newData) {
//    updateData_LineChart(newData);
//}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function get_info_on_sighting(sighting_coordinates) {
    d3.csv("data/data.csv",
    function(d){
//        var temp_str = d3.timeParse("Date / Time");
//        var index = temp_str.indexOf(" ");  // Gets the first index where a space occours
//        
//        var date = temp_str.substr(0, index); // Gets the first part
//        var time = temp_str.substr(index + 1);  // Gets the text part
           console.log("coord in the if");
            console.log(sighting_coordinates[0]);
            console.log(sighting_coordinates[1]);     
        if(d.lat == sighting_coordinates[0] && d.lng == sighting_coordinates[1]) {
            
            clicked_sighting = {
//            Date: date,
//            Time: time,
            City: d.City,
            State : d.State,
            Country: d.Country,
            Shape: d.Shape,
            Summary: d.Summary,        
            lat : +d.lat,
            lng : +d.lng
                } 
            }
        console.log("adway look here!");
                    console.log(clicked_sighting);
        });
        return{
        
    }, function(data){
        
    };
}

function click(d) {
    if (mode == "mouse") {
        var x = 0,
            y = 0,
            k = 1;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = -centroid[0];
            y = -centroid[1];
            k = 4;
            centered = d;
        } else {
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function (d) {
                    return d === centered;
                });
        g.selectAll("text")
            .text(function (d) {
                return d.properties.abbr;
            })
            .classed("active", false);
        if (centered) {
            g.select("#label-" + centered.properties.abbr)
                .text(function (d) {
                    return d.properties.name + ': ' + (window.statesHashmap[d.properties.abbr.toUpperCase()] || '(none)') + ' UFO Sightings';
                })
                .classed("active", centered && function (d) {
                        return d === centered;
                    });

                console.log(d.properties.abbr.toUpperCase());
        // SHOW COORDINATES ON ZOOM IN
                console.log(statesCoord[d.properties.abbr.toUpperCase()]);
                g.selectAll("circle")
                .data(statesCoord[d.properties.abbr.toUpperCase()]).enter()
                .append("circle")
                .attr("transform", function(d) {
                    
                    return "translate(" + [projection(d)[0], projection(d)[1]] + ")" })
                .attr("r", "5px")
                .attr("fill",col_red)
                .on('click', function(d) {
                    console.log("clicked!!");
                    get_info_on_sighting(projection(d));
                    openNav();
                })
                .on('mouseover',function(d){
                    console.log("moused over circle")
                    d3.select("body").append("svg")
                        .attr('class',"info")
                        .style('z-index', '2')
                        .style('width',"200px")
                        .style('height',"100px")
                        .attr('fill',col_black)
                        .append('g');

                })
                .on('mouseout',function(d){
                    d3.select("svg.info").remove();
                });

        }
        // HIDE COORDINATES ON ZOOM OUT
        else {
            g.selectAll("circle")
                .remove("circle");
        }

        g.transition()
            .duration(750)
            .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
            .style("stroke-width", 1.5 / k + "px");
    }
}

var aggregateSighting = function(startDate, endDate, data) {
    var statesHashmap = {};
    var datesHashmap = {};
    data.forEach(function(currentVal){
        var datetime = currentVal["Date/Time"];
        var state = currentVal.State;

        if (datetime == null || datetime == undefined || !datetime) {
            console.log("UFO with null datetime: " + currentVal["Shape"]);
        }
        //The UFO sighting falls within the provided range
        else if(datetime.getTime() < endDate.getTime() &&
         datetime.getTime() > startDate.getTime()) {
            //debug
            //console.log("Within range: " + " UFO " + currentVal.Shape + " was sighted on " + currentVal["Date/Time"]);

            if(state in statesHashmap) {
                statesHashmap[state]++;
            } else {
                statesHashmap[state] = 1;
            }

            lowResDate = new Date(datetime.getYear(), datetime.getMonth(), datetime.getDate());
            //setting date hashmap
            if(lowResDate in datesHashmap) {
                datesHashmap[lowResDate]++;
            } else {
                datesHashmap[lowResDate] = 1;
            }
        }
    });
    var statesHashmapArray = Object.keys(statesHashmap).map(function(d) {
        return {State: d, Total: statesHashmap[d]};
    });

    var datesHashmapArray = Object.keys(datesHashmap).map(function(d) {
        return {date: d, close: +datesHashmap[d]};
    });
//    console.log(datesHashmapArray);
    window.datesHashmapArray = datesHashmapArray;
    window.statesHashmap = statesHashmap;
    return statesHashmapArray;
}

var withinRange = function(startDate, endDate, date) {
    if (date == null || date == undefined || !date) {
        console.log("UFO with null datetime");
        return false;
    }
    //The UFO sighting falls within the provided range
    else if(datetime.getTime() < endDate.getTime() &&
     datetime.getTime() > startDate.getTime()) {
        return true;
    } else {
        return false;
    }
}

var updateHeatMap = function() {
    if (centered) {
            g.select("#label-" + centered.properties.abbr)
                .text(function (d) {
                    return d.properties.name + ': ' + (window.statesHashmap[d.properties.abbr.toUpperCase()] || '(none)') + ' UFO Sightings';
                })
                .classed("active", centered && function (d) {
                        return d === centered;
                    });
    }
    states.transition()
          .duration(500)
          .style("fill", function(d) {
                if (this.isSelected == 'true') {
                    return col_white;
                }
                return heatmap(Math.log(window.statesHashmap[d.properties.abbr.toUpperCase()] || 1));
              });
}
//
//map = d3.carto.map();
//    d3.select("#map").call(map);
//
//    map.mode("projection");
//
//    countryLayer = d3.carto.layer.topojson();
//    
//    countryLayer.path("world.topojson")
//    .label("Countries")
//    .renderMode("svg")
//    .cssClass("country")
//    .on("load", runCarto);
//
//    map.addCartoLayer(countryLayer);
//    
//    function runCarto() {
//      d3.selectAll("path").style("fill", function(d) {return colorScale(parseFloat(d.properties.gdp))})
//      map.continuousCartogram(countryLayer, function(d) {return d.properties.gdp});
//    }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
** * * * * * * * * * * * * * * * Heatmap Buttons * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//var containerRef = d3.select('.container').node();
//var HMbuttonContainerWidth = 128;
//var HMbuttonDim = 32;
//
//var buttonGroup = d3.select('.container')
//    .append('svg')
//    .style('position', 'absolute')
//    .style('z-index', '2')
//    //Move it to top left corner
//    .style('transform', 'translateX(' + (HMbuttonContainerWidth) * -1 + 'px)')
//    .style('width', '128px')
//    .style('height', '32px')
//    .append('g');
//
//var mouseButton = buttonGroup.append('rect')
//    .style('width', '32px')
//    .style('height', '32px')
//    .attr('class', 'selected')
//    .attr('stroke-width', '2px')
//    //.attr('stroke', col_orange)
//    .attr('fill', col_white);
//
//var selectStatesButton = buttonGroup.append('rect')
//    .style('width', '32px')
//    .style('height', '32px')
//    .style('transform', 'translateX(' + HMbuttonDim + 'px)')
//    .attr('class', 'selectable')
//    .attr('stroke-width', '2px')
//    //.attr('stroke', col_orange)
//    .attr('fill', col_orange)
//    .attr('opacity', 0.5);

//var sendToBarChart = buttonGroup.append('rect')
//    .style('width', '32px')
//    .style('height', '32px')
//    .style('transform', 'translateX(' + (2 * HMbuttonDim) + 'px)')
//    .attr('class', 'unselectable')
//    .attr('stroke-width', '2px')
//    //.attr('stroke', col_orange)
//    .attr('fill', col_black);
//
//var sendToLineChart = buttonGroup.append('rect')
//    .style('width', '32px')
//    .style('height', '32px')
//    .style('transform', 'translateX(' + (3 * HMbuttonDim) + 'px)')
//    .attr('class', 'unselectable')
//    .attr('stroke-width', '2px')
//    //.attr('stroke', col_orange)
//    .attr('fill', col_black);

//Add text to buttons.

var mouseButtonText = buttonGroup.append('text')
    .style('width', '32px')
    .style('height', '32px')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .style('pointer-events', 'none')
    .attr('fill', col_gray)
    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
    .attr('x', '' + (0.5 * HMbuttonDim) + 'px')
    .text('M');

var selectStatesButtonText = buttonGroup.append('text')
    .style('width', '32px')
    .style('height', '32px')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'central')
    .style('pointer-events', 'none')
    .attr('fill', col_gray)
    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
    .attr('x', '' + (1.5 * HMbuttonDim) + 'px')
    .text('S');

//var sendToBarChartButtonText = buttonGroup.append('text')
//    .style('width', '32px')
//    .style('height', '32px')
//    .attr('text-anchor', 'middle')
//    .attr('alignment-baseline', 'central')
//    .style('pointer-events', 'none')
//    .attr('fill', col_gray)
//    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
//    .attr('x', '' + (2.5 * HMbuttonDim) + 'px')
//    .text('B');
//
//var sendToLineChartButtonText = buttonGroup.append('text')
//    .style('width', '32px')
//    .style('height', '32px')
//    .attr('text-anchor', 'middle')
//    .attr('alignment-baseline', 'central')
//    .style('pointer-events', 'none')
//    .attr('fill', col_gray)
//    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
//    .attr('x', '' + (3.5 * HMbuttonDim) + 'px')
//    .text('L');


//Select State Button Actions
// mouse over select state button button
selectStatesButton.on('mouseover', function() {
    if (selectStatesButton.attr('class') == 'selected') {

    } else {
        selectStatesButton.attr('opacity', 1);
    }
    console.log('Hovering over Select States Button');
});

selectStatesButton.on('mouseout', function() {
    if (selectStatesButton.attr('class') == 'selected') {

    } else {
        selectStatesButton.attr('opacity', 0.5)
    }
});

selectStatesButton.on('click', function() {
    deselectStates();
    if (selectStatesButton.attr('class') == 'selectable') {

        mode = 'select'

        selectStatesButton.attr('class', 'selected');
        selectStatesButton.attr('fill', col_white);
        selectStatesButton.attr('opacity', 1);

        mouseButton.attr('class', 'selectable');
        mouseButton.attr('opacity', 0.5);
        mouseButton.attr('fill', col_orange);

        //CODE THE CARTOGRAM HERE
        console.log('ready to render cartogram');
        runCarto();

        sendToBarChart.attr('class', 'unselectable');
        sendToBarChart.attr('opacity', 1);
        sendToBarChart.attr('fill', col_black);

        sendToLineChart.attr('class', 'unselectable');
        sendToLineChart.attr('opacity', 1);
        sendToLineChart.attr('fill', col_black);

    } else if (selectStatesButton.attr('class') == 'selected') {

        mode = 'mouse'

        sendToBarChart.attr('class', 'unselectable');
        sendToBarChart.attr('opacity', 1);
        sendToBarChart.attr('fill', col_black);

        sendToLineChart.attr('class', 'unselectable');
        sendToLineChart.attr('opacity', 1);
        sendToLineChart.attr('fill', col_black);


        selectStatesButton.attr('class', 'selectable');
        selectStatesButton.attr('fill', col_orange);

        mouseButton.attr('class', 'selected');
        mouseButton.attr('opacity', 1);
        mouseButton.attr('fill', col_white);

    }
});

//Mouse Button Actions
// mouse over select state button button
mouseButton.on('mouseover', function() {
    if (mouseButton.attr('class') == 'selected') {

    } else {
        mouseButton.attr('opacity', 1);
    }
    console.log('Hovering over Mouse Button');
});

mouseButton.on('mouseout', function() {
    if (mouseButton.attr('class') == 'selected') {

    } else {
        mouseButton.attr('opacity', 0.5)
    }
});

mouseButton.on('click', function() {
    if (mouseButton.attr('class') == 'selectable') {

        mode = 'mouse';
        deselectStates();

        mouseButton.attr('class', 'selected');
        mouseButton.attr('fill', col_white);
        mouseButton.attr('opacity', 1);

        selectStatesButton.attr('class', 'selectable');
        selectStatesButton.attr('opacity', 0.5);
        selectStatesButton.attr('fill', col_orange);

        sendToBarChart.attr('class', 'unselectable');
        sendToBarChart.attr('fill', col_black);
        sendToBarChart.attr('opacity', 1);

        sendToLineChart.attr('class', 'unselectable');
        sendToLineChart.attr('fill', col_black);
        sendToLineChart.attr('opacity', 1);

    }
});

////Send to bar chart button actions
//
//sendToBarChart.on('mouseover', function() {
//    if (sendToBarChart.attr('class') == 'selected') {
//
//    } else {
//        sendToBarChart.attr('opacity', 1);
//    }
//    console.log('Hovering over Send To Bar Chart Button');
//});
//
//sendToBarChart.on('mouseout', function() {
//    if (sendToBarChart.attr('class') == 'selected') {
//
//    } else if (sendToBarChart.attr('class') == 'selectable') {
//        sendToBarChart.attr('opacity', 0.5)
//    }
//});
//
//sendToBarChart.on('click', function() {
//
//    console.log('Perform data push to bar chart.');
//    console.log('Remember to set this button as selectable whenever the user updates thes states.');
//
//    if (sendToBarChart.attr('class') == 'selectable') {
//
//        sendToBarChart.attr('class', 'selected');
//        sendToBarChart.attr('fill', col_white);
//        sendToBarChart.attr('opacity', 1);
//
//        selectStatesButton.attr('class', 'selectable');
//        selectStatesButton.attr('opacity', 0.5);
//        selectStatesButton.attr('fill', col_orange);
//
//        mouseButton.attr('class', 'selectable');
//        mouseButton.attr('opacity', 0.5);
//        mouseButton.attr('fill', col_orange);
//
//        sendDataToBarChart(pushableData);
//
//    } else {
//
//    }
//});

//Send to line chart button actions
//sendToLineChart.on('mouseover', function() {
//    if (sendToLineChart.attr('class') == 'selected') {
//
//    } else {
//        sendToLineChart.attr('opacity', 1);
//    }
//    console.log('Hovering over Send To Line Chart Button');
//});
//
//sendToLineChart.on('mouseout', function() {
//    if (sendToLineChart.attr('class') == 'selected') {
//
//    } else if (sendToBarChart.attr('class') == 'selectable') {
//        sendToLineChart.attr('opacity', 0.5)
//    }
//});
//
//sendToLineChart.on('click', function() {
//
//    console.log('Perform data push to line chart.');
//    console.log('Remember to set this button as selectable whenever the user updates thes states.');
//
//    if (sendToLineChart.attr('class') == 'selectable') {
//
//        sendToLineChart.attr('class', 'selected');
//        sendToLineChart.attr('fill', col_white);
//        sendToLineChart.attr('opacity', 1);
//
//        selectStatesButton.attr('class', 'selectable');
//        selectStatesButton.attr('opacity', 0.5);
//        selectStatesButton.attr('fill', col_orange);
//
//        mouseButton.attr('class', 'selectable');
//        mouseButton.attr('opacity', 0.5);
//        mouseButton.attr('fill', col_orange);
//
//    } else {
//
//    }
//});