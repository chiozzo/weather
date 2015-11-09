define(function(require) {

	return {

		convertUnixTime: function(dt) {

			var convertedDateTime = new Date(dt * 1000);
			switch(convertedDateTime.getDay()) {
				case 0:
					var convertedDay = "Sun";
					break;
				case 1:
					convertedDay = "Mon";
					break;
				case 2:
					convertedDay = "Tue";
					break;
				case 3:
					convertedDay = "Wed";
					break;
				case 4:
					convertedDay = "Thu";
					break;
				case 5:
					convertedDay = "Fri";
					break;
				case 6:
					convertedDay = "Sat";
					break;
			}

			switch(convertedDateTime.getMonth()){
				case 0:
						var convertedMonth = "Jan";
						break;
				case 1:
						convertedMonth = "Feb";
						break;
				case 2:
						convertedMonth = "Mar";
						break;
				case 3:
						convertedMonth = "Apr";
						break;
				case 4:
						convertedMonth = "May";
						break;
				case 5:
						convertedMonth = "Jun";
						break;
				case 6:
						convertedMonth = "Jul";
						break;
				case 7:
						convertedMonth = "Aug";
						break;
				case 8:
						convertedMonth = "Sep";
						break;
				case 9:
						convertedMonth = "Oct";
						break;
				case 10:
						convertedMonth = "Nov";
						break;
				case 11:
						convertedMonth = "Dec";
						break;
			}

			var convertedDate = convertedDateTime.getDate();
			// 1st
			// 2nd
			// 3rd
			// 4-20th
			// 21st

			var convertedYear = convertedDateTime.getFullYear();

			return convertedDay + ", " + convertedMonth + " " + convertedDate + ", " + convertedYear;

		}

	};

});