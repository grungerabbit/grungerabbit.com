$(".title, .name").lettering();
var c = "";
$(".title span").each(function() {

	
	$(this).append("<em>"+$(this).text()+"</em>");
});