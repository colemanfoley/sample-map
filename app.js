R.ready(function() {
  var player = new metronomik.player("playerControls", R.player);
});

var width = 960,
    height = 500

var svg = d3.select("#graphContainer").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(0.001)
    .distance(200)
    .charge(-50)
    .size([width, height]);

d3.json("graph.json", function(error, json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("rect")
      .attr("x", -50)
      .attr("y", -25)
      .attr("width", 100)
      .attr("height", 50)
      .style({
        "fill": "transparent"
      });

  node.append("svg:text")
    .attr("text-anchor", "middle")
    .attr("width", 100)
    .attr("height", 50)
    .text(function(d) { return d.artist + " - " + d.title });

  node.on("click", function(d) {
    R.ready(function() {
      R.player.play({source: d.key});
    });
  });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});