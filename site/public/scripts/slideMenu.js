var isMoving = false;
var setTab = 0;
var windowWidth = 1018;
var easeType = "easeOutSine";


$(document).ready(function () {
	$("#slide-tabs a").click(function(event) {
		event.preventDefault();
		var curTab = $(this).attr("href");
		if(curTab != setTab && isMoving == false){
			$("#slide-tabs").find("a.selected").removeClass("selected");
			$(this).addClass("selected");
			performSlide(curTab);
		}
	})
});
function performSlide(index){
		var multiplier = 900*Math.abs(index-setTab);
		isMoving = true;
		setTab = index;
		var endPos = -index * windowWidth;
		$("#slide-container").animate( { left:endPos.toString()}, multiplier, easeType, finishedEasing );
}
function finishedEasing(event){
	isMoving = false;
}