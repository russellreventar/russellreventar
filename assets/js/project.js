var nextImgID = 1;
var currImgID = 1;
$(document).ready(function(){
	changeImg();
	$(".slider ul li").click(sliderClicked);






});

function changeImg(){
	clearSliders();
	clearAnimations();
	clearLabels();
	$(".slider ul li:nth-child(" + (nextImgID ) + ")").css("background-color", "#FFFFFF");
	$(".slider h1:nth-child("+ (nextImgID) +")").css("display","block");
	$("#gallery img:nth-child(" + (nextImgID) + ")").css("zIndex", "2");
	
	if(currImgID < nextImgID){
		$("#gallery img:nth-child(" + (currImgID) + ")").css("zIndex", "1");
		$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveLeft");
	}else{
		$("#gallery img:nth-child(" + (currImgID) + ")").css("zIndex", "1");
		$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveRight");
	}

	currImgID=nextImgID;

}
function sliderClicked(){
	if(($(this).index() + 1) != currImgID){
		nextImgID = $(this).index() + 1;
		console.log("clicked" + $(this).index());
		changeImg();
	}
}

function clearSliders(){
	$(".slider ul li").each(function(i) {
 		$(this).css("background-color", "none");
	});
}
function clearAnimations(){
	$("#gallery img").each(function(i) {
 		$(this).removeClass("moveLeft moveRight");
 		$(this).css("zIndex", "0");

	});

}

function clearLabels(){
	$(".slider h1").each(function(i){
		$(this).css("display","none");
	});
}