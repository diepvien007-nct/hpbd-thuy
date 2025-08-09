let isTransitioning = false;

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const createSingleHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    };

    for (let i = 0; i < 10; i++) {
        createSingleHeart();
    }
    setInterval(createSingleHeart, 2000);
}

function applyWordTypingAnimation() {
    const paragraphs = document.querySelectorAll('.letter p:not(.signature)');
    let totalDelay = 2; // bắt đầu delay
    let totalWords = 0;
    const typingSpeed = 0.2; // tốc độ mỗi từ

    paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        const words = text.match(/[\p{L}\p{M}']+|[.,!?]/gu) || [];
        p.innerHTML = words
            .map((word, index) => `<span class="word" style="animation-delay: ${totalDelay + index * typingSpeed}s">${word}</span>`)
            .join(' ');
        totalDelay += words.length * typingSpeed; // cộng dồn cho dòng tiếp theo
        totalWords += words.length;
    });

    setTimeout(() => {
        document.getElementById('signature').classList.add('show');
        document.getElementById('nextButton').classList.add('show');
    }, totalDelay * 1000 + 1000); // dùng totalDelay thay vì totalWords
}

window.onload = function () {
    createHearts();
    // KHÔNG gọi applyWordTypingAnimation ở đây!
    // KHÔNG mở thư tự động!
};

const envelope = document.getElementById('envelope');
envelope.addEventListener('click', function (event) {
    if (isTransitioning) return;
    isTransitioning = true;
    envelope.classList.toggle('closed');
    // Khi mở thư thì chạy hiệu ứng chữ và phát nhạc
    if (!envelope.classList.contains('closed')) {
        const music = document.getElementById('birthdayMusic');
        music.play();
        applyWordTypingAnimation();
    }
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
    event.stopPropagation();
});

document.getElementById('nextButton').addEventListener('click', function () {
    window.location.href = 'banh.html';
});