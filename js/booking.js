var Booking = (function(){

	function Booking(id, startSeat, startRow, endSeat, endRow){
		this.id = id;
		this.startRow = startRow;
		this.startSeat = startSeat;
		this.endRow = endRow;
		this.endSeat = endSeat;

		this.seats = this.endSeat - this.startSeat + 1;
		this.rows = this.endRow - this.startRow + 1;

		this.color = 'rgba(255, 255, 255, 0.3)';
		
		this.validationId = 0;
		this.validationSeat = 0;
	}

	Booking.prototype.getValidationDetails = function() {
		switch(this.validationId){
			case 1:
				return {
					color: 'rgba(255, 0, 0, 0.3)',
					msg: 'more than 1 row, or more than 5 seats'
				};
			case 2:
				return {
					color: 'rgba(0, 255, 255, 0.3)',
					msg: 'intersects with #' + Map.getInstance().map[this.startRow][this.validationSeat] + ' at (' + this.startRow + ', ' + this.validationSeat + ')' 
				};
			case 3:
				return {
					color: 'rgba(0, 255, 0, 0.3)',
					msg: 'leaves left gap' 
				};			
			case 4:
				return {
					color: 'rgba(0, 255, 0, 0.3)',
					msg: 'leaves right gap'
				};							
		}

		return {
			color: 'rgba(255, 255, 255, 0.3)',
			msg: ''
		}
	};

	return Booking;
})();