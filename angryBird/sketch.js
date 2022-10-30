// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Composites = Matter.Composites;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
var startTime

////////////////////////////////////////////////////////////
function setup() {
  	canvas = createCanvas(1000, 600);

	engine = Engine.create();  // create an engine
	
	setupGround();

	setupPropeller();

  	setupTower();

	setupSlingshot();

	setupMouseInteraction();
	
	setupTimer();
}
////////////////////////////////////////////////////////////
function draw() {
	background(0);

	Engine.update(engine);

  	drawGround();

	drawPropeller();

  	drawTower();

  	drawBirds();

  	drawSlingshot();
	
	drawTimer();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  	if (keyCode == LEFT_ARROW){
		angleSpeed+=0.01;
		console.log(angleSpeed);
  	}
  	else if (keyCode == RIGHT_ARROW){
    	angleSpeed-=0.01;
		console.log(angleSpeed);
	}
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  	if (key==='b'){
		setupBird();
	}

  //if 'r' reset the slingshot
  	if (key==='r'){
    	removeFromWorld(slingshotBird);
		removeFromWorld(slingshotConstraint);
		setupSlingshot();
  		}
	}
///////////////////////////////////////////////////////////
//timer settings
function setupTimer(){
	startTime = new Date().getTime();
	textSize(40);
}
//////////////////////////////////////////////////////////
function drawTimer(){
	var now = new Date().getTime();
	var diff = now - startTime;
	var secLapse = Math.floor(diff%(1000*60)/1000);
	stroke(255);
	fill(2,200,100);
	if (secLapse < 30){
		text("time used "+secLapse+" sec",10,40);
	}
	else{
		fill(143, 58, 132, 100);
		textAlign(CENTER);
		
		rect(0,0,width,height);
		let t = "You LOSE";
		let y = "You have used more than 30 sec, press R to restart"
		text(t,(width/2)-250,(height/2)-50,(width/2),(height/2)+50);
		text(y,(width/2)-300,(height/2),(width/2)+150,(height/2)+300);
		noFill();
	}
	
}
//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  	setTimeout(() => {
		slingshotConstraint.bodyB = null;
		slingshotConstraint.pointA = { x: 0, y: 0 };
  		}, 
		100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
	var pos = body.position;
  	return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  	World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  	beginShape();
  	for (var i = 0; i < vertices.length; i++) {
    	vertex(vertices[i].x, vertices[i].y);
  	}
  	endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  	push();
  	var offsetA = constraint.pointA;
  	var posA = {x:0, y:0};
  	if (constraint.bodyA) {
		posA = constraint.bodyA.position;
  	}
  	var offsetB = constraint.pointB;
 	var posB = {x:0, y:0};
	if (constraint.bodyB) {
		posB = constraint.bodyB.position;
	}
  	strokeWeight(5);
	stroke(255);
	line(
		posA.x + offsetA.x,
    	posA.y + offsetA.y,
		posB.x + offsetB.x,
		posB.y + offsetB.y
  	);
	pop();
}
