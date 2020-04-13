/**
	Startpage Reworked
	==================

	by Christian Brassat,
	reusing code by Jukka Svahn

	customization by Gustavo Moraes <http://about.me/gustavosotnas>
*/

/**
	Released under MIT License

	Copyright (c) 2010 Jukka Svahn, Christian Brassat
	<http://rahforum.biz>
	<http://crshd.cc>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/* Settings *\
\*==========*/
var settings = {
	"navigation": {
		"newWindow": false
	},

	"search": {
		"engines": [
			["http://www.google.com/search", "q", "Google", "sg"],
		],
		"focusSearch": false
	},

	"clock": {
		"showClock": true
	},

	"animation": {
		"hideLinks": true
	},

	"icons": {
		"showIcons": true
	},
	"weather": {
		"showWeather": true
	},
};

/*  Clock  *\
\*=========*/
function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();

	// Pad the time with leading zeros, if required
	// currentHours = (currentHours < 10 ? "0" : "") + currentHours;
	currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
	currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

	// Choose either "AM" or "PM" as appropriate
	//var timeOfDay = (currentHours < 12) ? "AM" : "PM";

	// Convert the hours component to 12-hour format if needed
	currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

	// Convert an hours component of "0" to "12"
	currentHours = (currentHours == 0) ? 12 : currentHours;

	// Compose the string for display
	var currentTimeString = currentHours + ":" + currentMinutes;

	// Fill '#clock' div with time
	$("#clock").html(currentTimeString);
}


/* more weather*/

function updateWeather() {
	var wind, otemp, itemp;
	$.get("http://alext.duckdns.org/weewx/c/api/daily.json", (res) => { // celcius stats
		otemp = res.stats.current.outTemp;
		itemp = res.stats.current.insideTemp;

		$.get("http://alext.duckdns.org/weewx/api/daily.json", (res) => { // ferinhight stats
			wind = res.stats.current.windSpeed;
			rain = res.stats.sinceMidnight.rainSum;

			if (otemp.charAt(otemp.length - 1) != 'A') {
				out = `<i class="fas fa-thermometer-three-quarters"></i>:${otemp}`;
			} else {
				out = "";
			}
			if (itemp.charAt(otemp.length - 1) != 'A') {
				out = out + ` <i class="fas fa-home"></i>:${itemp}`;
			}
			if (wind.charAt(wind.length - 1) != 'A') {
				if (parseFloat(wind) != 0) {
					winddir = res.stats.current.windDirText;
					windgust = res.stats.current.windGust;
					if (parseFloat(wind) != parseFloat(windgust)) {
						out = out + ` \uD83C\uDF2C:${winddir} ${parseFloat(wind)}G${parseFloat(windgust)} MPH`;
					} else {
						out = out + ` \uD83C\uDF2C:${winddir}${parseFloat(wind)}MPH`;
					}
				}
			}
			if (rain.charAt(rain.length - 1) != 'A') {
				if (parseFloat(rain) != 0) {
					out = out + ` <i class="fas fa-tint"></i>:${parseFloat(rain)}in`;
				}
			}

			$("#weather").html(out);
		});
	});
}


$(document).ready(function () {

	/*  Clock  *\
	\*=========*/

	if (settings.clock.showClock) {
		// Add empty '#clock' div
		$('body').append('<a href="http://time.is"><div id="clock"></div></a>');

		// Update clock
		updateClock();
		setInterval('updateClock()', 1000);
	}
  /*  weather thingy *\
  \*=================*/

	if (settings.weather.showWeather) {
		// add weather div
		$('body').append('<a href="http://alext.duckdns.org/weewx/c/"><div id="weather"></div></a>');
		updateWeather();
		setInterval('updateWeather()', 300000);
	}
});
