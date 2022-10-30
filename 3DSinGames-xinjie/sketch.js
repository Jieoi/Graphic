//step 7
var speed_slider;
var height_slider;

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800,-600,800,0,0,0,0,1,0);
    angleMode(DEGREES);
	
	//step 5
    confLocs = [];
    confTheta = [];
	
	for(var i=0; i<200; i++) {
        var r_x = random(-500,500);
        var r_y = random(-800,0);
        var r_z = random(-500,500);
        var r_v = createVector(r_x,r_y,r_z);
        confLocs.push(r_v);
        var r_a = random(0,360);
        confTheta.push(r_a);
    }
	
	//draw the slider for speed
	speed_slider = createSlider(0, 10, 5);
    speed_slider.position(10, 10);
	
	//draw the slider for height
	height_slider = createSlider(0, 100, 0);
    height_slider.position(10, 30);
}

function draw() {
	//step 7 light
	let locX = mouseX - height / 2;
  	let locY = mouseY - width / 2;
	pointLight(25, 110, 190, locX, locY, 100);
	pointLight(250, 50, 30, locX, locY, 100);
	pointLight(233, 10, 190, locX, locY, 100);
	pointLight(50, 160, 100, locX, locY, 100);
	ambientLight(60, 60, 60);
	
    background(255);
    angleMode(DEGREES);
	
	// Step 4
    var xLoc = cos(frameCount)*height;
    var zLoc = sin(frameCount)*height;
    camera(xLoc,-600,zLoc,0,0,0,0,1,0);
	
	// Step 2
    //normalMaterial(); //step 2 material
	ambientMaterial(250);//step 7 different material
    stroke(0);
    strokeWeight(2);
	
	// Step 1
    for(var x=-400; x<=400; x+=50) {
        for(var z=-400; z<=400; z+=50) {
            push();
            translate(x,0,z);
			// Step 3
            var distance = dist(0,0,x,z);
            var value = speed_slider.value();
			var add_height = height_slider.value();
            var length = map(sin(distance+frameCount*value),-1,1,100,300);
            box(50,length+add_height,50);
            pop();
        }
    }
	
	confetti()
}

//step 5 (function)
function confetti() {
    for(var i=0; i<confLocs.length; i++) {
        push();
		
		var confL = confLocs[i];
		translate(confL.x,confL.y,confL.z);
        rotateX(confTheta[i]);
        plane(15,15);

		//step 6
        confL.y+=1;
        confTheta[i]+=10;

        if(confL.y>0) {
            confL.y = -800;
        }

        pop();
    }
}