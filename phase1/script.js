/* =============================================================
   1. Fit the 393px canvas to the phone screen
   I scale the whole page so it always fills the screen width.
   ============================================================= */
const stage = document.getElementById("stage");
const page = document.getElementById("page");

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 6198;

function fitPage() {
    const screenWidth = document.documentElement.clientWidth;

    // on phones I scale to the screen width, on big screens I keep the real size
    const scale = screenWidth <= 600 ? screenWidth / DESIGN_WIDTH : 1;

    page.style.transform = `scale(${scale})`;
    stage.style.width = `${DESIGN_WIDTH * scale}px`;
    stage.style.height = `${DESIGN_HEIGHT * scale}px`;
}

fitPage();
window.addEventListener("resize", fitPage);

/* =============================================================
   2. Navigation links and empty "#" buttons
   ============================================================= */
document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// the other buttons do not go anywhere yet, so I stop the page jumping to the top
document.querySelectorAll('a.btn[href="#"]').forEach((button) => {
    button.addEventListener("click", (event) => event.preventDefault());
});

/* =============================================================
   3. Prize wheel
   The 8 slices go clockwise, starting with the slice left of the top pointer.
   ============================================================= */
const prizeOptions = [
    "Portfolio clinic",
    "a Gift box",
    "Free bootcamp",
    "Sorry, next time",
    "100K",
    "20% off SelP Sprint",
    "a Gift box",
    "a Gift box"
];

const disc = document.getElementById("disc");
const wheelResult = document.getElementById("result");
const sliceAngle = 360 / prizeOptions.length;

let currentRotation = 0;
let isSpinning = false;

function spinWheel() {
    if (isSpinning) {
        return;
    }

    isSpinning = true;
    wheelResult.textContent = "";

    // I pick the winning slice first, then turn the wheel so it stops under the pointer
    const winningIndex = Math.floor(Math.random() * prizeOptions.length);
    const sliceCenter = -sliceAngle / 2 + winningIndex * sliceAngle;
    const stopAngle = (360 - (sliceCenter % 360)) % 360;

    currentRotation = currentRotation - (currentRotation % 360) + 360 * 5 + stopAngle;
    disc.style.transform = `rotate(${currentRotation}deg)`;

    window.setTimeout(() => {
        isSpinning = false;

        wheelResult.textContent = winningIndex === 3
            ? "Sorry, next time!"
            : `You won ${prizeOptions[winningIndex]}!`;
    }, 4600);
}

document.getElementById("spinBtn").addEventListener("click", spinWheel);

document.querySelectorAll("a.btn").forEach((button) => {
    if (button.textContent.trim() === "Spin the wheel") {
        button.addEventListener("click", spinWheel);
    }
});

/* =============================================================
   4. Limited time offer countdown (1 day, 12 hours, 45 mins, 30 secs)
   ============================================================= */
const countdownEnd = Date.now() + (((24 + 12) * 60 + 45) * 60 + 30) * 1000;

function updateCountdown() {
    const secondsLeft = Math.max(0, Math.floor((countdownEnd - Date.now()) / 1000));

    document.getElementById("d").textContent = Math.floor(secondsLeft / 86400);
    document.getElementById("h").textContent = Math.floor((secondsLeft % 86400) / 3600);
    document.getElementById("m").textContent = Math.floor((secondsLeft % 3600) / 60);
    document.getElementById("s").textContent = secondsLeft % 60;
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
