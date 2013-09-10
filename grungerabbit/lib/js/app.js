$(".title, .name").lettering();
var c = "";
$(".title span").each(function() {
	
	
	$(this).append("<em>"+$(this).text()+"</em>");
	
	
});

if ($("body").width() < 640) {
	$(".title span:nth-child(6)").after("<br> -");
}
