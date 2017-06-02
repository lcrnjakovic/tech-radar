/**
 * Created by emil-vid.bacic on 2.6.2017..
 */

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var counter = 1;
function populateCircle (r, c, items){
    var angle = (2*Math.PI)/items
    for(var i = 1; i<=items; i++){
        var xMove = c + r*(Math.cos(i*angle));
        var yMove = c - r*(Math.sin(i*angle));
        addItem(xMove, yMove, counter+"");
        counter++;
    }
}

function populateOutCircle(items){
    populateCircle(4.5, 4.8, items);
}

function populateMidCircle(items){
    populateCircle(3.5, 4.8, items);
}

function populateInCircle(items){
    populateCircle(2.5, 4.8, items);
}

function populateBullCircle(items){
    if(items > 6){
        populateCircle(1.5, 4.8, 6);
        populateCircle(0.5, 4.8, items-6);
    } else {
        populateCircle(0.5, 4.8, items);
    }
}

function clearRadar(){
    svg = d3.select("svg");
    svg.selectAll("g").remove();
    counter = 1;
    $("#list").empty();
}

function populateRadar(id) {
    svg = d3.select("svg");
    clearRadar();

    // ID ce se tu mijenjat i vuc podatke iz baze ovisno o tech koji user oce vidjet
    if(id == 1){
        var c3 = 7;
        var c2 = 6;
        var c1 = 5;
        var cBull = 7;
    }

    if(id == 2){
        var c3 = 5;
        var c2 = 7;
        var c1 = 6;
        var cBull = 1;
    }

    if(id == 3){
        var c3 = 2;
        var c2 = 9;
        var c1 = 1;
        var cBull = 10;
    }

    if(id == 4){
        var c3 = 1;
        var c2 = 2;
        var c1 = 1;
        var cBull = 0;
    }

    populateOutCircle(c3);
    populateMidCircle(c2);
    populateInCircle(c1);
    populateBullCircle(cBull);
}
function addItem (x, y, txt){
    var g = svg.append("g")
        .on("mouseover", function(){
            handleHover(g, txt);
        })
        .on("mouseout", function(){
            handleHoverOut(g, txt);
        });
    var rect = g.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 0.4)
        .attr("height", 0.4)
        .attr("fill", "#000");
    var text = g.append("text")
        .attr("x", x + 0.1)
        .attr("y", y + 0.25)
        .attr("fill", "#fff")
        .text(txt)
        .attr("overflow", "visible")
        .attr("font-size", 0.2);
    $("#list").append("<li id='"+counter+"'>" + txt + "</li>");
}
function handleHover (rect, num){
    rect.attr("opacity", 0.75);
    $("#" + num).css("background-color", "#cecece");
}
function handleHoverOut(rect, num){
    rect.attr("opacity", 1.0);
    $("#" + num).css("background-color", "white");
}