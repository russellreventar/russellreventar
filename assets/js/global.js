$(document).ready(function(){

	// $('#work').click(function(){
	// 	window.location = "work";
	// });
	// $('#music').click(function(){
	// 	window.location = "music";
	// });
	// $('#videos').click(function(){
	// 	window.location = "videos";
	// });
	particlesJS("footer", {
		particles: {
			color: "#454545",
			shape: "circle",
			opacity: 1,
			size: 1.2,
			size_random: false,
			nb: 30,
			line_linked: {
				enable_auto: !0,
				distance: 300,
				color: "#4C4C4C",
				opacity: .6,
				width: 1,
				condensed_mode: {
					enable: !1,
					rotateX: 600,
					rotateY: 600
				}
			},
			anim: {
				enable: true,
				speed: 0.5
			}
		},
		interactivity: {
			enable: !1,
			mouse: {
				distance: 200
			},
			mode: "grab"
		},
		retina_detect: true
	});


	

	//when core is done loading load entries
	var currSection = getSectionName();

	if(currSection == "index" || currSection == "index.html"){

	}else if(currSection == "work" || currSection == "work.html" ){
		initNav(1);
	}else if(currSection == "music" || currSection == "music.html"){
		initNav(2);
	}else if(currSection == "videos" || currSection == "videos.html"){
		initNav(3);
	}else if(currSection == "about" || currSection == "about.html"){
		initNav(0);
		$('#aboutme').css("color","#199AE8");
		$('.contactme').click(function(){window.location = 'mailto:russell.reventar@gmail.com?subject=Hello!'});
	}else{
		
	}
});

function getSectionName(){
	var index = 2;
	var section = $(location).attr('pathname');
	section.indexOf(index);
	section.toLowerCase();
	section = section.split("/")[index];
	return section;
}
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

  	$('#work').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:compassMargin},70);
	});
	$('#music').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:guitarMargin},70);
	});
	$('#videos').on("mouseenter",function(){
		$('.indicator').animate({marginLeft:cameraMargin},70);
	});
  		
	$( ".sections" ).on( "mouseleave", function() {
    	$('.indicator').css({marginLeft:mleft});
  	});
}