var apiclient = (function () {
    var appUrl = 'http://localhost:8080/blueprints/';

    return {
        getBlueprintsByAuthor: function (author, callback) {
            jQuery.ajax({
                url: appUrl + author,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        },

        getBlueprintsByNameAndAuthor: function (name, author, callback) {

            jQuery.ajax({
                url: appUrl + author + "/" + name,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        },
        
        setBluePrint: function (name, author, newBluePrint){
        	var putRequest=$.ajax({
        		url:  "/blueprints/" + author + "/" + name + "/",
        		type: 'PUT',
        		data: newBluePrint,
        		contentType: "application/json"
        	});
        	
        	putRequest.then(
        		function(){
        			app.update(author);
        			if(name){
        				app.getPlan(name, author);
        			}
        		},
        	
	        	function(){
	        		console.info("ERROR setBlueprint");
	        	}
        	
        	);
        }
        	
    
    }
})();


 
  