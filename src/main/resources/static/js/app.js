var mock = apiclient;

var app = (function () {
    var authorName;
    var list = [];
    var puntos = [];
    var blue;
    var bluePrintName;
    let num = 0;
    var numOfBluePrint;
    
    

    var setName = function (author) {
        authorName = author;
    };
    

    var getPlansByName = function (author) {
    	cleanTable();
    	limpiarCanvas();
    	
    	vaciarListaPuntos();

        setName(author);
        $("#authorName").text(author);
    	$("#authorPlane").text(author+"'s blueprints:");

    	mock.getBlueprintsByAuthor(authorName, getTable);
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
    	list = blueprints;
    	numOfBluePrint=blueprints.length;
    	
    	
    	blueprints = getPoints(blueprints);
        
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
    
    var cleanTable = function () {
        
        
        $("#blueprintTableBody").empty();
            $("#blueprintTableBody").append(
                "<tr> " +
                "<td></td> " +
                "<td></td> " +
            "</tr>"
            );
      

    };


    var getBlueprintsByNameAndAuthor = function (name, author) {
    	limpiarCanvas();
    	vaciarListaPuntos();
    	
    	bluePrintName=name;
    	
        mock.getBlueprintsByNameAndAuthor(name, author, getCanvas);
    };

    var getCanvas = function (blueprint) {
        blue = blueprint;
    	
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
    		var x = event.offsetX * canvas.width / canvas.clientWidth | 0;
    		var y = event.offsetY * canvas.height / canvas.clientHeight | 0;
    		let punto = {x: x, y: y};
    		
    		var currentBlue=list.filter(obj => {
    		      return obj.name === bluePrintName;
    	    })[0];
    		
    		currentBlue.points.push({ x: x, y: y });
    		
    	    console.log(currentBlue);
    	    getCanvas(currentBlue);
    		
    		//blue.points.push(punto);
    		//getCanvas(blue);
    		//$("#pointsSum").text("Total user points: " + blue.points.length);
    		// document.getElementById("mostrarPuntos").innerHTML=JSON.stringify(blue.points);
    		// drawCoordinates(x,y);
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
    
    
    var updateSave = function(){
    	var blueprint = list.filter(obj => {
    		return obj.name === bluePrintName;
    	})[0];
    	mock.setBluePrint(bluePrintName, authorName, JSON.stringify(blueprint));
    }
    
    var blueDelete = function(){
    	if(numOfBluePrint > 1){
    		mock.deleteBlueprint(bluePrintName, authorName);
    	}
    	else{
    		alert("No es posible borrar más planos")
    	}
    }
    
   
    return {
        update: getPlansByName,
        getBlueprintsByNameAndAuthor : getBlueprintsByNameAndAuthor,
        restSwitch : restSwitch,
        startCapture : startCapture,
        updateSave : updateSave,
        blueDelete : blueDelete
    };
})();




