(function($){
	var grungerabbit = {
		"config" : {
			
		},
		"init" : function() {
			var bodyWidth = $("body").width();

			if ($("#gr__header").length > 0) {
				grungerabbit.splashType(bodyWidth);
				grungerabbit.splashTile(bodyWidth);
			} else if ($("#typologyMadras").length > 0) {
				grungerabbit.madras();
			}
		},
		"splashType": function(bodyWidth) {
			$(".splash .title, .name, .play a").lettering();
			var c = "";
			$(".splash .title span").each(function() {
				$(this).append("<em>"+$(this).text()+"</em>");
			});

			if (bodyWidth < 640) {
				$(".splash .title span:nth-child(6)").after("<br> -");
			}
		},
		"splashTile": function(bodyWidth) {
			// {?} adapted from UIUIU wang tiles
			// http://uiuiu.me/projects/wang-tiles.html

			var paper = Raphael("gr__header", bodyWidth, 350);
			var startY = 0;
			var startX = 0;
			var colors = [{color:"#fff"}, {color:"#fff"}, {color:"#D6FFF1"}, {color:"#D6FFF1"}, {color:"#fff"}];

			var tileSet = [
				{"n": 3, "e": 3, "s": 4, "w": 1},
				{"n": 3, "e": 4, "s": 3, "w": 1},
				{"n": 3, "e": 4, "s": 4, "w": 3},
				{"n": 1, "e": 1, "s": 3, "w": 3},
				{"n": 1, "e": 1, "s": 4, "w": 4},
				{"n": 1, "e": 3, "s": 3, "w": 4},
				{"n": 2, "e": 2, "s": 3, "w": 2},
				{"n": 4, "e": 2, "s": 3, "w": 2},
				{"n": 3, "e": 5, "s": 1, "w": 2},
				{"n": 3, "e": 5, "s": 2, "w": 2},
				{"n": 2, "e": 5, "s": 1, "w": 5},
				{"n": 4, "e": 5, "s": 3, "w": 5},
				{"n": 3, "e": 2, "s": 3, "w": 5}
			]
			
			var errorSet = {"n": 1, "e": 1, "s": 1, "w": 1};
			var currentTiles = [];
			
			var Tile = function(originX, originY, breakpoint) {
				this.originX = originX;
				this.originY = originY;
				this.breakpoint = breakpoint;
			};
			
			Tile.prototype.rando = function(min, max) {
				return Math.floor(Math.random() * max + min);
			};
			
			Tile.prototype.drawSquare = function(size) {
				this.size = size;
				var ctL = currentTiles.length;
				this.row = (ctL - (ctL % this.breakpoint));

				if (this.row !== 0) {
					this.originX = this.originX - (this.row * this.size);
				}

				paper.rect(this.originX, this.originY, size, size).attr({'stroke-width': 0});
			};
			
			Tile.prototype.triDirection = function(direction) {
				var arrange, color;
				switch (direction) {
					case "n":
						arrange = "M" + this.originX + "," + this.originY + "L" + (this.originX + (this.size/2)) + "," + (this.originY + (this.size/2)) + "L" + (this.originX + this.size) + "," + (this.originY) + "Z";
						color = this.colorSet.n;
						break;
					case "e":
						arrange = "M" + (this.originX + this.size) + "," + this.originY + "L" + (this.originX + (this.size/2)) + "," + (this.originY + (this.size/2)) + "L" + (this.originX + this.size) + "," + (this.originY + this.size) + "Z";
						color = this.colorSet.e;
						break;
					case "s":
						arrange = "M" + (this.originX + this.size) + "," + (this.originY + this.size) + "L" + (this.originX + (this.size/2)) + "," + (this.originY + (this.size/2)) + "L" + (this.originX) + "," + (this.originY + this.size) + "Z";
						color = this.colorSet.s;
						break;
					case "w":
						arrange = "M" + (this.originX) + "," + (this.originY + this.size) + "L" + (this.originX + (this.size/2)) + "," + (this.originY + (this.size/2)) + "L" + (this.originX) + "," + (this.originY) + "Z";
						color = this.colorSet.w;
						break;
				}
				
				paper.path(arrange).attr({"fill":color, "stroke-width": 0});
			}
			
			Tile.prototype.triangles = function() {
				this.triDirection("n");
				this.triDirection("e");
				this.triDirection("s");
				this.triDirection("w");
			}
			
			Tile.prototype.chooseTile = function() {
				var choice, now, possible = [];
				var ctL = currentTiles.length;
				var last = currentTiles[ctL-1];

				if (ctL === 0) {
					// {?} origin tile
					choice = this.rando(0, tileSet.length);
					now = tileSet[choice];
				} else if (this.row === 0 && ctL !== 0) {
					// {?} any tile in first row except origin
					for (var j = 0; j < tileSet.length; j++) {
						if (tileSet[j].w === last.set.e) {
							possible.push(tileSet[j]);
						}	
					}
				} else if (ctL % this.breakpoint === 0) {
					// {?} first tile of any row except R1
					this.originY += this.size;
					this.originX = startX;
					startY = this.originY;

					for (var k = 0; k < currentTiles.length; k++) {
						if (this.originX === currentTiles[k].originX && this.originY === (currentTiles[k].originY + this.size)) {
							for (var m = 0; m < tileSet.length; m++) {
								if (currentTiles[k].set.s === tileSet[m].n) {
									possible.push(tileSet[m]);
								}
							}
						}
					}
				} else {
					// {?} all other tiles
					if (this.originX - this.size === last.originX && this.originY === last.originY) {
						// check previous row S and current N
						var set2 = [];
						for (var k = 0; k < currentTiles.length; k++) {
							if (this.originX === currentTiles[k].originX && this.originY === (currentTiles[k].originY + this.size)) {
								for (var m = 0; m < tileSet.length; m++) {	
									if (currentTiles[k].set.s === tileSet[m].n) {
										possible.push(tileSet[m]);
									}
								}
							}
						}
						
						// from matching NS pairs, check EW
						for (var q = 0; q < possible.length; q++) {
							if (possible[q].w == last.set.e) {
								set2.push(possible[q]);
							}
						}
						possible = set2;
					}
				}
			
				if (ctL !== 0) {
					var pL = possible.length;
					choice = pL > 1 ? this.rando(0, pL) : 0;
					now = pL !== 0 ? possible[choice] : errorSet;	
					possible.length = 0;
				}
				
				this.set = now;
				currentTiles.push(this);
			};
			
			Tile.prototype.assignColors = function() {
				var obj = {};
				
				for (prop in this.set) {
					var num = parseInt(this.set[prop]) - 1;
					obj[prop] = colors[num].color;
				}
				this.colorSet = obj;
			};

			Tile.prototype.drawTile = function(size) {
				this.drawSquare(size);
				this.chooseTile();
				this.assignColors();
				this.triangles();
			};
			
			function makeBoard(numberTiles, tileSize, breakpoint) {
				for (var i = 0; i < numberTiles; i++) {	
					var square = new Tile((i*tileSize), startY, breakpoint);
					square.drawTile(tileSize);
				}
			}
			
			makeBoard(75, 100, 15);
		},
		"madras": function() {
			// {?} adapted from UIUIU madras
			// http://uiuiu.me/projects/madras.html

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
				var x = 1;
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