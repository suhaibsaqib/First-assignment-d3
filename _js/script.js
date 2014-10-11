$(document).ready(function() {
  

//Data Declarations for bar chart


            //Width and height
            var w = 500;
            var h = 100;
            var barPadding = 1;
            
            var dataset2 = [ 8, 16, 17, 19 ,20, 20 ];
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

            var stations = [rM, bK, tT, sL, fM, oW, eM, xX, dC, mB];

            var station_label = {
              rM : "Richmond",
              bK : "Downtown Berkeley",
              tT : "12th street oakland",
              sL : "San Leandro",
              fM : "Fremont",
              oW : "West Oakland",
              eM : "Embarcadero",
              xX : "16th street",
              dC : "Daly City",
              mB : "Millbrae"
            };

/*** Define parameters and tools ***/
var width = 680,
    height = 650,
    outerRadius = Math.min(width, height) / 2 - 100,
    innerRadius = outerRadius - 10;

var dataset = "jan06.csv";
//string url for the initial data set
//would usually be a file path url, here it is the id
//selector for the <pre> element storing the data

//create number formatting functions
var formatPercent = d3.format("%");
var numberWithCommas = d3.format("0,f");

//create the arc path data generator for the groups
var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

//create the chord path data generator for the chords
var path = d3.svg.chord()
    .radius(innerRadius);

//define the default chord layout parameters
//within a function that returns a new layout object;
//that way, you can create multiple chord layouts
//that are the same except for the data.

function getDefaultLayout() {
    return d3.layout.chord()
    .padding(0.03)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending);
}  
var last_layout; //store layout between updates
var neighborhoods; //store neighbourhood data outside data-reading function
var on_chord = 0;
/*** Initialize the visualization ***/
var g = d3.select("#chart_placeholder").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("id", "circle")
        .attr("transform", 
              "translate(" + width / 2 + "," + height / 2 + ")");
//the entire graphic will be drawn within this <g> element,
//so all coordinates will be relative to the center of the circle

g.append("circle")
    .attr("r", outerRadius)
    .attr("opacity", 0);



//this circle is set in CSS to be transparent but to respond to mouse events
//It will ensure that the <g> responds to all mouse events within
//the area, even after chords are faded out.
load_csv( "_data/jan06.csv" );

function load_csv (filepath) {
   var tests = [];
        var RM = [];
        var BK = [];
        var TT = [];
        var SL = [];
        var FM = [];  
        var OW = [];
        var EM = [];    
        var XX = [];
       // var BP = [];
        var DC = [];
        var MB = [];
        var master_matrix = [];
        var new_matrix = [];        
        var exits = [];
            
        var w = window;

        d3.csv(filepath, function (data){
                data.forEach(function(data1){
                    if (data1.Exit != "") {
                    RM.push(+data1.RM);
                    BK.push(+data1.BK);
                    TT.push(+data1.TT);
                    SL.push(+data1.SL);
                    FM.push(+data1.FM);
                    OW.push(+data1.OW);
                    EM.push(+data1.EM);
                    XX.push(+data1.XX);
                 //   BP.push(+data1.BP);
                    DC.push(+data1.DC);
                    MB.push(+data1.MB); 
                 //   exits.push(data1.Exit);
                    };  
                });
                //master_matrix.push(RM, BK, TT, SL, FM, OW, EM, XX, BP, DC, MB);
                master_matrix.push(RM, BK, TT, SL, FM, OW, EM, XX, DC, MB);
                exits = ["Richmond", "Downtown Berkeley", "12th street oakland", "San Leandro", "Fremont", "West Oakland", "Embarcadero", "16th street mission", "Daly City"
, "Millbrae"];
                updateChords(master_matrix, exits);
                redraw(stations[2], 2);
        });
    

};


// BAR CHART //////////////



                                  
//Create SVG element
var chart_svg = d3.select("#bar_chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h*3);

chart_svg.selectAll("rect")
         .data(tT)
         .enter()
         .append("rect")
         .transition()
         .duration(1000)
         .attr("x", function(d, i) {
              return i * (w / tT.length);
         })
         .attr("y", function(d) {
              return (h*3) - (d.percent * 7);
         })
         .attr("width", w / tT.length - barPadding)
         .attr("height", function(d) {
              return d.percent * 7;
         })
         .attr("fill", "E5E5E5");

      chart_svg.selectAll("text")
         .data(tT)
         .enter()
         .append("text")
         .text(function(d) {
              return d.level+" "+d.percent+"%";
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
              return i * (w / tT.length) + (w / tT.length - barPadding) / 2;
         })
         .attr("y", function(d) {
              return (h*3) - (d.percent * 7) + 14;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "#A77FFF");

var info_svg = d3.select("#info")
                   .append("svg")
                   .attr("width", w)
                   .attr("height", 30);

info_svg.append("text")
   .text("For people communting through: "+station_label.tT)
   .attr("text-anchor", "middle")
   .attr("x", w/2)
   .attr("y", 20)
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "#A77FFF");                        


// END BAR CHART //////////////


function redraw(chart_data, index) {
 label = ["Richmond", "Downtown Berkeley", "12th street oakland", "San Leandro", "Fremont", "West Oakland", "Embarcadero", "16th street mission", "Daly City"
, "Millbrae"];

            chart_svg.selectAll("rect")
               .data(chart_data)
               .transition()
               .duration(1500)
               .attr("x", function(d, i) {
                    return i * (w / chart_data.length);
               })
               .attr("y", function(d) {
                    return h*3 - (d.percent * 7);
               })
               .attr("width", w / chart_data.length - barPadding)
               .attr("height", function(d) {
                    return d.percent * 7;
               })
               .attr("fill", "#B0B0B0");

            chart_svg.selectAll("text")
               .data(chart_data)
               .transition()
               .duration(1500)
               .text(function(d) {
                    return d.level+" "+d.percent+"%";
               })
               .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                    return i * (w / chart_data.length) + (w / chart_data.length - barPadding) / 2;
               })
               .attr("y", function(d) {
                    return h*3 - (d.percent * 7) + 14;
               })
               .attr("font-family", "sans-serif")
               .attr("font-size", "11px")
               .attr("fill", "#A77FFF");             

           info_svg.select("text")
               // .text("For people tranisting through: "+station_label.chart_data)
               .text("For people communting through: "+label[index]);

}

