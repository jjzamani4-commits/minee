const lamp = document.getElementById('lamp');
const login = document.getElementById('login');
const sky = document.getElementById('sky');
const moon = document.getElementById('moon');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const main = document.getElementById('main');
const complimentsWrap = document.getElementById('compliments');
const continueWrap = document.getElementById('continueWrap');
const continueBtn = document.getElementById('continueBtn');
const letterSection = document.getElementById('letter');
const letterContent = document.getElementById('letterContent');

let is0n = false;
let loggedIn = false;
let complimentsInterval = null;

function createStars(count = 80) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = -10 + 'vh';
        s.style.animation = `fall ${4 + Math.random() * 6}s linear ${Math.random() * -20}s infinite`;
        sky.appendChild(s);
    }
}

lamp.addEventListener('click', () => {
    is0n = !is0n;
    if (is0n) {
        lamp.textContent = '💡';
        document.body.classList.add('lit');
        document.body.style.background = "radial-gradient(circle at 80% 20%, #222, #000)";
        if (!loggedIn) login.classList.remove('hidden');
        else { sky.classList.remove('hidden'); moon.classList.remove('hidden'); }
    } else {
        lamp.textContent = '🌑';
        document.body.classList.remove('lit');
        document.body.style.background = "black";
        [sky, moon, login].forEach(el => el.classList.add('hidden'));
    }
});

loginButton.addEventListener('click', () => {
    if (usernameInput.value.trim() === 'i love you' && passwordInput.value.trim() === 'for_life') {
        loggedIn = true;
        login.classList.add('hidden');
        main.classList.remove('hidden');
        createStars(80);
        startCompliments();
    }
});

const complimentsList = [
    "Hey babe, I want to use this opportunity to tell you that you light up my world ✨.",
    "🌅 Your smile is my favorite sunrise.",
    "💝 I'm grateful for your gentle heart.",
    "🌟 You make ordinary days extraordinary.",
    "😍 I adore everything about you.",
    "💫 Your eyes hold endless stars.",
    "🌙 You are my sweetest dream.",
    "💕 Loving you is the easiest thing I do."
];

function startCompliments() {
    let currentIndex = 0;
    const showNext = () => {
        if (currentIndex < complimentsList.length) {
            const el = document.createElement('div');
            el.className = 'compliment';
            el.textContent = complimentsList[currentIndex++];
            complimentsWrap.appendChild(el);
            complimentsWrap.scrollTo({ top: complimentsWrap.scrollHeight, behavior: 'smooth' });
        } else {
            clearInterval(complimentsInterval);
            continueWrap.classList.remove('hidden');
        }
    };
    showNext();
    complimentsInterval = setInterval(showNext, 2500);
}

continueBtn.addEventListener('click', () => {
    main.classList.add('hidden');
    letterSection.classList.remove('hidden');
    startTypingLetter();
});

const letterText = `Hey mama,\n\nEvery time I think of you, my heart hums the sweetest tune. You're my morning light and my midnight star 💫.\n\nIn the quiet when the world slows down and everything fades into silence, you are the thought that stays\n\nI didn't plan to feel this way untill you arrived gently and somehow became everything\n\nYour smile feels like light after a long night,\n\nEven your on days when words fail me, my heart still speaks your namen\n\nIf love is patience, I'm learning it with you\n\nIf love is kindness, I see it in you and\n\nIf love is home... then that's where you are.\n\nNo matter where life takes us,\n\nKnow this, I choose you, in both calm and stormy days.\n\nForever yours,\nYour adoring partner ❤️😘`;

function startTypingLetter() {
    let i = 0;
    const timer = setInterval(() => {
        letterContent.textContent += letterText.charAt(i++);
        if (i >= letterText.length) {
            clearInterval(timer);
            createSparkles(100);
        }
    }, 40);
}

function createSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const s = document.createElement('div');
            s.className = 'sparkle';
            s.style.left = Math.random() * window.innerWidth + 'px';
            s.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 1500);
        }, i * 20);
    }
}
