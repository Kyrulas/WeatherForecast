var weatherObject ;

(function(){
	getWeatherData("http://api.openweathermap.org/data/2.5/forecast/daily?id=2643743&units=metric&cnt=9&lang=ua");
})()


//702550

function getWeatherData(url){
		function resultFunction(data){
			weatherObject = data;
			populateData(data,0);
		}

	$.ajax({
		url:url
	}).done(resultFunction)
}



function populateData(weatherData,fromElemt){
	//populating temperature data for each day
	for (var i = 1; i <= 3; i++) {
		$("#day_"+i+"_temp").text(Math.round(weatherData.list[fromElemt+i-1].temp.day )+ '\xB0');

		//populating data 
		$("#day_"+i+"_data").text(moment.unix(weatherData.list[fromElemt+i-1].dt).format("DD.MM"));
		$("#day_"+i).text(moment.unix(weatherData.list[fromElemt+i-1].dt).format("dddd"));

		//description
		$("#day_"+i+"_descr").text(weatherData.list[fromElemt+i-1].weather[0].main);

		//degree in morning
		$("#day_"+i+"_morning").text(Math.round(weatherData.list[fromElemt+i-1].temp.morn) + '\xB0' + 'in morning');

		//degree in night
		$("#day_"+i+"_night").text(Math.round(weatherData.list[fromElemt+i-1].temp.night) + '\xB0' + 'in night');

		//humidity
		$("#day_"+i+"_humidity").text(weatherData.list[fromElemt+i-1].humidity + '% (humidity)');
	}

}

function nextThreeDays(){
	populateData(weatherObject,3);
}

function previousThreeDays(){
	populateData(weatherObject,0);
}


$(document).ready(function(){
	$('.ps_next').click(nextThreeDays);

	$('.ps_prev').click(previousThreeDays);
});


