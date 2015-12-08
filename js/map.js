var Map = (function (utilsModule) {
    var instance;
 
    function createInstance() { 
    	var rows = 100, seats = 50; // hmmm...

        return {
        	rows: rows,
        	seats: seats, 
        	map: utilsModule.matrix(rows, seats, -1)
        };
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})(UtilsModule);