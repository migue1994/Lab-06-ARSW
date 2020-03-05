var mock = apimock;

var app = (function () {
    var authorName;
    var list = [];
    var puntos = [];
    
    let num = 0;
    

    var setName = function (author) {
        authorName = author;
    };
    

    var getPlansByName = function (author) {
    	limpiarCanvas();
    	vaciarListaPuntos();

        setName(author);
        $("#authorName").text(author);
    	$("#authorPlane").text(author+"'s blueprints:");

    	mock.getBlueprintsByAuthor(author, getTable);
    };

    var getPoints = function (blueprints) {
        return blueprints.map(function (blueprint) {
            return {name: blueprint.name, points: blueprint.points.length};
        });
    };
    
    var getPointsSum = function(blueprints) {
    	// Función reductora sobre cada elemento en la lista blueprints
    	var sumPoints=blueprints.reduce(function(suma, blueprint){
    		return suma+blueprint.points;
    	}, 0);
    	
    	$("#pointsSum").text("Total user points: " + sumPoints);
    }; 
    
    var getTable = function (blueprints) {
        blueprints = getPoints(blueprints);
        list = blueprints;
        
        $("#blueprintTableBody").empty();
        blueprints.map(function (blueprint) {
            $("#blueprintTableBody").append(
                "<tr> " +
                "<td>" + blueprint.name + "</td> " +
                "<td>" + blueprint.points + "</td> " +
                "<td><button type='button' class='btn-outline-success' onclick='app.getBlueprintsByNameAndAuthor( \"" +blueprint.name + '" , "' + authorName + "\")' >Open</button></td>"+
            "</tr>"
            );
        });

        getPointsSum(blueprints);

    };

    var getBlueprintsByNameAndAuthor = function (name, author) {
    	limpiarCanvas();
    	vaciarListaPuntos();
    	
        mock.getBlueprintsByNameAndAuthor(name, author, getCanvas);
    };

    var getCanvas = function (blueprint) {
    	startCapture();
    	
        $("#currentBluePrint").text("Current blueprint: "+blueprint.name);
        var can=document.getElementById("myCanvas");
        var ctx=can.getContext("2d");

        ctx.clearRect(0, 0, can.width, can.height);
        ctx.beginPath();

        var aux;

        blueprint.points.map(function(point){
            if(!aux){
                aux=point;
                ctx.moveTo(aux.x, aux.y);
            }
            else{
                ctx.lineTo(point.x, point.y);
                //draw
                ctx.stroke();
            }
        });
    };

    var restSwitch = function () {
        if (num == 0){
            mock = apiclient;
            num++;
        }else {
            num = 0;
            mock = apimock;
        }
    };
    
    
    var startCapture = function(){
    	var canvas=document.getElementById("myCanvas");
    	$("#myCanvas").click(function(e){
    	     getPosition(e); 
    	});

    	var pointSize = 3;

    	function getPosition(event){
    		var rect = canvas.getBoundingClientRect();
    		var x = event.clientX - rect.left;
    		var y = event.clientY - rect.top;
    	        
    		punto = {coorX: x, coorY: y};
    		puntos.push(punto);
    	     
    		document.getElementById("mostrarPuntos").innerHTML=JSON.stringify(puntos);
    	     
    		drawCoordinates(x,y);
    	     
    	    
    	}

    	function drawCoordinates(x,y){	
    		var ctx = document.getElementById("myCanvas").getContext("2d");
    		ctx.fillStyle = "#ff2626"; // Red color
    		ctx.beginPath();
    		ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    		ctx.fill();
    	}
    };
    
    var vaciarListaPuntos = function(){
    	puntos=[];
		document.getElementById("mostrarPuntos").innerHTML=JSON.stringify(puntos);
    }
    
    var limpiarCanvas = function(){
    	var can=document.getElementById("myCanvas");
        var ctx=can.getContext("2d");

        ctx.clearRect(0, 0, can.width, can.height);
        ctx.beginPath();
    }
   
    return {
        update: getPlansByName,
        getBlueprintsByNameAndAuthor : getBlueprintsByNameAndAuthor,
        restSwitch : restSwitch, 
    };
})();




