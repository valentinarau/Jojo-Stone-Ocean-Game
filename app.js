let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler,false);
let fps = 60;

let jolyneIdle1 = new Image();
jolyneIdle1.src = "jolyneidle1.png";
let jolyneIdle2 = new Image();
jolyneIdle2.src = "jolyneidle2.png";
let jolyneIdle3 = new Image();
jolyneIdle3.src = "jolyneidle3.png";
let jolyneIdle4 = new Image();
jolyneIdle4.src = "jolyneidle2.png";

let jolyneIdle = [jolyneIdle1,jolyneIdle2,jolyneIdle3,jolyneIdle4];

let p1X = 190;
let p1Y = 105;
let p1FrameCount = 0;
let p1Frame = 0;
let frameSpeed = 8;
let player1State = {state:"jolyneIdle", frames: 4, autoRepeat: false, nextState: "jolyneIdle"};

let leftPressed = false;
let rightPressed = false; 

function keyDownHandler(e){
	if(e.keyCode == 37) leftPressed = true;

	if(e.keyCode == 39) rightPressed = true;
}

function keyUpHandler(e){
	if(e.keyCode == 37) leftPressed = false;

	if(e.keyCode == 39) rightPressed = false;
}

function drawP1(){
	p1FrameCount++;
	if(p1FrameCount % frameSpeed == 0) p1Frame++;
	if(p1Frame >= player1State.frames) {
		p1FrameCount = 0;
		p1Frame = 0;
		if(!player1State.autoRepeat) frameSpeed = 8;
		if(player1State.nextState == "jolyneIdle")
			player1State = {state:"jolyneIdle", frames: 4, autoRepeat: true, nextState: "jolyneIdle"};
	}
	if(player1State.state == "jolyneIdle"){
		ctx.drawImage(jolyneIdle[p1Frame],0,0,50,100,p1X,p1Y,50,100)
	}
}

function controls(){
	if(leftPressed) {if(p1X >= -6) p1X -= 2;}
	else if (rightPressed) {if(p1X <= 470) p1X += 2;}
	else if (!rightPressed && !leftPressed){
		player1State = {state:"jolyneIdle", frames: 4, autoRepeat: true, nextState: "jolyneIdle"};
		if(p1Frame > player1State.frames) p1Frame = 0;	
	}	 
		}


function draw () {
	setTimeout(function() {
	requestAnimationFrame(draw);
	ctx.fillStyle = "rgb(80, 152, 216)";
	ctx.fillRect(0,0,800,600);
	controls();
	drawP1();
   },1000/fps);
}
draw();
