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

var width = $("#heatmap").width(),
        height = $("#heatmap").height(),
        centered;

var projection = d3.geo.albersUsa()
    .scale(width)
    .translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#heatmap").append("svg")
    .attr("width", width)
    .attr("height", height);


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

function googleApiClientReady(keyword_string) {
                console.log("api called");
                var video_id = '';
                gapi.client.setApiKey('AIzaSyDLgsPbi8g3rIdgadiiFlIfP2ttAHnfJU8');
                gapi.client.load('youtube', 'v3', function() {
                      video_id = searchA(keyword_string);
                });
                return video_id;
        }

function searchA(keyword_string) {
                var video_id = '';
                var q = keyword_string;
                var request = gapi.client.youtube.search.list({
                        q: q, 
                        part: 'snippet',
                        maxResults: '1',
                        type: 'video',
                        order: 'relevance',
                        videoEmbeddable: 'true'
                });
                request.execute(function(response) {
                        var str = JSON.stringify(response.result);
                        var json = response.result;
                        video_id = json.items[0].id.videoId;
                });
                return video_id;
        }

function getNavBar_html(data) {
    var video_id = '';
    
    setTimeout(function() {
            var keyword = "UFO Sighting " + data.State + " " + data.City;
            console.log(keyword);
            video_id = googleApiClientReady(keyword);
            
              }, 10);
    
    var video = '<iframe width="480" height="315" src="https://www.youtube.com/embed/' + video_id + '"frameborder="0" allowfullscreen></iframe>';
    
//    var video = '<iframe width="480" height="315" src="https://www.youtube.com/embed/o_LGuUXXGfk" frameborder="0" allowfullscreen></iframe>';
    
    var html_str = video + "<p><font face=\"Arial\" color=\"white\">" + "<strong>Date of Sighting: </strong>" + data.Date + "<br><strong> Time of Sighting: </strong>" + data.Time + "<br><strong> Country: </strong>" + data.Country + "<br><strong> City: </strong>" + data.City + "<br><strong> State: </strong>" + data.State + "<br><strong> Shape: </strong>" + data.Shape + "<br><strong> Latitude of Sighting: </strong>" + data.Lat + "<br><strong> Longitude of Sighting: </strong>" + data.Lng + "<br><br><strong> Witness Account: </strong>" + data.Summary + "</font></p>";
    return html_str;
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav(data) {
    document.getElementById("mySidenav").style.width = "500px";
    var html_content = getNavBar_html(data);
    $('#mySidenav').append(html_content);
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "#2a2a2b";
}

function roundDecimal(coordinate) {
    var old_str = parseFloat(coordinate).toString();
    arr = old_str.split(".");
    var new_str = arr[0] + "." + arr[1].substring(0,2);
    return Number(new_str);
}

function get_info_on_sighting(sighting_coordinates) {
    d3.json("data/clickedSighting.json",
    function(d){
        clicked_lat = String(sighting_coordinates[1]).split(".");
        clicked_lat = clicked_lat[0] + "." + clicked_lat[1].substring(0,2);
        
        clicked_lng = String(sighting_coordinates[0]).split(".");
        clicked_lng = clicked_lng[0] + "." + clicked_lng[1].substring(0,2);
        
        clicked_lat_lng = clicked_lat + "_" + clicked_lng;
        sighting_data = {};
        for (var key in d) {
            if (d.hasOwnProperty(key) && (clicked_lat_lng === key)) {
                sighting_data.Date = d[key][0];
                sighting_data.Time = d[key][1];
                sighting_data.Country = d[key][2];
                sighting_data.City = d[key][3];
                sighting_data.State = d[key][4];
                sighting_data.Shape = d[key][5];
                sighting_data.Summary = d[key][6];
                sighting_data.Lat = clicked_lat_lng.split("_")[0];
                sighting_data.Lng = clicked_lat_lng.split("_")[1];
            }
        }
        if (Object.keys(sighting_data).length == 0) {
                sighting_data.Date = "Data source not reliable to report";
                sighting_data.Time = "Data source not reliable to report";
                sighting_data.Country = "Data source not reliable to report";
                sighting_data.City = "Data source not reliable to report";
                sighting_data.State = "Data source not reliable to report";
                sighting_data.Shape = "Data source not reliable to report";
                sighting_data.Summary = "Data source not reliable to report";
                sighting_data.Lat = "Data source not reliable to report";
                sighting_data.Lng = "Data source not reliable to report";
        }
        openNav(sighting_data);
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
                .attr("r", "2px")
                .attr("fill",col_red)
                .on('click', function(d) {
                    get_info_on_sighting(d);
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