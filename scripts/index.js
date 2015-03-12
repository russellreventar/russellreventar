$(window).resize(function(){
	adjustMain();
	
});
function adjustMain(){
	var m = $('#header').height() + $('#footer').height();
   	$('#menu').height( $(window).height() - m );
}
$(window).load(function() {
	adjustMain();
/*
	$('#welcome').fadeOut();
	$('#mainmenu').fadeIn();
	$('#big-header').fadeIn();
	$('.footer').fadeIn();
*/
		

setTimeout(function(){
	$(".dev-img").addClass("slideUp");
	$(".dev-text").typed({
    	strings: ["_Development"],
        typeSpeed: 10,
        callback: function(){

        	$("#typed-cursor").remove();

        	setTimeout(function(){
	        	$(".art-text").fadeIn(600);
				$(".art-img").addClass("slideUp");
	        }, 400);
	        
	        	setTimeout(function(){
		$('#welcome').fadeOut(400);
		$('#menu').fadeIn(300);
		$('#header').fadeIn(300);
		$('#footer').css("opacity",1);
	/*
	setTimeout(function(){
			$('#menu').css("background-image","linear-gradient(0deg, rgba(0,0,0,0.00) 3%, rgba(0,0,0,0.51) 100%)");
			},200);
*/
	}, 2500);
        }
	});
	}, 1000);
	
});




$(document).ready(function(){
	
	var panelOptions = {
      $menu: false,
      menuSelector: 'a',
      panelSelector: '> section',
      namespace: '.panelSnap',
      onSnapStart: function(){},
      onSnapFinish: function(){},
      onActivate: function(){},
      directionThreshold: 50,
      slideSpeed: 300,
      easing: 'linear',
      offset: 0,
      keyboardNavigation: {
        enabled: true,
        nextPanelKey: 40,
        previousPanelKey: 38,
        wrapAround: true
      }
    };
    

    
    var halfWidth = $('#welcome > .split-half').width();
    var halfHeight = $('#welcome > .split-half').height();
	var devCoords = [ [halfWidth-10,halfHeight-3],
						[3,75]];
	var artCoords = [ [10,halfHeight-3],[halfWidth-3,75]];
	var devParticleOptions = {
		element : "dev-canvas",
		width : halfWidth,
		height : halfHeight,
		numParticles : 6,
		presetParticles : devCoords,
		minDistance : halfWidth/ 1.5,
		spring : 0,
		ballDiameter : 1.5,
		deceleration : 5,
		ballColor : "#FFFFFF",
		lineColor : "#AEAEAE"
	};
	
	var artParticleOptions = {
		element : "art-canvas",
		width : halfWidth,
		height : halfHeight,
		numParticles : 6,
		presetParticles : artCoords,
		minDistance : halfWidth / 1.5,
		spring : 0,
		ballDiameter : 1.5,
		deceleration : 5,
		ballColor : "#FFFFFF",
		lineColor : "#AEAEAE"
	};

	
	addParticles(devParticleOptions);
	addParticles(artParticleOptions);
	


	



	
	$(".col:nth-child(1)").click(function() { 
		setTimeout(function(){window.location = "work.html";}, 100);
   		
   	}); 
   	
   	$(".col:nth-child(2)").click(function() { 
   		window.location = "music";
   	}); 
   	
   	$(".col:nth-child(3)").click(function() { 
   		window.location = "videos";
   	}); 

	$(".col:nth-child(1)").hover(function(){
		$('#compass-left').addClass("swingCompass-left");
		$('#compass-right').addClass("swingCompass-right");
	}, function(){
		$('#compass-left').removeClass("swingCompass-left");
		$('#compass-right').removeClass("swingCompass-right");
	});
	
	$(".col:nth-child(2)").hover(function(){
		$('#guitar').addClass("swingGuitar");
	}, function(){
		$('#guitar').removeClass("swingGuitar");
	});
	
	$(".col:nth-child(3)").hover(function(){
		$('#camera-head').addClass("moveCamera");
	}, function(){
		$('#camera-head').removeClass("moveCamera");
	});

/*
	$(document).scroll(function(){
		var b=-(($(window).scrollTop()/3));
		var a="center "+b+"px";$(".topPanel").css({
			backgroundPosition:"center "+b+"px"})
	})
*/
});

