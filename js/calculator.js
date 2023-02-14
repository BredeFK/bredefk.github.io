function getDifference() {
    let valueA = parseInt(document.getElementById("valueA").value);
    let valueB = parseInt(document.getElementById("valueB").value);

    if (valueA && valueB) {
        let ans = +(Math.abs((valueA - valueB) / ((valueA + valueB) / 2) * 100)).toFixed(2) + "%";
        showAnswer("percentageAnswer", "percentageResult", "The percentage difference is " + ans);
        showAnswer("diffAnswer", "diffResult", "The difference is " + Math.abs(valueA - valueB));
    } else {
        hideAnswer("percentageAnswer");
        hideAnswer("diffAnswer");
    }
}

function showAnswer(footerId, resultId, resultText) {
    let footer = document.getElementById(footerId);
    let result = document.getElementById(resultId);

    footer.classList.remove("hideElement");
    result.innerText = resultText;
}

function hideAnswer(footerId) {
    let footer = document.getElementById(footerId);
    footer.classList.add("hideElement");
}

