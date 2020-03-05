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
        }
    }
})();


 
  