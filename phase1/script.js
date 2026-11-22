/* =============================================================
   1. Card data
   ============================================================= */

const cardData = {
    life: [
        [
            "Finding Direction",
            "Not sure whether university, work or another path is right for you? Explore your options before deciding what comes next.",
            "Explore your options"
        ],
        [
            "Beyond the degree",
            "Want to build practical skills without following the traditional degree route? Discover another way to start learning.",
            "Explore learning Paths"
        ],
        [
            "Ready to work?",
            "A month-long, hands-on programme to build a minimum viable portfolio.",
            "Start building"
        ]
    ],
    selp: [
        [
            "Start small",
            "Maybe it's a proof of concept, a piece of research or a clearly defined deliverable that's been sitting on your list. Start with one piece of work, scoped over two weeks.",
            "Explore your options"
        ],
        [
            "Need an extra pair of hands?",
            "Your team's workload is growing, and you need someone dedicated to help keep things moving.",
            "Explore learning Paths"
        ],
        [
            "Need a fresh view?",
            "You're wondering where to begin or need the right partner. Start exploring.",
            "Explore options"
        ]
    ],
    hot: [
        [
            "UX/UI Design Bootcamp",
            "Try it first. Get hands on with real world projects and see if its for you.",
            "Explore",
            "Trending",
            "2 weeks",
            "R 1 900",
            "Fully credited if you decide to continue"
        ],
        [
            "Selp Sprint",
            "A Two week sprint focused on one deliverable such as a proof of concept.",
            "Explore",
            "Popular",
            "2 weeks",
            "R 3 400",
            "Fully credited if you decide to continue"
        ]
    ]
};

/* =============================================================
   2. Render cards
   ============================================================= */

const cardContainers = document.querySelectorAll("[data-cards]");

cardContainers.forEach((container) => {
    const sectionName = container.dataset.cards;
    const cards = cardData[sectionName];

    if (!cards) {
        return;
    }

    container.innerHTML = cards
        .map((card, index) => {
            const [title, description, action, tag, duration, price, credit] = card;

            const cardMarker = tag
                ? `<span class="tag">${tag}</span>`
                : `<i>${index + 1}</i>`;

            const cardDetails = duration
                ? `
                    <small>
                        <span>◔ ${duration}</span>
                        <span>◎ ${price}</span>
                    </small>
                    <p style="min-height: 0; font-size: 12px">${credit}</p>
                `
                : "";

            return `
                <div class="card">
                    <img src="assets/card.png" alt="">

                    ${cardMarker}

                    <h4>${title}</h4>
                    <p>${description}</p>

                    ${cardDetails}

                    <a class="btn" href="#">${action}</a>
                </div>
            `;
        })
        .join("");
});

/* =============================================================
   3. Prize wheel
   ============================================================= */

const prizeOptions = [
    "Portfolio clinic",
    "Free bootcamp",
    "Sorry, next time",
    "100K",
    "20% off Selp Sprint",
    "Gift box"
];

const wheel = document.getElementById("wheel");
const wheelResult = document.getElementById("result");

const segmentAngle = 360 / prizeOptions.length;

wheel.style.background = `conic-gradient(${prizeOptions
    .map((_, index) => {
        const start = index * segmentAngle;
        const end = (index + 1) * segmentAngle;
        const color = index % 2 ? "#5a0008" : "#b8001a";

        return `${color} ${start}deg ${end}deg`;
    })
    .join(",")})`;

wheel.innerHTML = prizeOptions
    .map((prize, index) => {
        const position = index * segmentAngle + segmentAngle / 2 - 90;

        return `<span style="transform: rotate(${position}deg) translate(30px, -8px)">${prize}</span>`;
    })
    .join("");

let currentWheelRotation = 0;
let isWheelSpinning = false;

function spinWheel() {
    if (isWheelSpinning) {
        return;
    }

    isWheelSpinning = true;
    wheelResult.textContent = "";

    const winningIndex = Math.floor(Math.random() * prizeOptions.length);
    const prizeCenter = winningIndex * segmentAngle + segmentAngle / 2;

    currentWheelRotation +=
        360 * 5 +
        (360 - prizeCenter) -
        (currentWheelRotation % 360);

    wheel.style.transform = `rotate(${currentWheelRotation}deg)`;

    window.setTimeout(() => {
        isWheelSpinning = false;

        if (winningIndex === 2) {
            wheelResult.textContent = "Sorry, next time!";
        } else {
            wheelResult.textContent = `You won: ${prizeOptions[winningIndex]}!`;
        }
    }, 4600);
}

["spinBtn", "spinBtn2"].forEach((buttonId) => {
    const button = document.getElementById(buttonId);

    if (button) {
        button.addEventListener("click", spinWheel);
    }
});

/* =============================================================
   4. Limited-time offer countdown
   ============================================================= */

const countdownEnd = Date.now() + (
    (24 + 12) * 60 * 60 +
    45 * 60 +
    30
) * 1000;

function getCountdownElement(id) {
    return document.getElementById(id);
}

function updateCountdown() {
    const remainingSeconds = Math.max(
        0,
        Math.floor((countdownEnd - Date.now()) / 1000)
    );

    getCountdownElement("d").textContent = Math.floor(remainingSeconds / 86400);
    getCountdownElement("h").textContent = Math.floor((remainingSeconds % 86400) / 3600);
    getCountdownElement("m").textContent = Math.floor((remainingSeconds % 3600) / 60);
    getCountdownElement("s").textContent = remainingSeconds % 60;
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

/* =============================================================
   5. Section reveal animation
   ============================================================= */

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
            }
        });
    },
    { threshold: 0.1 }
);

const revealTargets = document.querySelectorAll(".sec .wrap");

revealTargets.forEach((target) => {
    target.classList.add("rv");
    revealObserver.observe(target);
});
