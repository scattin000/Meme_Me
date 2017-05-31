///DOM Objects///
var video = null;
/*Pulled SC Canvas stuff START HERE */
 var canvas = document.getElementById('canvasPhoto');
// set the size of the canvas image (took forever to figure this out!)
var deviceWidth = window.innerWidth;
var canvasWidth = Math.min(600, deviceWidth - 20);
var canvasHeight = Math.min(480, deviceWidth - 20);
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//canvas.width = 600;
//canvas.height = 400;
var context = canvas.getContext('2d');
context.drawImage(video, 0, 0);
/*Pulled SC Canvas stuff END HERE */


/*START HERE...MC added functionality to canvas...*/
// variables used to get mouse position on the canvas
var $canvas = $("#canvasPhoto");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();
// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;
// an array to hold text objects
var texts = [];
// this var will hold the index of the hit-selected text
var selectedText = -1;

// clear the canvas & redraw all texts
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        context.fillText(text.text, text.x, text.y);
    }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // Put your mousedown stuff here
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}

// done dragging
function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
}

// also done dragging
function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    draw();
}

// listen for mouse events
$("#canvasPhoto").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvasPhoto").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvasPhoto").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvasPhoto").mouseout(function (e) {
    handleMouseOut(e);
});

$("#submit").click(function () {

    // calc the y coordinate for this text on the canvas
    var y = texts.length * 20 + 20;

    // get the text from the input element
    var text = {
        text: $("#canvasPhotoText").val(),
        x: 20,
        y: y
    };

    // calc the size of this text for hit-testing purposes
    context.font = "16px verdana";
    text.width = context.measureText(text.text).width;
    text.height = 16;

    // put this new text in the texts array
    texts.push(text);

    // redraw everything
    draw();

});
/*END HERE MC added functions */

function checkUserMedia() {
    return navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia || null;
}

/*Function displayVideo Only called when camera button is selected  */
function displayVideo() {
    if (checkUserMedia()) {
        //turn off the video 
        //var videoPlaying = false;
        // set video standards 
        var constraints = {
            video: true,
            audio: false
        };
        // set up the video to display 
        var media = navigator.getUserMedia(constraints, function(stream) {
            // URL Object is different in WebKit
            var url = window.URL || window.webkitURL;

            video = document.getElementById("cameraDisplay")
                // try to set up the video size
                // create the url and set the source of the video element
            video.src = url ? url.createObjectURL(stream) : stream

            // Start the video
            video.play()
                //videoPlaying = true;
                // third parameter (error handling)
        }, function(error) {
            console.log("ERROR")
            console.log(error)
        });
    }
} // end displayVideo

function displayPhoto() {
    //capturePhoto()
    transitionDisplay()
}

// function capturePhoto() {
//     var canvas = document.getElementById('canvasPhoto');
//     // set the size of the canvas image (took forever to figure this out!)
//     var deviceWidth = window.innerWidth;
//     var canvasWidth = Math.min(600, deviceWidth - 20);
//     var canvasHeight = Math.min(480, deviceWidth - 20);

//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;
//     //canvas.width = 600;
//     //canvas.height = 400;
//     var context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0);

//     /*START HERE...MC added functionality to canvas...*/
//     // variables used to get mouse position on the canvas
//     var $canvas = $("#canvasPhoto");
//     var canvasOffset = $canvas.offset();
//     var offsetX = canvasOffset.left;
//     var offsetY = canvasOffset.top;
//     var scrollX = $canvas.scrollLeft();
//     var scrollY = $canvas.scrollTop();
//     // variables to save last mouse position
//     // used to see how far the user dragged the mouse
//     // and then move the text by that distance
//     var startX;
//     var startY;

//     // an array to hold text objects
//     var texts = [];

//     // this var will hold the index of the hit-selected text
//     var selectedText = -1;

// }

function transitionDisplay() {
    // set the video to opaque & set the canvas to transparent 
    //swap the video for the picture
    document.getElementById("cameraDisplay").style.opacity = 0
    document.getElementById("canvasPhoto").style.opacity = 1
}


c

///////////////////////////////////////
///////RETIRED CODE/////////////////////
//////////////////////////////////////
/*Show Video Function 
function showVideo() {
    // transition rather than hide & show to remove odds of jarring 
       // document.getElementById("cameraDisplay").style.height = "200px"
    document.getElementById("cameraDisplay").style.height = "500px"
}

function hideVideo() {
    // document.getElementById("cameraDisplay").style.height = "0px"
    document.getElementById("cameraDisplay").style.height = "0px"
}*/

