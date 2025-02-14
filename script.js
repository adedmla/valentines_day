const button = document.getElementById("transition-btn");
const messageDiv = document.getElementById("message");

let mouseX = 0;
let mouseY = 0;

const messages = [
  "hey there !!!",
  "you're really special ...",
  "will you be my Valentine?",
];

const noMessages = [
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Pretty please?",
  "You're breaking my heart 💔",
];
let noCount = 0;

let currentIndex = 0;

button.addEventListener("click", () => {
  if (currentIndex < messages.length - 1) {
    currentIndex++;
    messageDiv.textContent = messages[currentIndex];
  }

  if (currentIndex === messages.length - 1) {
    button.style.display = "none";
    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.className = "btn btn-yes";
    yesButton.addEventListener("click", () => {
      messageDiv.textContent = "I love you 3005 !!!";
    });

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.className = "btn btn-no";
    noButton.id = "no-button";
    noButton.addEventListener("click", () => {
      messageDiv.textContent = "I still love you 3005";
    });
    button.parentNode.insertBefore(yesButton, button);
    button.parentNode.insertBefore(noButton, button);
  }
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const noBtn = document.getElementById("no-button");
  if (noBtn) {
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mouseX - btnX, 2) + Math.pow(mouseY - btnY, 2)
    );

    if (distance < 50) {
      moveNoButton();
    }
  }
});

function moveNoButton() {
  const noBtn = document.getElementById("no-button");
  if (!noBtn) return;

  const card = document.querySelector(".card");
  const cardRect = card.getBoundingClientRect();

  const padding = 20;
  const minX = cardRect.left + padding;
  const maxX = cardRect.right - noBtn.offsetWidth - padding;
  const minY = cardRect.top + padding;
  const maxY = cardRect.bottom - noBtn.offsetHeight - padding;

  const newX = Math.min(
    Math.max(minX, Math.random() * (maxX - minX) + minX),
    maxX
  );
  const newY = Math.min(
    Math.max(minY, Math.random() * (maxY - minY) + minY),
    maxY
  );

  noBtn.style.position = "fixed";
  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";

  if (noCount < noMessages.length) {
    noBtn.textContent = noMessages[noCount];
    noCount++;
  } else {
    noBtn.textContent = "I give up ˙◠˙";
  }
}
