var speed;

function setup() {
    createCanvas(1200, 1200);
}

function draw() {
    background(0);
    speed = frameCount/5;

	//sun rendering
    push();
    translate(width/2, height/2);
	rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); // SUN
    pop();
	
	//earth rendering
	push();
	translate(width/2, height/2);
	rotate(radians(speed)); //rotate wrt sun
	translate(300, 300);
	rotate(radians(speed)); //rotate wrt earth
	celestialObj(color(0,0,255), 80); // EARTH
    pop();
	
	//moon rendering
	push();
	translate(width/2, height/2);
	rotate(radians(speed)); //moon rotate wrt sun
	translate(300, 300); 
		
    //##rotate then translate
    rotate(radians(-speed*2)); //moon rotate wrt moon
    translate(100,100);
    
	celestialObj(color(0,150,150), 30); // MOON
	pop();
	
	//2nd satelite of earth rendering
	push();
	translate(width/2, height/2);
	rotate(radians(speed)); //satelite rotate wrt sun
	translate(300, 300); 
	
	rotate(radians(speed*6)); //satelite rotate wrt earth
	translate(50,50);
	celestialObj(color(255,255,255), 30); // satelite
	pop();
	
	//asteroid arround the moon
	push();
	translate(width/2, height/2);
	rotate(radians(speed)); // asteroid rotate wrt sun
	translate(300, 300); 
	rotate(radians(-speed*2)); // asteroid rotate wrt earth
	translate(100,100);
	translate(25,25);
	rotate(radians(speed*6)); // asteroid rotate wrt moon
	celestialObj(color(120,220,150), 15); // 
	pop();
	
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
	
}
