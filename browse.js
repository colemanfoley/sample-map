
var w = 960,
    h = 500

var vis = d3.select("#browser")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json(level, function(json) {
    var force = self.force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([w, h])
        .start();

    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    var node = vis.selectAll("g.node")
        .data(json.nodes)
      .enter().append("svg:g")
        .attr("class", "node")
        .call(force.drag);

    node.append("svg:image")
        .attr("class", "circle")
        .attr("xlink:href", function(d) { return "circle" + (d.group ? "" : "_hub") + ".png"; })
        .attr("x", "-10px")
        .attr("y", "-10px")
        .attr("width", "20px")
        .attr("height", "20px");

    node.append("svg:text")
        .attr("class", "nodetext")
        .attr("dx", 15)
        .attr("dy", 5)
        .text(function(d) { return d.name });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
});
