function refreshProjectChart1() {
    var keys = projectData.users;

    project_svg.select("g").remove();

    var margin = {top: 60, right: 20, bottom: 100, left: 40},
    canvas = project_svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var width = +project_svg.attr("width") - margin.left - margin.right;
    var height = +project_svg.attr("height") - margin.top - margin.bottom;

    radius = Math.min(width, height) / 2;

    // Define arc colours
    var colour = d3.scaleOrdinal(d3.schemeCategory20);

    // Define arc ranges
    var arcText = d3.scaleOrdinal()
    .range([0, width]);

    // Determine size of arcs
    var arc = d3.arc()
    .innerRadius(radius - 130)
    .outerRadius(radius - 10);

    // Create the donut pie chart layout
    var pie = d3.pie()
    .value(function (d) { return d["future_store"]; })
    .sort(null);

    g = canvas.append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    // Define inner circle
    g.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 100)
    .attr("fill", "#333") ;

    // Calculate SVG paths and fill in the colours
    var arc_path = g.selectAll(".arc")
                    .data(pie(engineerData))
                    .enter().append("g")
                    .attr("class", "arc")
            
    // Append the path to each g
    arc_path.append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
            return colour(i);
        });

    
    var legend = canvas.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(keys.slice().reverse())
                    .enter().append("g")
                    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colour);

    legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
}
