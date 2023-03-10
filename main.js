right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
song_1 = "";
song_2 = "";
left_score = "";
right_score = "";
song1status = "";
song2status = "";

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 350);
canvas.position(470, 280);
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model is loaded.");
}

function gotPoses(results){
    if(results.length > 0)
    {
      left_x = results[0].pose.leftWrist.x;
      left_y = results[0].pose.leftWrist.y;
      right_x = results[0].pose.rightWrist.x;
      right_y = results[0].pose.rightWrist.y;
      left_score = results[0].pose.keypoints[9].score;
      right_score = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 350);
    fill("red");
    stroke("red");
    song1status = song_1.isPlaying();
    song2status = song_2.isPlaying();
    if(left_score > 0.2){
        circle(left_x, left_y, 20);
        song_2.stop();
        if(song1status = "false"){
            document.getElementById("song_name").innerHTML = "Song name: Harry Potter theme song";
            song_1.play();
            song1status = "true";
        }
    }
    if(right_score > 0.2){
        circle(right_x, right_y, 20);
        song_1.stop();
        if(song2status = "false"){
            document.getElementById("song_name").innerHTML = "Song name: Peter Pan theme song";
            song_2.play();
            song2status = "true";
        }
    }
    
}

function play_music(){
if(song1status = "true"){
    song_2.stop();
    song_1.play();
}
else{
    song_1.stop();
    song_2.play();
}
}

function pause_music(){
    song_1.pause();
    song_2.pause();
    song1status = "false";
    song2status = "false";
}