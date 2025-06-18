
function predict() {
  const amount = document.getElementById('amount').value;
  const result = document.getElementById('result');
  if (!amount || amount <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }
  // Simple simulation logic for demo
  const outcome = Math.random() < 0.5 ? "Green" : "Red";
  result.innerText = `Prediction: ${outcome}. Bet Amount: ₹${amount}`;
}
