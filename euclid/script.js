var scalingFactor;

function resetPage() {
    document.getElementById("inputArea").style.display = "block";
}

function calculateGCF() {
    var firstNum = document.getElementById("firstNum");
    var secondNum = document.getElementById("secondNum");
    var minVal, maxVal, scratchVal;
    var diagram = $("#diagram");

    clearReportData();

    minVal = Math.min(firstNum.value, secondNum.value);
    maxVal = Math.max(firstNum.value, secondNum.value);
    scalingFactor = 600 / maxVal;

    if (document.getElementById("showMe").checked) {
        diagram.width(maxVal * scalingFactor);
        diagram.height(minVal * scalingFactor);
        diagram.css("display","block");
    }

    while ((maxVal % minVal) !== 0) {
        scratchVal = maxVal % minVal;
        oldMaxVal = maxVal;
        maxVal = minVal;
        minVal = scratchVal;
        showCalc(oldMaxVal, maxVal);
    }
    showCalc(maxVal, minVal);
    document.getElementById("gcf").innerHTML = "Greatest common factor is " + minVal;
}

function showCalc(maxVal, minVal) {
    if (document.getElementById("showMe").checked) {
        document.getElementById("calculation").innerHTML += maxVal % minVal + " is the remainder when dividing " + maxVal + " by " + minVal + "<br/>";
        var divDim = Math.floor(maxVal/minVal);
        var randomColor = getRandomColor();
        for (var i=0; i<divDim; i++) {
            $("#diagram").append("<div style=\"width:" + (minVal*scalingFactor) + "px;height:" + (minVal*scalingFactor) + "px;background-color:" + randomColor + "\">" + /*minVal + "x" + minVal + */"</div>");
        }
    }
}

function getRandomColor() {
    return "rgb(" + randomRgbComponent() + "," + randomRgbComponent() + "," + randomRgbComponent() + ")";
}

function randomRgbComponent() {
    return Math.floor(Math.random() * (255 - 0));
}

function clearReportData() {
    document.getElementById("gcf").innerHTML = "";
    document.getElementById("calculation").innerHTML = "";
    document.getElementById("diagram").innerHTML = "";
}

window.onload =  function () {
    document.getElementById("submit").onclick = function () {
        calculateGCF();
    };
};