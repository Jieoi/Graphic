// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height+30);
	sliderR = createSlider(0, 255, 100);
  	sliderR.position(10, imgIn.height+5);
	sliderA = createSlider(0, 255, 0);
  	sliderA.position(imgIn.width/2, imgIn.height+5);
	
	
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
	textSize(25);
	text('try drag the sliders for additional effect', imgIn.width, imgIn.height+25);
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  	loop();
	//console.log("here")
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(resultImg);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  resultImg = colourFilter(resultImg);
  return resultImg;
}

function borderFilter(resultImg){
	//draw the img onto the buffer
	var tempCanvas = createGraphics(resultImg.width, resultImg.height);
	tempCanvas.image(resultImg,0,0);
	
	//draw a big whith rectangle with round coners arr the img
	tempCanvas.noFill();
	tempCanvas.stroke(255);
	tempCanvas.strokeWeight(20);
	tempCanvas.rect(0,0,resultImg.width,resultImg.height,50);
	//draw another rect to remove small triangles
	tempCanvas.rect(0,0,resultImg.width,resultImg.height);
	
	return tempCanvas;
}

function radialBlurFilter(resultImg){
	for (var x=0; x<resultImg.width;x++){
		for(var y=0;y<resultImg.height;y++){
			
			var pixelIndex = ((resultImg.width*y)+x)*4;
			var oldRed = resultImg.pixels[pixelIndex+0];
			var oldGreen = resultImg.pixels[pixelIndex+1];
			var oldBlue = resultImg.pixels[pixelIndex+2];
			//c[0]=Red, c[1]=Green, c[2]=Blue
			var c = convolution(x,y,matrix,matrix.length,resultImg);
			
			var mouseDist = abs(dist(x,y,mouseX,mouseY));
			var dynBlur = map(mouseDist,100,300,0,1);
			dynBlur = constrain(dynBlur,0,1);
			
			//red
			resultImg.pixels[pixelIndex+0] = c[0]*dynBlur + oldRed*(1-dynBlur);
			//green
			resultImg.pixels[pixelIndex+1] = c[1]*dynBlur + oldGreen*(1-dynBlur);
			//blue
			resultImg.pixels[pixelIndex+2] = c[2]*dynBlur + oldBlue*(1-dynBlur);
		}
	}
	resultImg.updatePixels();
	return resultImg;
}

function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color as an array
    return [totalRed, totalGreen, totalBlue];
}

function darkCorners(resultImg){
	
	var midX = resultImg.width/2;
	var midY = resultImg.height/2;
	var maxDist = abs(dist(midX,midY,0,0));
	
	for (var x=0; x<resultImg.width;x++){
		for (var y=0; y<resultImg.height;y++){
			
			var d = abs (dist(x,y,midX,midY));
			if (d>=300){
				var pixelIndex = ((resultImg.width*y)+x)*4;
				var oldRed = resultImg.pixels[pixelIndex+0];
				var oldGreen = resultImg.pixels[pixelIndex+1];
				var oldBlue = resultImg.pixels[pixelIndex+2];
				var dynlum = 1;
				if (d<=450){
					dynlum = map(d,300,450,1,0.4);
				}else{
					dynlum = map (d,450,maxDist,0.4,0);
				}
				resultImg.pixels[pixelIndex+0] = oldRed*dynlum;				resultImg.pixels[pixelIndex+1] = oldGreen*dynlum;				resultImg.pixels[pixelIndex+2] = oldBlue*dynlum;
			}
		}
	}
	resultImg.updatePixels();
	return resultImg;
}

function sepiaFilter(resultImg){
	imgIn.loadPixels();
	resultImg.loadPixels();
	
	for (var x=0; x<resultImg.width; x++){
		for (var y=0; y<resultImg.height; y++){
			var pixelIndex = ((resultImg.width*y)+x)*4;
			var oldRed = imgIn.pixels[pixelIndex+0];
			var oldGreen = imgIn.pixels[pixelIndex+1];
			var oldBlue = imgIn.pixels[pixelIndex+2];
			
			var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
			var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
			var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);
			
			resultImg.pixels[pixelIndex+0] = newRed;
			resultImg.pixels[pixelIndex+1] = newGreen;
			resultImg.pixels[pixelIndex+2] = newBlue;
			resultImg.pixels[pixelIndex+3] = 255;
		}
	}
	
	resultImg.updatePixels();
	return resultImg;
}

function colourFilter(resultImg){
	//draw the img onto the buffer
	var tempCanvasC = createGraphics(resultImg.width, resultImg.height);
	tempCanvasC.image(resultImg,0,0);
	tempCanvasC.fill(sliderR.value(),0,0,sliderA.value())
	tempCanvasC.rect(0,0,resultImg.width,resultImg.height);
	
	return tempCanvasC;
	
	
	
}