function addParticles(options) {

	var canvas = document.getElementById(options.element),
		context = canvas.getContext('2d'),
		particles = [],
		numParticles = options.numParticles,
		minDist = options.minDistance,
		springAmount = options.spring,
		ballD = options.ballDiameter,
		canvasWidth = options.width,
		canvasHeight =options.height,
		deceleration=1,
		presetParticles,
		presetParticlesLength = 0;
	
	
	if (window.devicePixelRatio > 1) {
		
		canvas.width = canvasWidth * window.devicePixelRatio;
		canvas.height = canvasHeight * window.devicePixelRatio;
		canvas.style.width = canvasWidth + "px";
		canvas.style.height = canvasHeight + "px";
		context.scale(window.devicePixelRatio, window.devicePixelRatio);
	}else{
		canvas.width = canvasWidth * window.devicePixelRatio;
		canvas.height = canvasHeight * window.devicePixelRatio;
		canvas.style.width = canvasWidth + "px";
		canvas.style.height = canvasHeight + "px";

	}
	
	if(options.hasOwnProperty('deceleration')){
		deceleration = options.deceleration;
	}

	if(options.hasOwnProperty('presetParticles')){
		for (var i in options.presetParticles) {
			if (options.presetParticles.hasOwnProperty(i))
				presetParticlesLength++;
		}
		presetParticles = options.presetParticles;
	}

	for (var particle, i = 0; i < presetParticlesLength; i++) {
			
		particle = new Ball(0, options.ballColor);
		particle.x = presetParticles[i][0];
		particle.y = presetParticles[i][1];
		particle.vx = 0;
		particle.vy = 0;
		particles.push(particle);

	}


	for (var particle, i = 0; i < numParticles-presetParticlesLength; i++) {
		particle = new Ball(ballD, options.ballColor);
		particle.x = randBetween(ballD*2,canvasWidth-(ballD*2));
		particle.y = randBetween(ballD*2,canvasHeight-(ballD*2));
		particle.vx = randBetween(-1,1)/deceleration;
		particle.vy = randBetween(-1,1)/deceleration;
		particles.push(particle);
	}


	function spring(partA, partB) {
		var dx = partB.x - partA.x,
			dy = partB.y - partA.y,
			dist = Math.sqrt(dx * dx + dy * dy);
		if (dist < minDist) {
			var alpha = 1 - dist / minDist;
			context.strokeStyle = utils.colorToRGB(options.lineColor, alpha);
			context.beginPath();
			context.moveTo(partA.x, partA.y);
			context.lineTo(partB.x, partB.y);
			context.stroke();
			var ax = dx * springAmount,
				ay = dy * springAmount;
			partA.vx += ax;
			partA.vy += ay;
			partB.vx -= ax;
			partB.vy -= ay;
		}
	}

	function move(partA, i) {
		partA.x += partA.vx;
		partA.y += partA.vy;
		if (partA.x > canvasWidth - (ballD+1)) {
			partA.vx = -partA.vx;
		} else if (partA.x < ballD) {
			partA.vx = -partA.vx;
		}
		if (partA.y > canvasHeight - (ballD+1)) {
			partA.vy = -partA.vy;
		} else if (partA.y < ballD) {
			partA.vy = -partA.vy;
		}
		for (var partB, j = i + 1; j < numParticles; j++) {
			partB = particles[j];
			spring(partA, partB);
		}
	}

	function draw(particle) {
		particle.draw(context);
	}

	(function drawFrame() {
		window.requestAnimationFrame(drawFrame, canvas);
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		particles.forEach(move);
		particles.forEach(draw);
	}());
	
	function randBetween(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
