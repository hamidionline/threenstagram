var threeinstagramInfo = [];

hello.init({ 
    instagram : 'f46ddcae652045e787a4a94082371dfa'
},{redirect_uri:'http://localhost/dthreenstagram/dthreenstagram/app/redirect.html'});



hello.on('auth.login', function(auth){
    
    // call user information, for the given network
    /*
    hello( auth.network ).api( '/me' ).success(function(r){
        var $target = $("#profile_"+ auth.network );
        if($target.length==0){
            //$target = $("<div id='profile_"+auth.network+"'></div>").appendTo("#profile");
        }
        //$target.html('<img src="'+ r.thumbnail +'" /> Hey '+r.name).attr('title', r.name + " on "+ auth.network);
    });
    */
    hello( auth.network ).api( '/me/photos' ).success(function(r){
        threeinstagramInfo = [];
        var i = 0;
        r.data.map(function(item) {
            var item = {
                'id' : i,
                'date' : item.created_time,
                'likes' : item.likes.count,
                'comments' : item.comments.count
            }
            i++;
            threeinstagramInfo.push(item);
        });
        drawPath(threeinstagramInfo);
    });
});


function drawPath(threeinstagramInfo) {
    
    console.log(threeinstagramInfo.length);

    var margin  = {top: 20, right: 20, bottom: 70, left: 40},
        width   = 900 - margin.left - margin.right,
        height  = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = threeinstagramInfo;

    data.forEach(function(d) {
        d.date      = new Date(d.date * 1000);
        d.likes     = +d.likes;
        d.comments  = +d.comments;
    });

    x.domain([0, threeinstagramInfo.length]);
    y.domain([0, d3.max(data, function(d) { return d.likes; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "translate(0,10)")
        //.attr("transform", "rotate(-90)" )
        ;

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.id); })
        .attr("width", '20px')
        .attr("y", function(d) { return y(d.likes); })
        .attr("height", function(d) { return height - y(d.likes); });
}
