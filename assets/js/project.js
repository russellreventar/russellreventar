var nextImgID = 1;
var currImgID = 1;
var gallerySize = 0;
$(window).resize(function(){
	$("#gallery").height($(this).width()/1.85);
	$(".fullscreenImg img:nth-child("+ (currImgID) +")").center();
});
$(document).ready(function(){
	init();
	$(".slider ul li").click(sliderClicked);
	$( "#gallery" ).on( "swiperight", previousImg);
	$( "#gallery" ).on( "swipeleft", nextImg);
	$( ".clickzone").on("click",fullscreenImg);
	$( ".fullscreenImg").on("click", function(){$(this).css("display","none")});

});
function init(){
	gallerySize = $('.slider ul li').length;
	$("#gallery").height($(this).width()/1.85);
	$('.clickzone').height(($('#gallery').height())- ($('.slider').height()));
	changeImg();
}
function fullscreenImg(){
	clearFullscreenImg();
	$('.fullscreenImg').css("display","block");
	$(".fullscreenImg img:nth-child("+ (currImgID) +")").css("display","block");
 	$(".fullscreenImg img:nth-child("+ (currImgID) +")").center();

}
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
function nextImg(){
	if(currImgID == gallerySize){
		nextImgID = 1;
	}else{
		nextImgID+=1;
	}
	changeImg();
}
function previousImg(){
	if(currImgID == 1){
		nextImgID = gallerySize;
	}else{
		nextImgID-=1;
	}
	changeImg();
}

function changeImg(cycle){
	clearSliders();
	clearAnimations();
	clearLabels();
	$(".slider ul li:nth-child(" + (nextImgID ) + ")").css("background-color", "#FFFFFF");
	$(".slider h1:nth-child("+ (nextImgID) +")").css("display","block");
	$("#gallery img:nth-child(" + (nextImgID) + ")").css("zIndex", "2");
	$("#gallery img:nth-child(" + (currImgID) + ")").css("zIndex", "1");

	if((currImgID == 1 ) &&( nextImgID == gallerySize)){
		$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveRight");
	}else if((currImgID == gallerySize ) &&( nextImgID == 1)){
		$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveLeft");
	}else{
		if(currImgID < nextImgID){
			$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveLeft");
		}else{
			$("#gallery img:nth-child(" + (nextImgID) + ")").addClass("moveRight");
		}
	}
	currImgID=nextImgID;
}


function sliderClicked(){
	if(($(this).index() + 1) != currImgID){
		nextImgID = $(this).index() + 1;
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
function clearFullscreenImg(){
	$(".fullscreenImg img").each(function(i) {
 		$(this).css("display", "none");
	});
}
function clearLabels(){
	$(".slider h1").each(function(i){
		$(this).css("display","none");
	});
}