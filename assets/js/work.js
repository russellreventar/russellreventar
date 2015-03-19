$(window).resize(function(){
	scaleWorkTile();
});

$(document).ready(function(){
	// scaleWorkTile();
});

function scaleWorkTile(){
	$('.worktile').height($('.worktile').width() /1.5);
}