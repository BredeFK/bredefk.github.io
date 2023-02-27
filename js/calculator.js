function getDifference(isChange) {
    let firstValue, secondValue, firstFooter, secondFooter, firstResult, secondResult = ""
    if (isChange) {
        firstValue = "initialValue";
        secondValue = "finalValue";
        firstFooter = "percentageAnswerChange";
        secondFooter = "diffAnswerChange";
        firstResult = "percentageResultChange"
        secondResult = "diffResultChange"
    } else {
        firstValue = "valueA";
        secondValue = "valueB";
        firstFooter = "percentageAnswer";
        secondFooter = "diffAnswer";
        firstResult = "percentageResult"
        secondResult = "diffResult"
    }
    let valueA = parseInt(document.getElementById(firstValue).value);
    let valueB = parseInt(document.getElementById(secondValue).value);


    if (valueA && valueB) {
        let ans = (isChange) ? getChange(valueA, valueB) : getDifference2(valueA, valueB);
        showAnswer(firstFooter, firstResult, "The percentage " + ((isChange) ? "change" : "difference") + " is " + ans);
        showAnswer(secondFooter, secondResult, "The difference is " + Math.abs(valueA - valueB));
    } else {
        hideAnswer(firstFooter);
        hideAnswer(secondFooter);
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

function getDifference2(value1, value2) {
    return +(Math.abs((value1 - value2) / ((value1 + value2) / 2) * 100)).toFixed(2) + "%";
}

function getChange(value1, value2) {
    return (100 * ((value2 - value1) / value1)).toFixed(2) + "%";
}
