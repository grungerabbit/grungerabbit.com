(function($) {		
		var $test = $("#test");
		var $allReviews = $(".reviews");
	
		var pretty = {
			'config' : {
				'theme': {
					//hueChoices: {
					//	red: 10,
					//	gold: 50,
					//	mint: 155,
					//	purple: 250
					//},
					'hue': 155,
					'sat': function(i) {
						var sat = 8.75;
						
						return sat * i;
					},
					'light': function(i) {
						var light = 3.65;
						
						return light * i;
					},
				},
				'container': $(".container"),
			},
			'init' : function() {
				pretty.Colorize();
				pretty.Responsive();
		
		
				
				
			},
			'Square' : function(el, size) {
				return el.width(size).height(size);
			},
			'Rainbow' : function(hue, sat, light) {
				return 'hsl(' + hue + ',' + sat +'%,' + light + '%)';
			},
			// make this better later
			'Opacity' : function(hue, sat, light, opacity) {
				return 'hsla(' + hue + ',' + sat +'%,' + light + '%,' + opacity + ')'; 
			},
			
			'Colorize' : function() {
				$allReviews.each( function() {
					var $rating = $(this).find(".rating");
					var $ratingNum = parseInt($rating.text(), 10);
					
					for (var i=0; i<=10; i++) {
						if ($ratingNum === i) {		
					
							var theme = pretty.config.theme.hue;
							var setSat = pretty.config.theme.sat;
							var setLight = pretty.config.theme.light;
					
							
							$(this).css("background-color", pretty.Rainbow(theme, setSat(i), setLight(i)+i^2));
							if (i===10) {
								$(this).css("background-color", pretty.Rainbow(theme, 100, setLight(i)+i^2));
							}
							
							//text color switching let's rewrite this later
							if (i <= 5) {
								$(this).find("h2, h5, em").css("color", pretty.Opacity(theme, i*19, 100-(i*12), i/20+0.5));
								$(this).find(".info").css("background-color", pretty.Opacity(theme, i*15, 100-(i*12), 0.25));
							}
							else {
								$(this).find("h2, h5, em").css("color", pretty.Opacity(theme, i*12, i*9.2, i/8));
								$(this).find(".info").css("background-color", pretty.Opacity(theme, i*15, i*9.2, 0.3));
							}
						}
					}
				});
			},
			'Responsive' : function() {
				var $reviews = $(".reviews");
				var cols;
				var containerWidth = parseInt(pretty.config.container.width());
				
				if (containerWidth < 500) {
					var cols = 1;
				}
				else if (containerWidth < 770) {
					var cols = 2;
				}
				else if (containerWidth < 1350) {
					var cols = 3;
				}
				else if (containerWidth < 1600) {
					var cols = 4;
				}
				else {
					var cols = 5;
				}
				
				var square = (containerWidth / cols) - 50;
				var squareRound = Math.floor(square / 10) * 10;
		
				pretty.Square($reviews, squareRound);
				$(".info").width(squareRound+14).css("padding", "3px .5em");
				
				if (squareRound <= 250) {
					$reviews.addClass("mini");
				}
				else if (squareRound >= 330) {
					$reviews.addClass("large")
				}
				else if (squareRound >= 400) {
					$reviews.addClass("huge")
				}
			},
			
			
			// REMEMBER YOUR COMMAS MAN
			'BG' : function(el, color) {
				el.css("background-color", color);
			}
		
		};
		
	$(document).ready(function() {	
		pretty.init();

	});
})(jQuery);
				