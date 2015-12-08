var HandlersModule = (function(utils, module){

	// Base Handler
	module.Handler = function(){
		this.next = null;
		this.canContinue = true;
	}

	module.Handler.prototype.setNextHandler = function(handler){
		this.next = handler;
	}

	module.Handler.prototype.handle = function(booking){
		if(this.next && this.canContinue){
			this.next.handle(booking);
		}
	}

	// Validator
	module.Validator = function(){
	}
	module.Validator.prototype = new module.Handler();
	module.Validator.prototype.constructor = module.Validator;
	module.Validator.prototype.handle = function(booking){

		// validate for rows & seats
		if(booking.rows > 1 || booking.seats > 5){
			booking.validationId = 1;			
		}

		// validate for intersections
		if(booking.validationId == 0){
			for(var seat = booking.startSeat; seat <= booking.endSeat; seat++){
				if(Map.getInstance().map[booking.startRow][seat] >= 0){
					booking.validationId = 2;
					booking.validationSeat = seat;
				}
			}
		}

		// validate for gaps
		// to the left
		if(booking.validationId == 0){
			if(booking.startSeat - 2 >= 0 && Map.getInstance().map[booking.startRow][booking.startSeat - 1] < 0 
				&& Map.getInstance().map[booking.startRow][booking.startSeat - 2] >= 0){
				booking.validationId = 3;
			}
		}

		// and to the right
		if(booking.validationId == 0){
			if(booking.endSeat + 2 < Map.getInstance().map.seats && Map.getInstance().map[booking.startRow][booking.endSeat + 1] < 0 
				&& Map.getInstance().map[booking.startRow][booking.endSeat + 1] >= 0){				
				booking.validationId = 4;
			}
		}

		// validation passed, so we mark filled places
		if(booking.validationId == 0){
			for(var seat = booking.startSeat; seat <= booking.endSeat; seat++){
				Map.getInstance().map[booking.startRow][seat] = booking.id;
			}
		}

		module.Handler.prototype.handle.call(this, booking);
	}

	// Renderer
	module.Renderer = function(){
	}
	module.Renderer.prototype = new module.Handler();
	module.Renderer.prototype.constructor = module.Renderer;

	module.Renderer.prototype.handle = function(booking){		
		utils.EventBus.publish('renderData', booking);
		module.Handler.prototype.handle.call(this, booking);
	}

	// Writer
	module.Writer = function(){
	}
	module.Writer.prototype = new module.Handler();
	module.Writer.prototype.constructor = module.Writer;

	module.Writer.prototype.handle = function(booking){				
		utils.EventBus.publish('writeData', booking);
		module.Handler.prototype.handle.call(this, booking);
	}	

	return module;
})(UtilsModule, HandlersModule || {});