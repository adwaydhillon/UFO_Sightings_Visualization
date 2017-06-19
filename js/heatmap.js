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
        

        d3.json("data/states.json", function(json) {
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
                  curStateFill = this.style.fill;
                  this.style.fill = col_white;
              })
              .on('mouseout', function() {
                  if (mode == 'mouse') {
                      this.style.fill = curStateFill;
                      console.log(1);
                  } else {
                      if (this.isSelected == 'true') {
                          this.style.fill = col_white;
                      } else {
                          this.style.fill = curStateFill;
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
    for (var i = 0; i < selectedStates.length; i++) {
        var newState = selectedStates[i];
        var newSighting = window.statesHashmap[newState.toUpperCase()];
        var newItem = {State: newState, Sightings: newSighting}
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

function search_youtube(str_keywords) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc',
        q: searchTerm
    };
  
    $.getJSON(url, params, function (searchTerm) {
        var html = "";
    var entries = results.items;
    
    $.each(entries, function (index, value) {
        var title = value.snippet.title;
        var thumbnail = value.snippet.thumbnails.default.url;
        html += '<p>' + title + '</p>';
        html += '<img src="' + thumbnail + '">';
        }); 
    });
}

function getNavBar_html(data) {
    
    var video = '<iframe width="480" height="315" src="https://www.youtube.com/embed/o_LGuUXXGfk" frameborder="0" allowfullscreen></iframe>'
    
    var html_str = video + "<p><font face=\"Arial\" color=\"white\">" + "<strong>Date of Sighting: </strong>" + data.Date + "<br><strong> Time of Sighting: </strong>" + data.Time + "<br><strong> Country: </strong>" + data.Country + "<br><strong> City: </strong>" + data.City + "<br><strong> State: </strong>" + data.State + "<br><strong> Shape: </strong>" + data.Shape + "<br><strong> Latitude of Sighting: </strong>" + data.Lat + "<br><strong> Longitude of Sighting: </strong>" + data.Lng + "<br><br><strong> Witness Account: </strong>" + data.Summary + "</font></p>";
    return html_str;
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav(data) {
    document.getElementById("mySidenav").style.width = "500px";
    var html_content = getNavBar_html(data);
    console.log("string");
    console.log(html_content);
    $('#mySidenav').append(html_content);
    //    var div = document.getElementById("mySidenav");
//    div.style.width = "400px";
//    div.insertAdjacentHTML("work");
//    var content = document.createTextNode("<YOUR_CONTENT> <br> 2?");
//    div.appendChild(content);
//    var html_content = getNavBar_html(data);
//    mySidenav.innerHTML = "hey";
    //div.innerHTML = div.innerHTML + 'Extra stuff';
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function roundDecimal(coordinate) {
    var old_str = parseFloat(coordinate).toString();
    arr = old_str.split(".");
    var new_str = arr[0] + "." + arr[1].substring(0,2);
    return Number(new_str);
}

function get_info_on_sighting(sighting_coordinates) {
    //console.log(sighting_coordinates);
    d3.csv("data/dataCSV.csv",
    function(d){
//            clicked_lat = roundDecimal(sighting_coordinates[1]);
//            clicked_lng = roundDecimal(sighting_coordinates[0]);
//            for (var i = 0, len = d.length; i < len; i++) {
//                temp_lat = roundDecimal(d[i].lat);
//                temp_lng = roundDecimal(d[i].lng);
//                if (clicked_lat == temp_lat && clicked_lng == temp_lng) {
//                    console.log("ITS WORKING!!");
//                }
//            }
        return {
                Date: "1/14/2016",
                Time: "6:45:00 PM",
                Country : "USA",
                City : "495 Maryland Hwy",
                State : "MD",
                Shape : "Triangle",
                Summary : "Triangle UFO over Maryland Highway 495N.",
                Lat : "39.4262079",
                Lng : "-79.3349455"
        };
    }, function(data){
            console.log("ejbhb");
            console.log(data[0]);
        openNav(data[0]);
    });
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

        // SHOW COORDINATES ON ZOOM IN
                g.selectAll("circle")
                .data(statesCoord[d.properties.abbr.toUpperCase()]).enter()
                .append("circle")
                .attr("transform", function(d) {
                    
                    return "translate(" + [projection(d)[0], projection(d)[1]] + ")" })
                .attr("r", "5px")
                .attr("fill",col_red)
                .on('click', function(d) {
                    get_info_on_sighting(d);
                    openNav();
                })
                .on('mouseover',function(d){
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

//var mouseButtonText = buttonGroup.append('text')
//    .style('width', '32px')
//    .style('height', '32px')
//    .attr('text-anchor', 'middle')
//    .attr('alignment-baseline', 'central')
//    .style('pointer-events', 'none')
//    .attr('fill', col_gray)
//    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
//    .attr('x', '' + (0.5 * HMbuttonDim) + 'px')
//    .text('M');
//
//var selectStatesButtonText = buttonGroup.append('text')
//    .style('width', '32px')
//    .style('height', '32px')
//    .attr('text-anchor', 'middle')
//    .attr('alignment-baseline', 'central')
//    .style('pointer-events', 'none')
//    .attr('fill', col_gray)
//    .attr('y', '' + (0.5 * HMbuttonDim) + 'px')
//    .attr('x', '' + (1.5 * HMbuttonDim) + 'px')
//    .text('S');

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
//selectStatesButton.on('mouseover', function() {
//    if (selectStatesButton.attr('class') == 'selected') {
//
//    } else {
//        selectStatesButton.attr('opacity', 1);
//    }
//    console.log('Hovering over Select States Button');
//});
//
//selectStatesButton.on('mouseout', function() {
//    if (selectStatesButton.attr('class') == 'selected') {
//
//    } else {
//        selectStatesButton.attr('opacity', 0.5)
//    }
//});
//
//selectStatesButton.on('click', function() {
//    deselectStates();
//    if (selectStatesButton.attr('class') == 'selectable') {
//
//        mode = 'select'
//
//        selectStatesButton.attr('class', 'selected');
//        selectStatesButton.attr('fill', col_white);
//        selectStatesButton.attr('opacity', 1);
//
//        mouseButton.attr('class', 'selectable');
//        mouseButton.attr('opacity', 0.5);
//        mouseButton.attr('fill', col_orange);
//
//        //CODE THE CARTOGRAM HERE
//        console.log('ready to render cartogram');
//        runCarto();
//
//        sendToBarChart.attr('class', 'unselectable');
//        sendToBarChart.attr('opacity', 1);
//        sendToBarChart.attr('fill', col_black);
//
//        sendToLineChart.attr('class', 'unselectable');
//        sendToLineChart.attr('opacity', 1);
//        sendToLineChart.attr('fill', col_black);
//
//    } else if (selectStatesButton.attr('class') == 'selected') {
//
//        mode = 'mouse'
//
//        sendToBarChart.attr('class', 'unselectable');
//        sendToBarChart.attr('opacity', 1);
//        sendToBarChart.attr('fill', col_black);
//
//        sendToLineChart.attr('class', 'unselectable');
//        sendToLineChart.attr('opacity', 1);
//        sendToLineChart.attr('fill', col_black);
//
//
//        selectStatesButton.attr('class', 'selectable');
//        selectStatesButton.attr('fill', col_orange);
//
//        mouseButton.attr('class', 'selected');
//        mouseButton.attr('opacity', 1);
//        mouseButton.attr('fill', col_white);
//
//    }
//});
//
////Mouse Button Actions
//// mouse over select state button button
//mouseButton.on('mouseover', function() {
//    if (mouseButton.attr('class') == 'selected') {
//
//    } else {
//        mouseButton.attr('opacity', 1);
//    }
//    console.log('Hovering over Mouse Button');
//});
//
//mouseButton.on('mouseout', function() {
//    if (mouseButton.attr('class') == 'selected') {
//
//    } else {
//        mouseButton.attr('opacity', 0.5)
//    }
//});
//
//mouseButton.on('click', function() {
//    if (mouseButton.attr('class') == 'selectable') {
//
//        mode = 'mouse';
//        deselectStates();
//
//        mouseButton.attr('class', 'selected');
//        mouseButton.attr('fill', col_white);
//        mouseButton.attr('opacity', 1);
//
//        selectStatesButton.attr('class', 'selectable');
//        selectStatesButton.attr('opacity', 0.5);
//        selectStatesButton.attr('fill', col_orange);
//
//        sendToBarChart.attr('class', 'unselectable');
//        sendToBarChart.attr('fill', col_black);
//        sendToBarChart.attr('opacity', 1);
//
//        sendToLineChart.attr('class', 'unselectable');
//        sendToLineChart.attr('fill', col_black);
//        sendToLineChart.attr('opacity', 1);
//
//    }
//});

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