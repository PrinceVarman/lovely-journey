const factButton = document.getElementById('factButton');
const funFact = document.getElementById('funFact');
const countdownDisplay = document.getElementById('countdown');
const backgroundMusic = document.getElementById('backgroundMusic');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const ctx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

const facts = [
    "Did you know? Couples who laugh together are more likely to stay together!",
    "Love is not just a feeling; it's an action we choose every day.",
    "Research shows that holding hands with someone you love can alleviate pain.",
    "The heart is the only organ that can continue to beat outside the body.",
    "A study found that being in love can boost your immune system.",
    "Sharing experiences can strengthen your bond with your partner.",
    "Did you know? The average person falls in love seven times before getting married.",
    "Love letters were once a popular way to express feelings before texting became the norm."
];

// Countdown timer starting from June 22, 2024, at 9:20 AM
const targetDate = new Date('2024-06-22T09:20:00'); // Set to June 22, 2024, 9:20 AM
targetDate.setDate(targetDate.getDate() + 100); // Add 100 days

function updateCountdown() {
    const now = new Date();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "🎉 Time's up! Happy 100th Day! 🎉";
        startFireworks(); // Start fireworks when countdown ends
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

factButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    funFact.textContent = facts[randomIndex];
    funFact.classList.remove('hidden');
});

// Fireworks effect
function startFireworks() {
    fireworksCanvas.style.display = 'block';
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * fireworksCanvas.width,
            y: Math.random() * fireworksCanvas.height,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 4 + 1,
            direction: Math.random() * Math.PI * 2,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            particle.radius *= 0.95; // Decrease size over time
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// Letter functionality
function openLetter() {
    document.getElementById('letterContent').classList.remove('hidden');
}

function closeLetter() {
    document.getElementById('letterContent').classList.add('hidden');
}

// Play music automatically
window.onload = () => {
    backgroundMusic.play();
};
