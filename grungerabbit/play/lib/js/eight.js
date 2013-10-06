(function($) {
	var eight = {
	
		config: {
			container: ".wrapper",
			size: 30,
			multiplier: 120,
			
			color: {
				nyu: "#57068c",
				cu: "#c4d8e2",
				new: "#FF1300"
			},
			
			people : [
				{	name: "anders",
					gender: "M",
					school: "CU",
					x: 1,
					y: 1
				},
				{	
					name: "beth",
					gender: "F",
					school: "CU",
					x: 2,
					y: 1
				},
				{	
					name: "claire",
					gender: "F",
					school: "NYU",
					x: 1,
					y: 2
				},
				{	
					name: "daniel",
					gender: "M",
					school: "NYU",
					x: 2,
					y: 2
				},
				{	
					name: "everett",
					gender: "M",
					school: "New",
					x: 1,
					y: 3
				},
				{	
					name: "fiona",
					gender: "F",
					school: "NYU",
					x: 2,
					y: 3
				},
			]
		},
	
		init: function() {
			vertical = [];
			horizon = [];
			woman = [];
			man = [];
			eight.container = $(eight.config.container);
			paper = Raphael(160, 80, 850, 400);
			eight.size = eight.config.size;
			eight.multiplier = eight.config.multiplier;
			
			var graph = eight.assignMethods();
			graph.setup();
			
			$("a").click( function(e) {
				e.preventDefault();
				var graph = eight.assignMethods($(this).attr("class"));
				graph.sortBy();
			})
		},
	
		assignMethods : function(trigger) {
			function create() {
				var number = eight.config.people.length;
				paper.width = paper.width;
				var moreView = false;
				
				
		
				
		 	    
				for (var i = 0; i < number; i++) {
					var currentPerson = eight.config.people[i];
					var nextPerson = eight.config.people[i+1];
					var nextTwo = eight.config.people[i+2];
					var name = currentPerson.name;
					var school = currentPerson.school;
				
					// account for 0
					var adj = number - 1;
					var adj2 = adj - 1; 
					
					var curX = currentPerson.x * eight.multiplier;
					var curY = currentPerson.y * eight.multiplier;
					
					// except for the last person
					if (i !== adj ) {
						var nextX = nextPerson.x * eight.multiplier;
						var nextY = nextPerson.y * eight.multiplier;
					}
					// generate horizontals
					if (i < adj2) {
						var nextTwoX = nextTwo.x * eight.multiplier;
						var nextTwoY = nextTwo.y * eight.multiplier;
					}
					
					
					
					
					
					var center = eight.size/2;
					
	
				
					// define women
					if (currentPerson.gender == "F") { 
				    woman.push( paper.circle(curX+eight.size/2, curY+eight.size/2, eight.size/2)
				         .attr({fill: "white", stroke: "#000"})
				         .data({"name": name, "school": school})
				         .hover(function () {
				            $(".name").text(this.data("name"));
				         })
						 
					 
					  );
					 }
					 else {
						 woman.push(null);
					 }
					 
					 
					
					 
					 // define men
					if (currentPerson.gender == "M") {
 					 man.push( paper.rect(curX, curY, eight.size, eight.size)
 					 	.attr({fill: "none", stroke: "#000"})
 					 	.data({"name": name, "school": school})
 					 	.hover(function () {
 					 	    $(".name").text(this.data("name"));
 					 	}) );
					}
			 		else {
			 			 man.push(null);
			 		}

				
					
					//draw vertical line (always skip 2)
					if (i < 4) {
						vertical.push( paper.path(["M", curX + center, curY + center*2, "L", nextTwoX + center, nextTwoY])
						.data("id", "vRel" + i) );
					}
					
					//draw horizontal line to next opposite gender
					if (i !== adj) {
					 	if (nextPerson.gender !== currentPerson.gender) {
					 		horizon.push( paper.path(["M", curX + center*2, curY + center, "L", nextX, nextY + center])
							.data("id", "hRel" + i) );
						}
						// account for empty spaces in array
						else {
							horizon.push(null);
						}
					}	
				}
			};
			
			function test(r) {
				var topVertexY = 30;
				
			
				var there;
				paper.circle(15, topVertexY, 15).attr("fill", "green").click(function () {
				    var clr = Raphael.hsb(Math.random(), .6, 1);
				    this.animate(there ? {
				        cx: 15,
				        cy: 15,
				        r: 15,
				        stroke: "#fff",
				        fill: "#fff"
				    } : {
				        cx: 80,
				        cy: 80,
				        r: 15,
				        stroke: clr,
				        fill: clr
				    }, 600, ["bounce", "<>", "elastic", ""][1000]);
				    //there = !there;
				});
			}
			
			function legend() {
				var legendX = 610;
				var legendY = 230;
				var endX = 790;
				
			
				
				
				var key = paper.rect(legendX, legendY, 200, 155).attr({"stroke": "#888"});
				
				var yearLine = paper.path(["M", legendX + 75, legendY + 25, "L", endX, legendY + 25])
					.attr({"stroke": "#888", "stroke-width": 10});
				var year = paper.text(legendX + 35, legendY + 25, "~1 Year")
					.attr({"fill": "#888"});
				
				var monthLine = paper.path(["M", legendX + 75, legendY + 60, "L", endX, legendY + 60])
					.attr({"stroke": "#888", "stroke-width": 1});
				var month = paper.text(legendX + 35, legendY + 60, "~1 Month")
					.attr({"fill": "#888"});
				
				var weekLine = paper.path(["M", legendX + 75, legendY + 95, "L", endX, legendY + 95])
					.attr({"stroke": "#888", "stroke-linejoin": "miter", "stroke-dasharray": "- "});
				var week = paper.text(legendX + 35, legendY + 95, "~1 Week")
					.attr({"fill": "#888"});
				
				var dayLine = paper.path(["M", legendX + 75, legendY + 130, "L", endX, legendY + 130])
					.attr({"stroke": "#888", "stroke-linejoin": "round", "stroke-dasharray": ". "});
				var day = paper.text(legendX + 35, legendY + 130, "~1 Day")
					.attr({"fill": "#888"});
				
				
			}
			
			
			function relDuration(path) {
				if (path) {
					switch (path.data("id")) {
					//b to d
				  	case "vRel1":
						path.attr({"stroke-linejoin": "round", "stroke-dasharray": ". "})
				   		break;
					//d to f
			  		case "vRel3":
			  			path.attr({"stroke-width": 10})
			  			break;
					// a to b
			 		case "hRel0":
						path.attr({"stroke-width": 10})
			    		break;
					// c to d
		  			case "hRel2":
		  				path.attr({"stroke-width": 10})
		  			 	break;
					// e to f
		  			case "hRel4":
		  				path.attr({"stroke-linejoin": "miter", "stroke-dasharray": "- "})
		  				break;
					default:
					  	path.attr({"stroke-width":1})
					}
				}	
			};
			
			function relOKC(path) {
				if (path) {
					switch (path.data("id")) {
					//b to d
				  	case "vRel1":
						path.attr({stroke: "red"})
				   		break;
					//d to f
			  		case "vRel0":
			  			path.attr({stroke: "red"})
			  			break;
					// c to d
		  			case "hRel2":
		  				path.attr({stroke: "red"})
		  			 	break;
					// e to f
		  			case "hRel4":
		  				path.attr({stroke: "red"})
		  				break;
					default:
					  	path.attr({stroke: "black"})
					}
				}	
			};
			
			function setSchool(element) {			 
				if (element != null) {
					if (element.data("school") == "NYU") {
						element.attr({fill: eight.config.color.nyu});
					}
					else if (element.data("school") == "CU") {
						element.attr({fill: eight.config.color.cu});
					}
					else {
						element.attr({fill: eight.config.color.new});
					}
				}
			};
			
			
			function sortPaths() {
				var number = eight.config.people.length;
			
				for (var i = 0; i < number; i++) {
					
					
					if (trigger == "duration") {
						relDuration(horizon[i]);
						relDuration(vertical[i]);
					}
					else if (trigger == "okcupid") {
						relOKC(horizon[i]);
						relOKC(vertical[i]);
					}
					else if (trigger == "school") {
						setSchool(woman[i]);
						setSchool(man[i]);
					}
					else if (trigger == "SOTU") {
						SOTU(horizon[i]);
						SOTU(vertical[i]);
					}
					else {
						reset(horizon[i]);
						reset(vertical[i]);
						
						resetSchool(woman[i]);
						resetSchool(man[i]);
	
						
					}
					
				}
			};
			
			function SOTU(path, element) {
				if (path) {
					switch (path.data("id")) {
					//b to d
				  	case "vRel1":
						path.attr({stroke: "#666", "stroke-width": 2, "stroke-linejoin": "miter", "stroke-dasharray": "-.."})
						
				   		break;
					//c to e
				  	case "vRel2":
				  		path.attr({stroke: "green", "stroke-width": 2})
						var c = paper.image("lib/img/explosion.gif", 230, 295, 50, 50)
				  		break;
					//a to c
			  		case "vRel0":
			  			path.attr({stroke: "green", "stroke-width": 2, "stroke-linejoin": "miter", "stroke-dasharray": "-.."})
						var c = paper.image("lib/img/explosion.gif", 230, 175, 50, 50)
			  			break;
					//d to f
				  	case "vRel3":
				  		path.attr({stroke: "#666", "stroke-width": 10, "stroke-linejoin": "miter", "stroke-dasharray": "."})
				  		
						break;
					// a to b
			  		case "hRel0":
			  			path.attr({stroke: "#666", "stroke-width": 10, "stroke-linejoin": "miter", "stroke-dasharray": "."});
						var c = paper.image("lib/img/explosion.gif", 170, 115, 50, 50)
			  		 	break;
					// c to d
		  			case "hRel2":
		  				path.attr({stroke: "#666", "stroke-width": 10, "stroke-linejoin": "miter", "stroke-dasharray": "."})
						var c = paper.image("lib/img/explosion.gif", 170, 230, 50, 50)
		  			 	break;
					// e to f
		  			case "hRel4":
		  				path.attr({stroke: "#666", "stroke-width": 2, "stroke-linejoin": "miter", "stroke-dasharray": "-.."})
		  				break;
					default:
					  	path.attr({stroke: "black"})
					}
				}	
			}


			function reset(path) {
				if (path) {
	  				path.attr({stroke: "black", "stroke-width": 1, "stroke-dasharray": ""})
				}
			}
			function resetSchool(element) {			 
				if (element != null) {
					
						element.attr({fill: "white"});
				
				}
			};
		
			return {
				setup: function() {
					create();
					legend();
				//	test();
				},
				sortBy: function() {
					sortPaths();
				},
				current: function() {
					SOTU();
				}
			
			}
		}
	}

	$(document).ready( function() {
		eight.init();
	});


})(jQuery);