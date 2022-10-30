var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);
	
 colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here	
	var green = color(0,255,0);
	var red = color(255,0,0);
	var mouseCordX = map(mouseX,0, width,0,1)
	
	noStroke();
	for (var i=0; i<25; i++){
		for (var j=0; j<25; j++){
			
			tx=i *0.05*mouseCordX;
			ty=j *0.05*mouseCordX;
			tz=frameCount*0.05*mouseCordX;

			var n =  noise(tx, ty,tz);
			var colour= lerpColor(green, red,n);
			fill(colour);
			rect(i*stepSize,j*stepSize,stepSize,stepSize);
		}
	}	
}
	///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
	var pink = color(255,189,222);
	var purple = color(98,0,173);
    
    var scalefactor = 0.002;
    var speedfactor = map(mouseX,0,width,1,10);
    
	strokeWeight(3);
	
	for (var i=0; i<25; i++){
		for (var j=0; j<25; j++){
			
            var mouseCordX = i*stepSize+stepSize/2;
            var mouseCordY = j*stepSize;
            
            //multiple frameCount and speedfactor to control the speed
			tx=   (mouseCordX+ frameCount * speedfactor) * scalefactor;
			ty=   (mouseCordY+ frameCount * speedfactor) * scalefactor;
			tz=   (mouseCordX+ frameCount * speedfactor) * scalefactor;

			var n =  noise(tx, ty, tz);
			var angle = map (n, 0,1,0,720);
			var lerpLine = lerpColor(pink, purple,n);
			
			push();	
			stroke(lerpLine);
			translate(mouseCordX,mouseCordY);
			rotate(radians(angle));
			line(0,0,0,15+mouseY*0.05);
			pop();
		}
	}

}