/* Create OR update a chord layout from a data matrix */
function updateChords(matrix, labels) {
  
   /* Compute chord layout. */
    layout = getDefaultLayout(); //create a new layout object
    layout.matrix(matrix);
    
    var color_array = ["#7FCAFF", "#7F97FF", "#A77FFF", "#E77FFF", "#FF9C7E", "#FFD77E", "#7FCAFF", "#CAF562","#62F5C8", "#FFBD7E", "#FFCAF8"];

    /* Create/update "group" elements */
    var groupG = g.selectAll("g.group")
        .data(layout.groups(), function (d) {
            return d.index; 
            //use a key function in case the 
            //groups are sorted differently between updates
        });
    
    groupG.exit()
        .transition()
            .duration(1500)
            .attr("opacity", 0)
            .remove(); //remove after transitions are complete
    
    var newGroups = groupG.enter().append("g")
        .attr("class", "group");
    //the enter selection is stored in a variable so we can
    //enter the <path>, <text>, and <title> elements as well

    
    //Create the title tooltip for the new groups
    newGroups.append("title");
    
    //Update the (tooltip) title text based on the data
    groupG.select("title")
        .text(function(d, i) {
            return numberWithCommas(d.value) 
                + " trips ended at " 
                + labels[i];
        });

    //create the arc paths and set the constant attributes
    //(those based on the group index, not on the value)
    newGroups.append("path")
        .attr("id", function (d) {
            return "group" + d.index;
            //using d.index and not i to maintain consistency
            //even if groups are sorted
        })
        .style("fill", function (d) {
            return color_array[d.index];
        });
    
    //update the paths to match the layout
    groupG.select("path") 
        .transition()
            .duration(1500)
            //.attr("opacity", 0.5) //optional, just to observe the transition
        .attrTween("d", arcTween( last_layout ))
           // .transition().duration(100).attr("opacity", 1) //reset opacity
        ;
    
    //create the group labels
    newGroups.append("svg:text")
        .attr("xlink:href", function (d) {
            return "#group" + d.index;
        })
        .attr("dy", ".35em")
        .attr("color", "#222")
        .text(function (d) {
            return labels[d.index];
        });

    //position group labels to match layout
    groupG.select("text")
        .transition()
            .duration(1500)
            .attr("transform", function(d) {
                d.angle = (d.startAngle + d.endAngle) / 2;
                //store the midpoint angle in the data object
                
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                    " translate(" + (innerRadius + 20) + ")" + 
                    (d.angle > Math.PI ? "rotate(180)" :" rotate(0)"); 
                //include the rotate zero so that transforms can be interpolated
            })
            .attr("text-anchor", function (d) {
                return d.angle > Math.PI ? "end" : "begin";
            });
    
    
    /* Create/update the chord paths */
    var chordPaths = g.selectAll("path.chord")
        .data(layout.chords(), chordKey );
   
    //create the new chord paths
    var newChords = chordPaths.enter()
        .append("path")
        .attr("class", "chord")
        .attr("fill", function (d) {
            console.log(d);
            return color_array[d.target.index];    
        })
        .style("opacity", 0.5);
    
    // Add title tooltip for each new chord.
    newChords.append("title");
    
    // Update all chord title texts
    chordPaths.select("title")
        .text(function(d) {
            if (labels[d.target.index] !== labels[d.source.index]) {
                return [numberWithCommas(d.source.value),
                        " trips from ",
                        labels[d.source.index],
                        " to ",
                        labels[d.target.index],
                        "\n",
                        numberWithCommas(d.target.value),
                        " trips from ",
                        labels[d.target.index],
                        " to ",
                        labels[d.source.index]
                        ].join(""); 
            } 
            else { //source and target are the same
                return numberWithCommas(d.source.value) 
                    + " trips started and ended in " 
                    + labels[d.source.index];
            }
        });


    //handle exiting paths:
    chordPaths.exit().transition()
        .duration(1500)
        .attr("opacity", 0)
        .remove();

    //update the path shape
    chordPaths.transition()
        .duration(1500)
        //.attr("opacity", 0.5) //optional, just to observe the transition
        .style("fill", function (d) {
            return color_array[d.source.index];
        })
        .attrTween("d", chordTween(last_layout))
        //.transition().duration(100).attr("opacity", 1) //reset opacity
    ;

    //add the mouseover/fade out behaviour to the groups
    //this is reset on every update, so it will use the latest
    //chordPaths selection

    groupG.on("click", function(d) {
        //chordPaths.classed("fade", function (p) {
            //returns true if *neither* the source or target of the chord
            //matches the group that has been moused-over
            //return ((p.source.index != d.index) && (p.target.index != d.index));
        //});

        redraw(stations[d.index], d.index);

        chordPaths.style("opacity", function (p) {if ((p.source.index != d.index) && (p.target.index != d.index)) {
            return 0.15;   
            console.log(p); 
        } else {return 0.7;};
    });
    });

    last_layout = layout; //save for next update
}

