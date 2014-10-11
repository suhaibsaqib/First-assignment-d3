var tT = [
  {"level": "0-25k", "percent": 22},
  {"level": "25-50k", "percent": 23},
  {"level": "50-75k", "percent": 16},
  {"level": "75-100k", "percent": 14},
  {"level": "100-150k", "percent": 13},
  {"level": "150k+", "percent": 12},

];

var xX = [
  {"level": "0-25k", "percent": 15},
  {"level": "25-50k", "percent": 15},
  {"level": "50-75k", "percent": 18},
  {"level": "75-100k", "percent": 15},
  {"level": "100-150k", "percent": 19},
  {"level": "150k+", "percent": 18},
];

var dC = [
  {"level": "0-25k", "percent": 10},
  {"level": "25-50k", "percent": 15},
  {"level": "50-75k", "percent": 19},
  {"level": "75-100k", "percent": 17},
  {"level": "100-150k", "percent": 21},
  {"level": "150k+", "percent": 18},
];

var bK = [
  {"level": "0-25k", "percent": 24},
  {"level": "25-50k", "percent": 21},
  {"level": "50-75k", "percent": 16},
  {"level": "75-100k", "percent": 12},
  {"level": "100-150k", "percent": 14},
  {"level": "150k+", "percent": 12},
];

var eM = [
  {"level": "0-25k", "percent": 8},
  {"level": "25-50k", "percent": 16},
  {"level": "50-75k", "percent": 17},
  {"level": "75-100k", "percent": 19},
  {"level": "100-150k", "percent": 20},
  {"level": "150k+", "percent": 20},
];

var fM = [
  {"level": "0-25k", "percent": 7},
  {"level": "25-50k", "percent": 8},
  {"level": "50-75k", "percent": 18},
  {"level": "75-100k", "percent": 18},
  {"level": "100-150k", "percent": 23},
  {"level": "150k+", "percent": 23},
];

var mB = [
  {"level": "0-25k", "percent": 7},
  {"level": "25-50k", "percent": 11},
  {"level": "50-75k", "percent": 17},
  {"level": "75-100k", "percent": 17},
  {"level": "100-150k", "percent": 23},
  {"level": "150k+", "percent": 26},
];

var rM = [
  {"level": "0-25k", "percent": 19},
  {"level": "25-50k", "percent": 22},
  {"level": "50-75k", "percent": 21},
  {"level": "75-100k", "percent": 13},
  {"level": "100-150k", "percent": 16},
  {"level": "150k+", "percent": 9},
];

var sL = [
  {"level": "0-25k", "percent": 13},
  {"level": "25-50k", "percent": 16},
  {"level": "50-75k", "percent": 19},
  {"level": "75-100k", "percent": 17},
  {"level": "100-150k", "percent": 20},
  {"level": "150k+", "percent": 15},
];

var oW = [
  {"level": "0-25k", "percent": 11},
  {"level": "25-50k", "percent": 13},
  {"level": "50-75k", "percent": 17},
  {"level": "75-100k", "percent": 14},
  {"level": "100-150k", "percent": 19},
  {"level": "150k+", "percent": 26},
];

var stations = [tT, xX, dC, bK, eM, fM, mB, rM, sL, oW];


$(document).ready(function() {

	var w = 800;
	var h = 400;
  var padding = 50;
	var viz = d3.select("#viz");
	viz.attr("width", w).attr("height", h).attr("x", 30);


  var yScale = d3.scale.linear()
    .domain([0, 30])
    .range([0, (h-100)]);

  var yAxisScale = d3.scale.linear()
    .domain([0, 30])
    .range([(h-100), 0]);


  viz.selectAll("rect")
    .data(tT)
    .enter()
    .append("rect")
    .attr({
      "width": 40,
      "height": function(d, i) {
          return d.percent;
      },
      "x": function(d, i) {
          return (i * 70) + 40;
      },
      "y": function(d, i) {
          return h - (d.percent) - 50;
      },
      "class": function(d, i) {
          if (d.percent > 20) {
              return "test!!!";
          }
      },
      "desc": function(d, i) {
        return d.percent;
      }
      });

  viz.selectAll("text.level")
    .data(tT)
    .enter()
    .append("text")
    .text(function(d, i) {
        return d.level;
    })
    .attr({
      "x": function(d, i) {
          return (i * 70) + 60;
      },
      "y": 370,
      "text-anchor": "middle"
    });

  viz.append("line")
      .attr({
        "x1": 50,
        "x2": 750,
        "y1": yAxisScale(0) + padding,
        "y2": yAxisScale(0) + padding,
        "stroke-width": 1,
        "stroke": "#ccc"
     });

    // first, set up the y-axis
    var yAxis = d3.svg.axis()
      .scale(yAxisScale)
      .orient("left")
      .ticks(5);
    
    // then draw it
    viz.append("g")
      .attr("css", "axis")
      .attr("transform", "translate(" + padding + ", 50)")
      .call(yAxis);
    
    // and draw the grid lines
    for (var i=0; i<5; i++) {
      viz.append("line")
       .attr({
         "x1": padding,
         "x2": w - padding,
         "y1": yAxisScale((i+1)*20) + 50,
         "y2": yAxisScale((i+1)*20) + 50,
         "class": "grid"
       });
    };


$("#viz rect").on("mouseenter", function() {
    var self = $(this);
    // fade out slightly
    self.animate({"opacity":.8}, 100);
    // change the position of the "income-popup" div
    $("#income-popup")
      .css({
        "left": parseInt(self.position().left) + parseInt(self.attr("width")) - 55,
        "top": self.position().top - 40
      })
      .text(self.attr("desc"))
      .stop(true,true)
      .fadeIn(50);
  }).on("mouseleave", function() {
    var self = $(this);
    // fade the bar back in
    self.animate({"opacity":1}, 100);
    // fade out the income level
    $("#income-popup").stop(true,true).fadeOut(50);
  });


function updateData(target, stations) {
    target.selectAll("rect")
      .data(stations)
      .transition()
      .duration(500)
      .attr({
        "width": 40,
        "height": function(d, i) {
            return yScale(d.percent);
        },
        "x": function(d, i) {
            return (i * 70) + 60;
        },
        "y": function(d, i) {
            return h - (yScale(d.percent)) - 50;
        },
        "class": function(d, i) {
            if (d.percent > 20) {
                return "test!!!";
            }
        },
        "desc": function(d, i) {
          return d.percent;
        }
        });
  };


$("#tT").on("click", function() {
    updateData(viz, tT);
    return false;
  }); 

  $("#xX").on("click", function() {
    updateData(viz, xX);
    return false;
  }); 

  $("#dC").on("click", function() {
    updateData(viz, dC);
    return false;
  }); 

  $("#bK").on("click", function() {
    updateData(viz, bK);
    return false;
  });

  $("#eM").on("click", function() {
    updateData(viz, eM);
    return false;
  });

  $("#fM").on("click", function() {
    updateData(viz, fM);
    return false;
  });

  $("#mB").on("click", function() {
    updateData(viz, mB);
    return false;
  }); 

  $("#rM").on("click", function() {
    updateData(viz, rM);
    return false;
  });

  $("#sL").on("click", function() {
    updateData(viz, sL);
    return false;
  });

  $("#oW").on("click", function() {
    updateData(viz, oW);
    return false;
  }); 

  $(".update-data").on("click", function() {
    $(".update-data").removeClass("selected");
    $(this).addClass("selected");
  });

});

