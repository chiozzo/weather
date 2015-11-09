define(function(require) {

	return {

		convertUnixTime: function(dt) {

			var convertedDateTime = new Date(dt * 1000);
			switch(convertedDateTime.getDay()) {
				case 0:
					var convertedDay = "Sun";
					break;
				case 1:
					var convertedDay = "Mon";
					break;
				case 2:
					var convertedDay = "Tue";
					break;
				case 3:
					var convertedDay = "Wed";
					break;
				case 4:
					var convertedDay = "Thu";
					break;
				case 5:
					var convertedDay = "Fri";
					break;
				case 6:
					var convertedDay = "Sat";
					break;
			};

			switch(convertedDateTime.getMonth()){
				case 0:
						var convertedMonth = "Jan";
						break;
				case 1:
						var convertedMonth = "Feb";
						break;
				case 2:
						var convertedMonth = "Mar";
						break;
				case 3:
						var convertedMonth = "Apr";
						break;
				case 4:
						var convertedMonth = "May";
						break;
				case 5:
						var convertedMonth = "Jun";
						break;
				case 6:
						var convertedMonth = "Jul";
						break;
				case 7:
						var convertedMonth = "Aug";
						break;
				case 8:
						var convertedMonth = "Sep";
						break;
				case 9:
						var convertedMonth = "Oct";
						break;
				case 10:
						var convertedMonth = "Nov";
						break;
				case 11:
						var convertedMonth = "Dec";
						break;
			};

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