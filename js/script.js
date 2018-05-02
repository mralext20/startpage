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
        "showWeather" : true
  }
};

/*  Clock  *\
\*=========*/
function updateClock() {
	var currentTime = new Date ();
	var currentHours = currentTime.getHours ();
	var currentMinutes = currentTime.getMinutes ();
	var currentSeconds = currentTime.getSeconds ();

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
    $.get("https://alext.duckdns.org/weewx/c/api/daily.json", (res) => {
        otemp = res.stats.current.outTemp;
        itemp = res.stats.current.insideTemp;
        $.get("https://alext.duckdns.org/weewx/api/daily.json", (res) =>{
            wind = res.stats.current.windSpeed;
            if (parseFloat(wind) != 0) {
                $("#weather").html(`\uD83C\uDF21:${otemp} \uD83C\uDFE0:${itemp} \uD83C\uDF2C:${parseFloat(wind)}MPH`);
            } else {
                $("#weather").html(`\uD83C\uDF21:${otemp} \uD83C\uDFE0:${itemp}`);
            }
        });
    });
}

function searchBox(url, name, placeholder) {
	var string = '<form method="get" action="' + url + '">'
	           + '<input type="text" required id="g" name="' + name + '" placeholder="' + placeholder + '" maxlength="255" value="">'
	           + '<span class="highlight"></span>'
	           + '<span class="bar"></span>'
	           + '</form>';
	return string;
}

$(document).ready(function() {

	var shortcuts = {};
	
	/*  Get Links  *\
	\*=============*/
	var linkString = $('#container').text();

	/*  Clear Page  *\
	\*==============*/
	$('#container').empty();

	/*  Create Array from linkString  *\
	\*================================*/
	var linkArray = linkString.split("\n");

	/*  Go thru Array  *\
	\*=================*/
	var i;
	var count = 1;
	var html = '';

	for(i in linkArray) {

		/*  Get line  *\
		\*============*/
		var line = jQuery.trim(linkArray[i]);

		// If line is empty, skip
		if(!line) continue;

		/*  If it doesn't contain "://",  *\
		|*  it's not a URL                *|
		\*================================*/
		if(/:\/\//.test(line) != true) {
			if(count > 1) {
				html = html + '</div>';
			}
			html = html + '<div class="block"><h1>' + line + '</h1><ul>';
			count++;
			continue;
		}

		/*  Split URL, Title and icon (if any) *\
		\*=======================*/
		var lineArray = line.split(" || ");
		var url = lineArray[0];
		var title = lineArray[1];
		
		var icon = "";
		if (lineArray[3]) {
			icon = lineArray[3];
		}
		
		/*  Add to shortcuts array *\
		\*=========================*/
		if(lineArray[2]) {
			shortcuts[lineArray[2]] = "'"+url+"'";
		}

		/* Prepares HTML code for showing icon *\
		\*=====================================*/
		var iconHtml = '';
		if (settings.icons.showIcons && icon) {
			iconHtml = '<img src="' + icon + '"/>'; 
		}

		/*  Add HTML code  *\
		\*=================*/
		if(settings.navigation.newWindow) {
			  html = html + '<li>' + iconHtml + '<a href="' + url + '" target="_blank">' + title + '</a></li>';
		}
		else {
			  html = html + '<li>' + iconHtml + '<a href="' + url + '">' + title + '</a></li>';
		}
	}

	/*  Add generated content to page  *\
	\*=================================*/
	html = html + '</ul></div>';
	$('#container').append(html);


	/*  Animation Time!  *\
	\*===================*/
	
	/*  Hide lists  *\
	\*==============*/
	// if (settings.animation.hideLinks) {
	// 	$('ul').slideUp();

	// 	/*  Show on hover  *\
	// 	\*=================*/
	// 	$('.block').mouseenter(function() {
	// 		$('ul', this).slideDown();
	// 	});

	// 	/*  Hide on unhover  *\
	// 	\*===================*/
	// 	$('.block').mouseleave(function() {
	// 		$('ul', this).slideUp();
	// 	});


	/*  Search Engines  *\
	\*==================*/
/*
	var search = '<div id="searches">';

	for (var i = 0; i < settings.search.engines.length; i++) {
		var engine = settings.search.engines[i];
		search = search + searchBox(engine[0], engine[1], engine[2]);
		if(engine[3]) {
			var jsSearchUrl=engine[0]+"?"+engine[1]+"=";
			var jsSearchPrompt="prompt('Search "+engine[2]+":')";
			var jsSearch="'"+jsSearchUrl+"'+"+jsSearchPrompt;
			shortcuts[engine[3]] = jsSearch;
      }
	}

	search = search + '</div>';


  $('body').append(search);
	if(settings.search.focusSearch) {
		var searchDiv = document.getElementById ('searches');
		$(searchDiv.firstChild.firstChild).focus();
	}
*/
	/*  Clock  *\
	\*=========*/

	if(settings.clock.showClock) {
		// Add empty '#clock' div
		$('body').append('<a href="http://time.is"><div id="clock"></div></a>');

		// Update clock
        updateClock();
		setInterval('updateClock()', 1000);
	}
  /*  weather thingy *\
  \*=================*/

if(settings.weather.showWeather) {
    // add weather div
    $('body').append('<a href="http://alext.duckdns.org/weewx/c/"><div id="weather"></div></a>');
    updateWeather();
    setInterval('updateWeather()',600000);
}


	/*  Keybindings  *\
	\*===============*/

	var typed = '';
	var shortcutArray = Object.keys(shortcuts);
	var typedDate = new Date();
	// Check if we typed a keybinding
	function hasSubstring(element) {
		var index = typed.indexOf(element);
		if(index >= 0) {
			var sliced = typed.slice(index, typed.length);
			typed = ''; // Clean typed, so that we can watch for the next keybinding
			if(settings.navigation.newWindow) {
				window.open(eval(shortcuts[sliced]));
			} else {
				window.location.replace(eval(shortcuts[sliced]));
			}
		}
	}

	// React on keypress
	$(window).keypress(function(e) {
		// If we're in an input, we don't want to interpret the keypresses
		$('input').keypress(function(e) {
			e.stopPropagation();
		});
		var nowDate = new Date();
		var diffMs = (nowDate - typedDate);
		if (diffMs > 1000) {	
			typed = String.fromCharCode(e.which);
		} else {
			typed = typed + String.fromCharCode(e.which);
		}
		typedDate = new Date();
		shortcutArray.some(hasSubstring);
	});

});
