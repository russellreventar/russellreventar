$(document).ready(function(){
console.log("hi");
// particlesJS("footer", {
// 	particles: {
// 		color: "#454545",
// 		shape: "circle",
// 		opacity: 1,
// 		size: 1,
// 		size_random: false,
// 		nb: 30,
// 		line_linked: {
// 			enable_auto: !0,
// 			distance: 300,
// 			color: "#3B3B3B",
// 			opacity: .6,
// 			width: 1,
// 			condensed_mode: {
// 				enable: !1,
// 				rotateX: 600,
// 				rotateY: 600
// 			}
// 		},
// 		anim: {
// 			enable: true,
// 			speed: 0.5
// 		}
// 	},
// 	interactivity: {
// 		enable: !1,
// 		mouse: {
// 			distance: 200
// 		},
// 		mode: "grab"
// 	},
// 	retina_detect: true
// });


	

	//when core is done loading load entries
	var currPage = getCurentFileName();
		console.log(currPage);
	if(currPage == "index" || currPage == "index.html"){
		console.log(currPage);
	}else if(currPage == "work" || currPage == "work.html" ){
		console.log(currPage);
		initNav(1);
	}else if(currPage == "music" || currPage == "music.html"){
		initNav(2);
	}else if(currPage == "videos" || currPage == "videos.html"){
		initNav(3);
	}else if(currPage == "about" || currPage == "about.html"){
		initNav(0);
		$('#aboutme').css("color","#199AE8");
		$('.contactme').click(function(){window.location = 'mailto:russell.reventar@gmail.com?subject=Hello!'});
	}else{
		
	}
});

function getCurentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function initNav(section){
	
	var compassMargin = 20;
	var guitarMargin = 87;
	var cameraMargin = 154;
	var compassColor = "#D48574";
	var guitarColor = "#8FAECF";
	var cameraColor = "#F7D651";
	var noColor = "#FFFFFF";

	var mleft = 0;
	var color = noColor;
	if(section == 1){
		mleft = compassMargin;
		color = compassColor;
	}else if(section == 2){
		mleft = guitarMargin;
		color = guitarColor;
	}else if(section == 3){
		mleft = cameraMargin;
		color =  cameraColor;
	}
	$('.indicator').css({marginLeft:mleft});
	$('.indicator').css({backgroundColor:color});

  	$('#work').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:compassMargin},70);
		$('.indicator').css({backgroundColor:compassColor});
	});
	$('#music').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:guitarMargin},70);
		$('.indicator').css({backgroundColor:guitarColor});
	});
		$('#videos').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:cameraMargin},70);
		$('.indicator').css({backgroundColor:cameraColor});
	});
  		
	$( ".sections" ).on( "mouseleave", function() {
    	$('.indicator').css({marginLeft:mleft});
		$('.indicator').css({backgroundColor:color});
  	});
}