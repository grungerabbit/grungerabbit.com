$(".splash .title, .name, .play a").lettering();
var c = "";
$(".splash .title span").each(function() {
	$(this).append("<em>"+$(this).text()+"</em>");
});

if ($("body").width() < 640) {
	$(".splash .title span:nth-child(6)").after("<br> -");
}

(function($){
	var grungerabbit = {
		"config" : {
			
		},
		"init" : function() {
			grungerabbit.madras();

		},
		"madras": function() {
			var $typo = $("#typologyMadras").parent()
			var madrasX = $typo.width();
			var madrasY = $typo.height();


			var paper = Raphael("typologyMadras", madrasX, madrasY);

			var Madras = function(originX, originY, widthX, widthY) {
			    this.originX = originX;
			    this.originY = originY;
			    this.widthX = widthX;
			    this.widthY = widthY;    
			}

			Madras.prototype.colors = {
				"pink" : "#fa0079",
				"teal" : "#02baa5",
				"white" : "#fffee3",
				"yellow" : "#fcfc00"
			}

			Madras.prototype.init = function () {
				var stripe = new Stripe();
			
				var pink = this.colors.pink;
				var teal = this.colors.teal;
				var white = this.colors.white;
				var yellow = this.colors.yellow;
			
				// DOWN
				var x = 3;
				do {
					x--;
					this.downMacro(stripe, pink, teal, white);
				} while (x>0)
			
				// ACROSS
				this.acrossWeave(stripe);
				this.acrossWeave(stripe);
			}

			Madras.prototype.acrossWeave = function (stripe) {
				var pink = this.colors.pink;
				var teal = this.colors.teal;
				var white = this.colors.white;
				var yellow = this.colors.yellow;
			
				this.acrossMacro(stripe, teal, white);
				this.acrossMacroThree(stripe, pink, teal);
				this.acrossMacro(stripe, yellow, white);
				this.acrossMacroThree(stripe, white, yellow);
				this.acrossMacroContrast(stripe, teal, white);
				this.acrossMacroThree(stripe, pink, white);
			}

			Madras.prototype.acrossMacro = function (stripe, first, second, third) {
				stripe.makeStripe("L-H", first);
				stripe.makeStripe("M-H", second);
				stripe.makeStripe("L-H", first);
			}

			Madras.prototype.acrossMacroThree = function (stripe, first, second) {
				stripe.makeStripe("L-H", first);
				stripe.makeStripe("XS-H", second);
				stripe.makeStripe("XS-H", first);
				stripe.makeStripe("XS-H", second);
				stripe.makeStripe("XS-H", first);
				stripe.makeStripe("XS-H", second);
				stripe.makeStripe("L-H", first);
			}

			Madras.prototype.acrossMacroContrast = function (stripe, first, second) {
				stripe.makeStripe("L-H", first);
				stripe.makeStripe("XXS-H", second);
				stripe.makeStripe("XS-H", first);
				stripe.makeStripe("XXS-H", second);
				stripe.makeStripe("XS-H", first);
				stripe.makeStripe("XXS-H", second);
				stripe.makeStripe("L-H", first);
			}

			Madras.prototype.downMacro = function (stripe, first, second, third) {
				stripe.makeStripe("XL-V", first);
				stripe.makeStripe("XSM-V", second);
				stripe.makeStripe("XXS-V", third);
				stripe.makeStripe("XXS-V", second);
				stripe.makeStripe("XXS-V", third);
				stripe.makeStripe("XSM-V", second);
				stripe.makeStripe("XL-V", first);
				stripe.makeStripe("XS-V", second);
				stripe.makeStripe("XSM-V", first);
				stripe.makeStripe("XXL-V", second);
				stripe.makeStripe("XSM-V", first);
				stripe.makeStripe("XS-V", second);
			}

			var Stripe = function() {
				this.startX = 0;
				this.startY = 0;
				this.Xcollection = [];
				this.Ycollection = [];
				this.multiplier = 2;
			}

			Stripe.prototype.varyWidth = function (original) {
				function getRandomInt(min, max) {
				  return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			
				var min = 0.90 * original;
				var max = 1.15 * original;
			
				return getRandomInt(min, max);
			}

			Stripe.prototype.threadsLookup = [
				{
					"name" : "XXS",
					"number" : 3
				},
				{
					"name" : "XSM",
					"number": 6,
				},
				{
					"name" : "XS",
					"number": 10
				},
				{
					"name" : "S",
					"number": 20
				},
				{
					"name" : "M",
					"number" : 25
				},
				{
					"name" : "L",
					"number" : 40
				},
				{
					"name" : "XL",
					"number" : 100
				}, 
				{
					"name" : "XXL",
					"number" : 125
				}
			];

			Stripe.prototype.makeStripe = function (readWidth, color) {
				var threads, orientation;
				var threadsLookup = this.threadsLookup;
				var cache = readWidth.split("-");
				orientation = cache[1] === "V" ? "vertical" : "horizontal";
				for(var i = 0; i < threadsLookup.length; i++) {
					if (threadsLookup[i].name === cache[0]) {
						threads = this.varyWidth(threadsLookup[i].number);
					}
				}
				var offsetX = 0, offsetY = 0;
			
				if (orientation === "horizontal") {
					this.Xcollection.push(threads * this.multiplier);
					this.startX++;
					for (var k = 1; k < this.Xcollection.length; k++) {
						if (this.Xcollection.length === 1) {
							offsetX = 0;
						} else {
							offsetX += this.Xcollection[k-1];
						}
					}
				} else if (orientation === "vertical") {
					this.Ycollection.push(threads * this.multiplier);
					this.startY++;
					for (var k = 1; k < this.Ycollection.length; k++) {
						if (this.Ycollection.length === 1) {
							offsetY = 0;
						} else {
							offsetY += this.Ycollection[k-1];
						}
					}
				}
			
				function getRandomInt(min, max) {
				  return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			
				var make;
			    var m = this.multiplier;
				for (var j = 0; j<threads; j++) {
					var fix = getRandomInt(1,15);
				
			        if (j%2 === 0) {
			            make = orientation === "vertical" ? new Thread(orientation, 2000, offsetX + 0, offsetY + (j*m)) : new Thread(orientation, 2000, offsetX + (j*m), offsetY +  0);
			        } else {
			            make = orientation === "vertical" ? new Thread(orientation, 2000, offsetX + fix, offsetY + (j*m)) : new Thread(orientation, 2000, offsetX + (j*m), offsetY + fix);   
			        }
					make.defaultDash(color);
			    }
			}

			var Thread = function(direction, length, originX, originY) {
			    this.direction = direction;
			    this.length = length;
			    this.originX = originX;
			    this.originY = originY;
			}

			Thread.prototype.point = function (x, y) {
			    return x + "," + y + ",";
			}

			Thread.prototype.defaultDash = function (color) {
			    var x = this.originX;
			    var y = this.originY;
			    if (this.direction === "vertical") {
			        tr = this.line(this.point(x, y) + this.point(x+this.length, y));
			    }
		    
			    if (this.direction === "horizontal") {
			        tr = this.line(this.point(x, y) + this.point(x, y+this.length));
			    }
			    tr.attr({'stroke-dasharray': '-', 'stroke' : color, 'stroke-width' : 1});
			}

			Thread.prototype.line = function(lines) {
			    return paper.path("M" + lines);
			}

			var mad = new Madras();
			mad.init();
	
		}
	
		
	}
	$(document).ready(function() {
		grungerabbit.init();
	});
}(jQuery));