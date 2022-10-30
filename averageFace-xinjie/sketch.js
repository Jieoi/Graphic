var imgs = [];
var avgImg;
var numOfImages = 30;
var imgOut;
var loadCounter = 0;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
     for(var i =0 ; i<numOfImages ; i++)
     {
         imgs.push(loadImage("assets/" + i + ".jpg", imageloadedSuccess));
     }
}
//////////////////////////////////////////////////////////
function setup() {
    imgOut = imgs[0];
    
	//create a blank image to store RGB value
    avgImg = createGraphics(imgs[0].width,imgs[0].height);
    
    pixelDensity(1);
    
    createCanvas(imgOut.width*2, imgOut.height);
}

//function to update the load counter
function imageloadedSuccess()
{
    loadCounter++;
    console.log(loadCounter);
    console.log("images loaded successfully");
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgOut,0,0);
    
    // show not ready when not all img are loaded
    if(loadCounter != numOfImages)
        {
            console.log("Not Ready");
            return         
        }
    
    //load the pixels of all images in the array
    for(var i =0 ; i<imgs.length ; i++)
        {
            imgs[i].loadPixels();
        }
    avgImg.loadPixels();
    
    //each row
    for(var y =0 ; y<imgOut.height ; y++)
        {
            //each col
            for(var x =0 ; x<imgOut.width ; x++)
                {
                    var pixelIndex = (imgOut.width * y + x)*4;
					//compute the avg RGB for each pixel for all img
                    var sumR = 0 ;
                    var sumG = 0 ;
                    var sumB = 0 ;
					
					//go to each img in imgs to get RGB value for the particular pixel
                    for(var i=0 ; i<imgs.length ; i++)
                        {
							var img = imgs[i];
                            sumR+=img.pixels[pixelIndex];
                            sumG+=img.pixels[pixelIndex+1];
                            sumB+=img.pixels[pixelIndex+2];
                        }
                    avgImg.pixels[pixelIndex]=sumR/imgs.length;
                    avgImg.pixels[pixelIndex+1]=sumG/imgs.length;
                    avgImg.pixels[pixelIndex+2]=sumB/imgs.length;
                    avgImg.pixels[pixelIndex+3]=255;
                }
        }
	
	//update the changes
    avgImg.updatePixels();
    image(avgImg,imgOut.width,0);
    noLoop();
}



