
document.getElementById("analyze-btn").addEventListener("click", function () {
  const handInput = document.getElementById("hand").value;
  const communityInput = document.getElementById("community").value;
  const potSize = parseFloat(document.getElementById("pot-size").value);
  const callSize = parseFloat(document.getElementById("call-size").value);

  const handCards = parseCards(handInput);
  const communityCards = parseCards(communityInput);

  if (handCards.length !== 2 || communityCards.length < 3) {
    alert("אנא הזן 2 קלפים ביד ולפחות 3 קלפים בקופה.");
    return;
  }

  const totalPot = potSize + callSize;
  const potOdds = callSize / totalPot;
  const outs = estimateOuts(handCards, communityCards);
  const equity = (outs * 2) / 100;

  document.getElementById("current-hand-result").innerText = handCards.join(", ");
  document.getElementById("outs-result").innerText = outs + " אאוטים";
  document.getElementById("pot-odds-result").innerText = (potOdds * 100).toFixed(2) + "%";
  document.getElementById("equity-result").innerText = (equity * 100).toFixed(2) + "%";

  const recommendation = equity >= potOdds ? "מומלץ להשוות (Call)" : "מומלץ לוותר (Fold)";
  document.getElementById("recommendation-text").innerText = recommendation;

  document.getElementById("results-section").classList.remove("hidden");
});

function estimateOuts(hand, board) {
  // דוגמה בסיסית: אם יש פלאש דרואו (שני קלפים בצבע זהה ביד + שניים לפחות על השולחן)
  const allCards = hand.concat(board);
  const suits = { s: 0, h: 0, d: 0, c: 0 };

  allCards.forEach(card => {
    const suit = card[1];
    suits[suit] += 1;
  });

  const maxSuitCount = Math.max(...Object.values(suits));
  return maxSuitCount >= 4 ? 9 : 6; // 9 לאאוטים של פלאש, 6 אם רק כמעט
}