function arcTween(oldLayout) {
    //this function will be called once per update cycle
    
    //Create a key:value version of the old layout's groups array
    //so we can easily find the matching group 
    //even if the group index values don't match the array index
    //(because of sorting)
    var oldGroups = {};
    if (oldLayout) {
        oldLayout.groups().forEach( function(groupData) {
            oldGroups[ groupData.index ] = groupData;
        });
    }
    
    return function (d, i) {
        var tween;
        var old = oldGroups[d.index];
        if (old) { //there's a matching old group
            tween = d3.interpolate(old, d);
        }
        else {
            //create a zero-width arc object
            var emptyArc = {startAngle:d.startAngle,
                            endAngle:d.startAngle};
            tween = d3.interpolate(emptyArc, d);
        }
        
        return function (t) {
            return arc( tween(t) );
        };
    };
}

function chordKey(data) {
    return (data.source.index < data.target.index) ?
        data.source.index  + "-" + data.target.index:
        data.target.index  + "-" + data.source.index;
    
    //create a key that will represent the relationship
    //between these two groups *regardless*
    //of which group is called 'source' and which 'target'
}
function chordTween(oldLayout) {
    //this function will be called once per update cycle
    
    //Create a key:value version of the old layout's chords array
    //so we can easily find the matching chord 
    //(which may not have a matching index)
    
    var oldChords = {};
    
    if (oldLayout) {
        oldLayout.chords().forEach( function(chordData) {
            oldChords[ chordKey(chordData) ] = chordData;
        });
    }
    
    return function (d, i) {
        //this function will be called for each active chord
        
        var tween;
        var old = oldChords[ chordKey(d) ];
        if (old) {
            //old is not undefined, i.e.
            //there is a matching old chord value
            
            //check whether source and target have been switched:
            if (d.source.index != old.source.index ){
                //swap source and target to match the new data
                old = {
                    source: old.target,
                    target: old.source
                };
            }
            
            tween = d3.interpolate(old, d);
        }
        else {
            //create a zero-width chord object
            if (oldLayout) {
                var oldGroups = oldLayout.groups().filter(function(group) {
                        return ( (group.index == d.source.index) ||
                                 (group.index == d.target.index) )
                    });
                old = {source:oldGroups[0],
                           target:oldGroups[1] || oldGroups[0] };
                    //the OR in target is in case source and target are equal
                    //in the data, in which case only one group will pass the
                    //filter function
                
                if (d.source.index != old.source.index ){
                    //swap source and target to match the new data
                    old = {
                        source: old.target,
                        target: old.source
                    };
                }
            }
            else old = d;
                
            var emptyChord = {
                source: { startAngle: old.source.startAngle,
                         endAngle: old.source.startAngle},
                target: { startAngle: old.target.startAngle,
                         endAngle: old.target.startAngle}
            };
            tween = d3.interpolate( emptyChord, d );
        }

        return function (t) {
            //this function calculates the intermediary shapes
            return path(tween(t));
        };
    };
}


/* Activate the buttons and link to data sets */
d3.select("#jan_2006").on("click", function () {
    load_csv( "_data/jan06.csv" );
    //replace this with a file url as appropriate
    
    //enable other buttons, disable this one
    disableButton(this);
});

d3.select("#jan_2008").on("click", function() {
    load_csv( "_data/jan08.csv" );
    disableButton(this);
});

d3.select("#jan_2010").on("click", function() {
  load_csv( "_data/jan10.csv" );
    disableButton(this);
});

d3.select("#jan_2013").on("click", function() {
   load_csv( "_data/jan13.csv" );
    disableButton(this);
});

function disableButton(buttonNode) {
    d3.selectAll("button")
        .attr("disabled", function(d) {
            return this === buttonNode? "true": null;
        });
}
});
