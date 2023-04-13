// console.log(handTrack);

const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");

let model;

const options = {
    //上下左右反転阻止
    flipHorizonal: false,
    //face + Hand = 3つ判定
    maxNumBoxes: 3,
    //閾値
    scoreThreshold: 0.7,
}

let context = canvas.getContext("2d");

//loadingされた場合に操作（非同期処理）
handTrack.load(options).then(function(modelData) {
    model = modelData;
    console.log(model);

    //webカメラを起動する
    handTrack.startVideo(video).then(function (satus) {
        if(satus) {
            startDetection();
        }
    })
})

function startDetection() {
    model.detect(video).then((predictions) => {
        model.renderPredictions(predictions, canvas, context, video)
        requestAnimationFrame(startDetection);
    })
}