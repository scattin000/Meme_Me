///DOM Objects///
var video = null;
//sizing variables
var deviceWidth = window.innerWidth;

//canvas size 
var canvasWidth = Math.min(480, deviceWidth - 20);;
var canvasHeight = Math.min(480, deviceWidth - 20);;
//video size
var videoWidth = Math.min(600, deviceWidth - 20);
var videoHeight = Math.min(480, deviceWidth - 20);


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
            video.width = videoWidth;
            video.height = videoHeight;
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
    capturePhoto()
    transitionDisplay()
}

function capturePhoto() {
    var canvas = document.getElementById('canvasPhoto');

    // set the size of the canvas image (took forever to figure this out!)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var context = canvas.getContext('2d');
    // trying to fix the problems with taking the photo
    context.drawImage(video, 0, 0, videoHeight, videoWidth);
}

function transitionDisplay() {
    // set the video to opaque & set the canvas to transparent 
    //swap the video for the picture
    document.getElementById("cameraDisplay").style.opacity = 0
    document.getElementById("canvasPhoto").style.opacity = 1
}
function createInputTextBox() {
    //create text input box
    var addText = document.createElement("INPUT");
    addText.setAttribute("type", "text");
    document.getElementById("myText").maxLength = "30";
}

function moveTextInputBox() {
    //Enable user to move textBox on captured photo
}


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

