/*
    @TODO - add pop-ups with explanatory text
*/
var scalingFactor;

function resetPage() {
    document.getElementById("inputArea").style.display = "block";
}

function displayGCF() {
    var firstNum = document.getElementById("firstNum");
    var secondNum = document.getElementById("secondNum");
    var minVal, maxVal;
    var gcf;

    clearReportData();

    minVal = Math.min(firstNum.value, secondNum.value);
    maxVal = Math.max(firstNum.value, secondNum.value);
    scalingFactor = 600 / maxVal;

    createTheGridDiv(minVal, maxVal);
    gcf = calculateGCF(minVal, maxVal);

    addTiles(gcf*scalingFactor);
    document.getElementById("gcf").innerHTML = "Greatest common factor is " + gcf;
}

function calculateGCF(minVal, maxVal) {

    var oldMaxVal, scratchVal;

    while ((maxVal % minVal) !== 0) {
        scratchVal = maxVal % minVal;
        oldMaxVal = maxVal;
        maxVal = minVal;
        minVal = scratchVal;
        showCalc(oldMaxVal, maxVal);
    }
    showCalc(maxVal, minVal);

    return minVal;
}

function createTheGridDiv(minVal, maxVal) {

    var diagram = $("#diagram");

    if (document.getElementById("showMe").checked) {
        diagram.width(maxVal * scalingFactor);
        diagram.height(minVal * scalingFactor);
        diagram.css("display","block");
    } else {
        diagram.css("display","none");
    }
}

function addTiles(finalGcf) {
    var divs = $("#diagram div");
    var compColor;
    var numInnerTiles;

    divs.each(function(ndx, elem) {

        compColor = elem.getAttribute("data-color-complement");
        numInnerTiles = Math.pow(Math.round(elem.clientHeight / finalGcf), 2);

        for (var i=0; i<numInnerTiles; i++) {
            elem.innerHTML += "<div style=\"" +
                                  "width:" + finalGcf + "px;" + 
                                  "height:" + finalGcf + "px;" +
                                  "outline:dashed 1px " + compColor + ";\">" + 
                              "</div>";
        }

    });
}

function showCalc(maxVal, minVal) {

    if ( ! document.getElementById("showMe").checked) {
        return;
    }

    var divDim = Math.floor(maxVal/minVal);
    var divString; 
    var randomColors = new Array(randomRgbComponent(),randomRgbComponent(),randomRgbComponent());
    var randomColor = getRgbColor(randomColors);
    var compColor;
    
    document.getElementById("calculation").innerHTML += maxVal % minVal + " is the remainder when dividing " + maxVal + " by " + minVal + "<br/>";

    for (var i=0; i<3; i++) {
        randomColors[i] = 255 - randomColors[i];
    }
    compColor = getRgbColor(randomColors);
    
    for (var i=0; i<divDim; i++) {
        divString = "<div style=\"" + 
                        "width:" + (minVal*scalingFactor) + "px;" + 
                        "height:" + (minVal*scalingFactor) + "px;" +
                        "background-color:" + randomColor + ";" +
                        "outline:solid 2px " + compColor + ";" +
                    "\" " +
                    "data-color-complement=\"" + compColor + "\">" + 
                    "</div>";
        $("#diagram").append(divString);
    }
}


function getRgbColor(components) {
    return "rgb(" + components[0] + "," + components[1] + "," + components[2] + ")";
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
        displayGCF();
    };
};