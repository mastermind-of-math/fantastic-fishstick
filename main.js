function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    });
};

function iden(){
    var image = document.getElementById('captured_img');
    classifier.classify(image, gotResult);
}

function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth = window.speechSynthesis;
    var speakData1 = 'The first prediction is: ' + prediction1;
    var speakData2 = 'The second prediction is: ' + prediction2;
    var speakData3 = 'The third prediction is: ' + prediction3;
    var otter = new SpeechSynthesisUtterance(speakData1 + ". " + speakData2 + ". " + speakData3);
    synth.speak(otter);
}

function gotResult(error, results){
    if (error){
        window.alert(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        prediction3 = results[2].label;
        document.getElementById("pre1").innerText = prediction1;
        document.getElementById("pre2").innerText = prediction2;
        document.getElementById("pre3").innerText = prediction3;
        speak()
        if(prediction1 == "Happy"){
            document.getElementById('pree1').innerHTML = "&#128512";
        } else if(prediction1 == "Sad"){
            document.getElementById('pree1').innerHTML = "&#128542";
        } else if(prediction1 == "Angry"){
            document.getElementById('pree1').innerHTML = "&#128545";
        }
        if(prediction2 == "Happy"){
            document.getElementById('pree2').innerHTML = "&#128512";
        } else if(prediction2 == "Sad"){
            document.getElementById('pree2').innerHTML = "&#128542";
        } else if(prediction2 == "Angry"){
            document.getElementById('pree2').innerHTML = "&#128545";
        }
        if(prediction3 == "Happy"){
            document.getElementById('pree3').innerHTML = "&#128512";
        } else if(prediction3 == "Sad"){
            document.getElementById('pree3').innerHTML = "&#128542";
        } else if(prediction3 == "Angry"){
            document.getElementById('pree3').innerHTML = "&#128545";
        }
    }
}

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#camera');

console.log('ml5 version: ', ml5.version);
var camera = document.getElementById('camera');
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ifrzC3tkk/model.json', modelLoaded);
var prediction1 = null;
var prediction2 = null;
var prediction3 = null;