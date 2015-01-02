(function() {
    "use strict";

    var prepareDimensions = function () {
        var dimensions = {
            h: 500, w: 600,
            margin: {
                top: 5, left: 5, right: 5, bottom: 5
            }
        };

        dimensions.view = {
            w: dimensions.w - dimensions.margin.left - dimensions.margin.right,
            h: dimensions.h - dimensions.margin.top - dimensions.margin.bottom
        };
        return dimensions;
    };

    var prepareData = function() {
        return _.chain()
            .range(900)
            .map(function(d) {
                return {
                    id: d,
                    x: _.random(0, 100),
                    y: _.random(0, 100),
                    w: _.random(0, 10),
                    hsl: d3.hsl(_.random(360), 0.7, 0.7)
                };
            })
            .value();
    };

    var prepareScales = function(dimensions) {

        return {
            x: d3.scale.linear().domain([0, 100]).range([0, dimensions.view.w]),
            y: d3.scale.linear().domain([0, 100]).range([0, dimensions.view.h])
        };

    };

    var prepareTemplates = function() {
        var templateFns = {
            translate: _.template("translate(<%=dx%>,<%=dy%>) "),
            scale: _.template("scale(<%=s%>) ")
        };

        return {
            scale: function (s) {
                return templateFns.scale({s: s});
            },
            translate: function (dx, dy) {
                if (_.isArray(dx)) {
                    // convenience, d3 events provide transformation params as array
                    dy = dx[1];
                    dx = dx[0];
                }
                return templateFns.translate({dx: dx, dy: dy});
            }
        };
    };

    var dimensions = prepareDimensions();
    var data = prepareData();
    var scales = prepareScales(dimensions);
    var templates = prepareTemplates();

    window.stuff = { scales: scales, data: data, dimensions: dimensions, templates: templates };

    var zoomed = function() {
        svg.attr("transform", templates.translate(d3.event.translate) + templates.scale(d3.event.scale));
    };

    var zoom = d3.behavior.zoom()
        .scaleExtent([0.3, 5])
        .on("zoom", zoomed);

    var svg = d3.select("#holder").append("svg")
        .attr({
            height: dimensions.h,
            width: dimensions.w
        })
        .call(zoom)
        .append("g")
        .attr("transform", function() {
            return templates.translate(dimensions.margin.left, dimensions.margin.top)
        })


    svg.selectAll(".wibble")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return templates.translate(scales.x(d.x), scales.y(d.y)); })
        .classed("wibble", true)
        .append("circle")
        .attr("vector-effect","non-scaling-stroke") // think this can be pulled to css
        .attr("r", function(d) { return d.w})
        .attr("stroke", "black")
        .attr("fill", function(d) { return d.hsl});

})();

