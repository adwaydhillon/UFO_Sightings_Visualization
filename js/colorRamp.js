///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	

var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	times = d3.range(24);

var margin = {
	top: 10,
	right: 50,
	bottom: 50,
	left: 50
};

var width = $("#trafficAccidents").width() - 100,
        height = $("#trafficAccidents").height();

//var width = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 20,
//	gridSize = Math.floor(width / times.length),
//	height = gridSize * (days.length+2);

//SVG container
var svg = d3.select('#trafficAccidents')
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Reset the overall font size
var newFontSize = width * 62.5 / 500;
d3.select("html").style("font-size", newFontSize + "%");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Draw Heatmap /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var accidents=[{day:2,hour:1,count:527},{day:4,hour:1,count:1}];

var colorScale = d3.scale.linear()
	.domain([0, d3.max(accidents, function(d) {console.log(d.count);return d.count; })/2, d3.max(accidents, function(d) {return d.count; })])
	.range(["#d2998d", "#f46b4e", "#f25635"])
	.interpolate(d3.interpolateHcl);

///////////////////////////////////////////////////////////////////////////
//////////////// Create the gradient for the legend ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Extra scale since the color scale is interpolated
var countScale = d3.scale.linear()
	.domain([0, d3.max(accidents, function(d) {return d.count; })])
	.range([0, width])

//Calculate the variables for the temp gradient
var numStops = 10;
countRange = countScale.domain();
countRange[2] = countRange[1] - countRange[0];
countPoint = [];
for(var i = 0; i < numStops; i++) {
	countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
}//for i

//Create the gradient
svg.append("defs")
	.append("linearGradient")
	.attr("id", "legend-traffic")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.selectAll("stop") 
	.data(d3.range(numStops))                
	.enter().append("stop") 
	.attr("offset", function(d,i) { 
		return countScale( countPoint[i] )/width;
	})   
	.attr("stop-color", function(d,i) { 
		return colorScale(countPoint[i]); 
	});

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var legendWidth = width;
    //Math.min(width*0.8, 400);
//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(" + (width/2) + "," + height + ")");

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", 0)
	//.attr("rx", hexRadius*1.25/2)
	.attr("width", legendWidth)
	.attr("height", 5)
	.style("fill", "url(#legend-traffic)");
	
//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", -10)
	.style("text-anchor", "middle")
	.text("Distribution by State");

//Set scale for x-axis
var xScale = d3.scale.linear()
	 .range([-legendWidth/2, legendWidth/2])
	 .domain([ 0, d3.max(accidents, function(d) { return d.count; })] );

//Define x-axis
var xAxis = d3.svg.axis()
	  .orient("bottom")
	  .ticks(5)
	  //.tickFormat(formatPercent)
	  .scale(xScale);

//Set up X axis
legendsvg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (10) + ")")
	.call(xAxis);