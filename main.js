status = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    webcam = createCapture(480, 380);
    webcam.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    object_name = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
}
function gotResult(error,  results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(webcam, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(webcam, gotResult);
        for (i=0; i < objects.length; i++) {
            percent = floor(objects[i].confidence*100);
            fill("#FF0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                webcam.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("object").innerHTML = object_name + " not found";
            }
        }
    }
}
