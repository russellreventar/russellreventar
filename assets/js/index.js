/**
 * Normalize the browser animation API across implementations. This requests
 * the browser to schedule a repaint of the window for the next animation frame.
 * Checks for cross-browser support, and, failing to find it, falls back to setTimeout.
 * @param {function}    callback  Function to call when it's time to update your animation for the next repaint.
 * @param {HTMLElement} element   Optional parameter specifying the element that visually bounds the entire animation.
 * @return {number} Animation frame request.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  function (callback) {
                                    return window.setTimeout(callback, 17 /*~ 1000/60*/);
                                  });
}

/**
 * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec.
 *
 * Cancels an animation frame request.
 * Checks for cross-browser support, falls back to clearTimeout.
 * @param {number}  Animation frame request.
 */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
                                 window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
                                 window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
                                 window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
                                 window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
                                 window.clearTimeout);
}

/* Object that contains our utility functions.
 * Attached to the window object which acts as the global namespace.
 */
window.utils = {};

/**
 * Keeps track of the current mouse position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, event
 */
window.utils.captureMouse = function (element) {
  var mouse = {x: 0, y: 0, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  
  element.addEventListener('mousemove', function (event) {
    var x, y;
    
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x = event.clientX + body_scrollLeft + element_scrollLeft;
      y = event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  
  return mouse;
};

/**
 * Keeps track of the current (first) touch position, relative to an element.
 * @param {HTMLElement} element
 * @return {object} Contains properties: x, y, isPressed, event
 */
window.utils.captureTouch = function (element) {
  var touch = {x: null, y: null, isPressed: false, event: null},
      body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;

  element.addEventListener('touchstart', function (event) {
    touch.isPressed = true;
    touch.event = event;
  }, false);

  element.addEventListener('touchend', function (event) {
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  }, false);
  
  element.addEventListener('touchmove', function (event) {
    var x, y,
        touch_event = event.touches[0]; //first touch
    
    if (touch_event.pageX || touch_event.pageY) {
      x = touch_event.pageX;
      y = touch_event.pageY;
    } else {
      x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
      y = touch_event.clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;
    
    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);
  
  return touch;
};

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean=}      toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
 * @param {number|string} color
 * @param {number}        alpha
 * @return {string}
 */
window.utils.colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === 'string' && color[0] === '#') {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = (alpha === undefined) ? 1 : alpha;
  //parse hex values
  var r = color >> 16 & 0xff,
      g = color >> 8 & 0xff,
      b = color & 0xff,
      a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb("+ r +","+ g +","+ b +")";
  } else {
    return "rgba("+ r +","+ g +","+ b +","+ a +")";
  }
};

/**
 * Determine if a rectangle contains the coordinates (x,y) within it's boundaries.
 * @param {object}  rect  Object with properties: x, y, width, height.
 * @param {number}  x     Coordinate position x.
 * @param {number}  y     Coordinate position y.
 * @return {boolean}
 */
window.utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};

/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
window.utils.intersects = function (rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
};
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
		window.location = "work";
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

function Ball (radius, color) {
  if (radius === undefined) { radius = 40; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.mass = 1;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  //x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Ball.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};
