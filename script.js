let totalProfit = 0;
let safeLossLimit = -200;
let rounds = [];

function submitPrediction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const number = parseInt(document.getElementById('number').value);
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const actual = parseInt(document.getElementById('actual').value);

    if (isNaN(amount) || isNaN(number) || isNaN(actual)) {
        alert('Please fill all fields correctly.');
        return;
    }

    let profit = 0;
    let colorCorrect = (color === getColor(actual));
    let sizeCorrect = (size === getSize(actual));
    let numberCorrect = (number === actual);

    if (colorCorrect) profit += amount * 0.5;
    if (sizeCorrect) profit += amount * 0.3;
    if (numberCorrect) profit += amount * 1;

    totalProfit += profit - amount;

    rounds.push({
        amount, number, color, size, actual, profit: profit - amount
    });

    updateSummary();

    const message = document.getElementById("message");
    if (totalProfit > 0) {
        message.innerText = "✅ Profit ho raha hai! Aage badho.";
    } else if (totalProfit < safeLossLimit) {
        message.innerText = "⛔ Zyada loss ho gaya hai. Ruko!";
    } else {
        message.innerText = "ℹ️ Continue karo, safe zone me ho.";
    }
}

function getColor(num) {
    return num % 2 === 0 ? "Green" : "Red";
}

function getSize(num) {
    return num <= 4 ? "Small" : "Big";
}

function updateSummary() {
    const summary = document.getElementById("summary");
    let html = "<table><tr><th>Amount</th><th>Number</th><th>Color</th><th>Size</th><th>Actual</th><th>Profit/Loss</th></tr>";
    rounds.forEach(r => {
        html += `<tr><td>${r.amount}</td><td>${r.number}</td><td>${r.color}</td><td>${r.size}</td><td>${r.actual}</td><td>${r.profit.toFixed(2)}</td></tr>`;
    });
    html += `<tr><td colspan="5"><b>Total Profit/Loss</b></td><td><b>${totalProfit.toFixed(2)}</b></td></tr></table>`;
    summary.innerHTML = html;
}
