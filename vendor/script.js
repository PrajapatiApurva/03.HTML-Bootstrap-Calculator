let numLockEnabled = false;

$(document).on("keypress", function (e) {
  if (numLockEnabled) return; // Prevent keypresses if Num Lock is on

  let key = e.key;
  if (isNumericKey(e.keyCode)) {
    appendNumber(key);
  } else if (isOperator(key)) {
    generateExpression(key);
  } else if (key === "=" || key === "Enter") {
    calculateExpression();
  }
  highlightButton(key);
});

$(document).on("keyup", function (e) {
  if (!numLockEnabled) removeHighlight(e.key);
});

$(".calc-btn").on("click", function () {
  let value = $(this).data("event_key");

  if (value === "NumLock") {
    toggleNumLock();
    return;
  }

  if (numLockEnabled) return; // Prevent button presses if Num Lock is on

  if (isNumeric(value)) {
    appendNumber(value);
  } else if (isOperator(value)) {
    generateExpression(value);
  } else if (value === "=") {
    calculateExpression();
  } else if (value == "Delete" || value == "Backspace") {
    clearCalculator();
  } else {
    clearCalculator();
    alert("Invalid key");
  }
});

function isNumericKey(keyCode) {
  return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
}

function isNumeric(value) {
  return !isNaN(value);
}

function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

function appendNumber(number) {
  let existingNum = $("#number_div").html();
  $("#number_div").html(existingNum === "0" ? number : existingNum + number);
}

function generateExpression(operator) {
  let existingNum = $("#number_div").html();
  let savedExpression = $("#saved_expression").val();

  let expression = savedExpression
    ? savedExpression + existingNum + operator
    : existingNum + operator;
  $("#number_div").html("");
  $("#saved_expression").val(expression);
  $("#expression").html(expression);
}

function calculateExpression() {
  let existingNum = $("#number_div").html();
  let expression = $("#saved_expression").val() + existingNum;

  if (expression) {
    let result = eval(expression);
    $("#saved_expression").val("");
    $("#number_div, #value_div").html(result);
    $("#expression").html(expression);
  }
}

function clearCalculator() {
  $("#number_div, #expression").html("");
  $("#saved_expression").val("");
  $("#value_div").html("0");
}

function highlightButton(key) {
  $('button[data-event_key="' + key + '"]').addClass("active");
}

function removeHighlight(key) {
  $('button[data-event_key="' + key + '"]').removeClass("active");
}

function toggleNumLock() {
  numLockEnabled = !numLockEnabled;

  let numLockButton = $('button[data-event_key="NumLock"]');
  if (numLockEnabled) {
    numLockButton.css("background-color", "red");
    $(".calc-btn").not(numLockButton).prop("disabled", true);
  } else {
    numLockButton.css("background-color", ""); // Reset to default
    $(".calc-btn").prop("disabled", false);
  }
}
