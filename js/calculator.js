const WALKING_STEP_LENGTH = 0.78;
const RUNNING_STEP_LENGTH = 1.05;
const EMPTY = "–";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".calc-page input").forEach(input => {
        input.addEventListener("input", () => {
            formatInput(input);
            updateAll();
        });
    });
});

function formatInput(input) {
    const allowDecimals = "decimals" in input.dataset;
    const allowNegative = "negative" in input.dataset;

    const beforeCaret = input.value.slice(0, input.selectionStart);
    const charsBeforeCaret = beforeCaret.replaceAll(/[^\d.,-]/g, "").length;

    let raw = input.value.replaceAll(",", ".").replaceAll(/[^\d.-]/g, "");
    const isNegative = allowNegative && raw.startsWith("-");
    raw = raw.replaceAll("-", "");

    const [integerPart, ...fractionParts] = raw.split(".");
    const hasDecimalPoint = allowDecimals && fractionParts.length > 0;
    const grouped = groupThousands(integerPart);

    const formatted = (isNegative ? "-" : "") + grouped + (hasDecimalPoint ? "." + fractionParts.join("") : "");
    if (formatted === input.value) {
        return;
    }
    input.value = formatted;

    let caret = 0;
    let seen = 0;
    while (caret < formatted.length && seen < charsBeforeCaret) {
        if (formatted[caret] !== " ") {
            seen++;
        }
        caret++;
    }
    input.setSelectionRange(caret, caret);
}

function groupThousands(digits) {
    return digits && new Intl.NumberFormat("no-NO").format(BigInt(digits)).replaceAll(/\s/g, " ");
}

function readNumber(id) {
    const input = document.getElementById(id);
    const value = input.value.replaceAll(" ", "");
    return value === "" || value === "-" ? Number.NaN : Number.parseFloat(value);
}

function updateAll() {
    updateStepsToKm();
    updateKmToSteps();
    updatePercentageChange();
    updateAddSubtractPercentage();
}

function updateStepsToKm() {
    const steps = readNumber("stepsValue");
    const valid = steps > 0;
    setResult("walkingKm", valid ? formatNumber(steps * WALKING_STEP_LENGTH / 1000, 2) + "\u00a0km" : EMPTY);
    setResult("runningKm", valid ? formatNumber(steps * RUNNING_STEP_LENGTH / 1000, 2) + "\u00a0km" : EMPTY);
}

function updateKmToSteps() {
    const kilometers = readNumber("kmValue");
    const valid = kilometers > 0;
    setResult("walkingSteps", valid ? formatNumber(Math.round(kilometers * 1000 / WALKING_STEP_LENGTH)) : EMPTY);
    setResult("runningSteps", valid ? formatNumber(Math.round(kilometers * 1000 / RUNNING_STEP_LENGTH)) : EMPTY);
}

function updatePercentageChange() {
    const initial = readNumber("initialValue");
    const final = readNumber("finalValue");
    if (Number.isNaN(initial) || Number.isNaN(final)) {
        setResult("changePercent", EMPTY);
        setResult("changeDiff", EMPTY);
        return;
    }
    setResult("changeDiff", formatNumber(Math.abs(final - initial), 0, 2));

    if (initial === 0) {
        setResult("changePercent", EMPTY);
        return;
    }
    const change = 100 * (final - initial) / Math.abs(initial);
    const sign = change > 0 ? "+" : "";
    setResult("changePercent", sign + formatNumber(change, 0, 2) + "\u00a0%");
}

function updateAddSubtractPercentage() {
    const value = readNumber("baseValue");
    const percent = readNumber("percentValue");
    const valid = !Number.isNaN(value) && !Number.isNaN(percent);
    const percentText = valid ? formatNumber(percent, 0, 2) + "\u00a0%" : "";
    setResult("plusLabel", valid ? "+" + percentText : "Added");
    setResult("minusLabel", valid ? "\u2212" + percentText : "Subtracted");
    setResult("plusResult", valid ? formatNumber(value * (1 + percent / 100), 0, 2) : EMPTY);
    setResult("minusResult", valid ? formatNumber(value * (1 - percent / 100), 0, 2) : EMPTY);

    const difference = valid ? formatNumber(Math.abs(value * percent / 100), 0, 2) : "";
    setResult("plusDiff", valid ? "+" + difference : "");
    setResult("minusDiff", valid ? "\u2212" + difference : "");
}

function setResult(id, text) {
    document.getElementById(id).innerText = text;
}

function formatNumber(number, minDecimals = 0, maxDecimals = minDecimals) {
    return new Intl.NumberFormat("no-NO", {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals
    }).format(number).replaceAll(/\s/g, "\u00a0").replaceAll(",", ".").replaceAll("\u2212", "-");
}
