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

// Create raining stars inside #sky
function createStars(count = 60) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const left = Math.random() * 100;
        const delay = Math.random() * -20; 
        const duration = 4 + Math.random() * 6; 
        s.style.left = left + 'vw';
        s.style.top = (-10 - Math.random() * 20) + 'vh';
        s.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        s.style.opacity = 0.6 + Math.random() * 0.4;
        s.style.transform = `scale(${0.5 + Math.random()})`;
        sky.appendChild(s);
    }
}

// Simple Lamp Toggle
lamp.addEventListener('click', () => {
    is0n = !is0n;
    
    if (is0n) {
        lamp.textContent = '💡'; 
        document.body.classList.add('lit');
        document.body.style.background = "radial-gradient(circle at 80% 20%, #222, #000)";
        
        if (!loggedIn) {
            login.classList.remove('hidden');
        } else {
            sky.classList.remove('hidden');
            moon.classList.remove('hidden');
        }
    } else {
        lamp.textContent = '🌑'; 
        document.body.classList.remove('lit');
        document.body.style.background = "black";
        sky.classList.add('hidden');
        moon.classList.add('hidden');
        login.classList.add('hidden');
    }
});

// Credentials
const VALID_USER = 'i love you';
const VALID_PASS = 'for_life';

function showLoginError() {
    login.animate([
        { transform: 'translate(-50%, -50%)' },
        { transform: 'translate(-48%, -50%)' },
        { transform: 'translate(-52%, -50%)' },
        { transform: 'translate(-50%, -50%)' }
    ], { duration: 300 });
}

loginButton.addEventListener('click', () => {
    const user = (usernameInput.value || '').trim();
    const pass = (passwordInput.value || '').trim();
    if (user === VALID_USER && pass === VALID_PASS) {
        loggedIn = true;
        login.classList.add('hidden');
        main.classList.remove('hidden');
        createStars(80);
        startCompliments(20);
    } else {
        showLoginError();
    }
});

// Compliments flow (Ordered)
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

function startCompliments(durationSeconds = 20) {
    complimentsWrap.innerHTML = '';
    continueWrap.classList.add('hidden');
    let elapsed = 0;
    const intervalMs = 2500;
    let currentIndex = 0; 
    
    const showNext = () => {
        if (currentIndex < complimentsList.length) {
            const text = complimentsList[currentIndex]; 
            const el = document.createElement('div');
            el.className = 'compliment reveal';
            el.textContent = text;
            complimentsWrap.appendChild(el);
            complimentScroll();
            currentIndex++; 
        }
    };

    showNext();
    
    complimentsInterval = setInterval(() => {
        showNext();
        elapsed += intervalMs / 1000;
        if (elapsed >= durationSeconds || currentIndex >= complimentsList.length) {
            clearInterval(complimentsInterval);
            complimentsInterval = null;
            continueWrap.classList.remove('hidden');
        }
    }, intervalMs);
}

function complimentScroll() {
    complimentsWrap.scrollTo({ 
        top: complimentsWrap.scrollHeight, 
        behavior: 'smooth' 
    });
}

// Continue Button - Starts Letter Immediately
continueBtn.addEventListener('click', () => {
    main.classList.add('hidden');
    letterSection.classList.remove('hidden');
    startTypingLetter(); 
});

// Letter Text
const letterText = `Hey mama,\n\nEvery time I think of you, my heart hums the sweetest tune. You're my morning light and my midnight star 💫.\n\nIn the quiet when the world slows down and everything fades into silence, you are the thought that stays\n\nI didn't plan to feel this way untill you arrived gently and somehow became everything\n\nYour smile feels like light after a long night,\n\nEven your on days when words fail me, my heart still speaks your namen\n\nIf love is patience, I'm learning it with you\n\nIf love is kindness, I see it in you and\n\nIf love is home... then that's where you are.\n\nNo matter where life takes us,\n\nKnow this, I choose you, in both calm and stormy days.\n\nForever yours,\nYour adoring partner ❤️😘`;

function startTypingLetter() {
    letterContent.textContent = '';
    let i = 0;
    const speed = 40; 
    const timer = setInterval(() => {
        letterContent.textContent += letterText.charAt(i);
        i++;
        if (i >= letterText.length) {
            clearInterval(timer);
            createSparkles(100); 
        }
    }, speed);
}

// The sparkle function
function createSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 20);
    }
}

// Initial state
login.classList.add('hidden');
sky.classList.add('hidden');
moon.classList.add('hidden');
main.classList.add('hidden');
letterSection.classList.add('hidden');
