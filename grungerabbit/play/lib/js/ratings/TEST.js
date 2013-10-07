var year = "???";
var pricetest = function(multiplier) {return (Math.floor(Math.random() * multiplier))+1};





var itemData = {
	year: year,                    

	
	items : [
	{ title: 'Everything Goes My Way', creator: 'Metronomy', series: 'The English Riviera', category: 'music', subcategory: 'song', year: 2011, rate: [ {rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)), reviewer: 'The Village Voice', comment: 'summery fizzy pop'}  ],price: pricetest(40) },
	{ title: 'Sutphin Boulevard', creator: 'Blood Orange', series: 'Coastal Grooves', category: 'music', subcategory: 'song', price: pricetest(10) },
	{ title: 'Manatee', creator: 'Ted Berrigan and Ron Padgett', series: 'Bean Spasms', category: 'book', subcategory: 'poem', year: 2012, rate: [ {rating: 7, reviewer: 'Clayton', comment: 'is good'}  ],price: 39.95 },

		/*{ 	title: "Everything Goes My Way",
			creator: "Metronomy",
			series: "The English Riviera",
		
			rate: [
				{
		    		rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "The Village Voice",
					comment: "summery, fizzy pop"
				}
			],
			price: pricetest(40)
		},
		{ 	title: "Sutphin Boulevard",
			creator: "Blood Orange",
			series: "Coastal Grooves",
			rate: [
				{
					rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "Pitchfork"
				}
			],
			price: pricetest(30)
		},
		{
			title: "Irreplaceable",
			creator: "Beyonce",
			series: "B'Day",
			year: 2007,
            price: pricetest(40)
		},
		{ 	title: "Figures",
			creator: "The Whitest Boy Alive",
			series: "Dreams",
			rate: [
				{
					rating: parseInt(Math.ceil((Math.random())  * (10 - 0) + 0)),
					reviewer: "Nerve"
				}
			],
			price: pricetest(20)
		},
		{
			title: "Starling, Tiger, Fox",
			creator: "HOTEL MEXICO",
			series: "HIS JEWELLED LETTER BOX",
			year: 2011
		},
    
    
        { 	title: "Friend Crush",
			creator: "Friends",
			series: "Manifest",
			rate: [
				{
		    		rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "L Magazine",
					comment: "flirty as eff"
				}
			],
			price: pricetest(40)
		},
    
        { 	title: "Try to Be",
			creator: "Blue Hawaii",
			series: "Untogether",
			year: 2013,
			rate: [
				{
		    		rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "Stereogum"
				}
			],
             price: pricetest(20)
		},
        { 	title: "Hold My Breath",
			creator: "Holy Ghost!",
			series: "Holy Ghost!",
			year: 2011,
		
			rate: [
				{
		    		rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "Pitchfork"
				}
			],
			price: pricetest(40)
		},
        { 	title: "Midnight Lover",
			creator: "Kisses",
			series: "The Heart of the Nightlife",
			year: 2010,
		
			rate: [
				{
		    		rating: parseInt(Math.ceil((Math.random())  * (10 - 1) + 1)),
					reviewer: "Flavorpill"
				}
			],
            // price: pricetest(40)
		},

        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",
		
			rate: [
				{
		    		rating: 1,
					reviewer: "Test"
				}
			],
			price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",
		
			rate: [
				{
		    		rating: 2,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 3,
					reviewer: "Test"
				}
			],
            // price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 4,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 5,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 6,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 7,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 8,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 9,
					reviewer: "Test"
				}
			],
             price: 5
		},
        { 	title: "Test",
			creator: "Test",
			series: "Test",
			year: "test",

			rate: [
				{
		    		rating: 10,
					reviewer: "Test"
				}
			],
             price: 5
		},*/
		// END OBJECT ARRAY
	]
};




var itemTemplate = "\
{{#items}}\
<div class='reviews {{category}} {{subcategory}}'>\
	{{#price}}\
		<div class=\"price\"><h6>${{price}}</h6></div>\
	{{/price}}\
	{{#rate}}\
		<h5>{{reviewer}} says</h5>\
		<h2>{{title}} <span class=\"rating\">{{rating}}</span></h2>\
		<em>{{comment}}</em>\
	{{/rate}}\
	{{^rate}}\
		<h5>No one has rated</h5>\
		<h2>{{title}}</h2>\
		<a href=\"#\" class=\"right\">add review now</a><br>\
		<h5 class=\"right\">...yet!</h5>\
	{{/rate}}\
	<div class=\"info\">\
	{{creator}} <div class=\"pull-right\">{{category}} &bull; {{subcategory}}</div>\ <br>{{series}} <div class=\"pull-right\">{{year}}</div>\
	</div>\
</div>\
{{/items}}";


var itemOutput = Mustache.to_html(itemTemplate, itemData);
$('#friend').html(itemOutput);

