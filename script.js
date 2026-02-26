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
        const delay = Math.random() * -20; // start at different times
        const duration = 4 + Math.random() * 6; // 4-10s
        s.style.left = left + 'vw';
        s.style.top = (-10 - Math.random() * 20) + 'vh';
        s.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        s.style.opacity = 0.6 + Math.random() * 0.4;
        s.style.transform = `scale(${0.5 + Math.random()})`;
        sky.appendChild(s);
    }
}

// Toggle lamp and body.lit which controls visibility of .reveal
function setLamp(on) {
    is0n = !!on;
    lamp.classList.toggle('on', is0n);
    document.body.classList.toggle('lit', is0n);
    
    if (is0n) {
        // Turning lamp ON
        sky.classList.remove('hidden');
        moon.classList.remove('hidden');
        document.body.style.background = "radial-gradient(circle at top right, rgba(225, 215, 0, 0.35), rgba(0, 0, 0, 0.95) 70%)";
        
        // Show login if not logged in yet
        if (!loggedIn) {
            login.classList.remove('hidden');
        }
        
        const isOnMainPage = !main.classList.contains('hidden');
        const isOnLetterPage = !letterSection.classList.contains('hidden');
        
        // If on main page, start compliments
        if (isOnMainPage && !complimentsInterval) {
            complimentsWrap.innerHTML = '';
            continueWrap.classList.add('hidden');
            startCompliments(20);
        }
        
        // If on letter page, start typing
        if (isOnLetterPage && letterContent.textContent === '') {
            startTypingLetter();
        }
    } else {
        // Turning lamp OFF
        // sky.classList.add('hidden');  <-- Comment this out with //
        login.classList.add('hidden');
        document.body.style.background = "black";
        
        const isOnMainPage = !main.classList.contains('hidden');
        
        // Stop compliments if running on main page
        if (isOnMainPage && complimentsInterval) {
            clearInterval(complimentsInterval);
            complimentsInterval = null;
            complimentsWrap.innerHTML = '';
            continueWrap.classList.add('hidden');
        }
    }
}

lamp.addEventListener('click', () => {
    setLamp(!is0n);
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
        // success
        loggedIn = true;
        login.classList.add('hidden');
        main.classList.remove('hidden');
        // create stars
        createStars(80);
        // start compliments immediately after login
        startCompliments(20);
    } else {
        showLoginError();
    }
});

// Compliments flow
const complimentsList = [
    "Hey babe, I want to use this opportunity to tell you that you light up my world ✨.",
    "🌅 Your smile is my favorite sunrise.",
    "🪄 Every moment with you is magic.",
    "🎵 Your laugh is my favorite song.",
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
    
    // This keeps track of which number we are on (starting at 0)
    let currentIndex = 0; 
    
    const showNext = () => {
        // Only show a compliment if we haven't reached the end of the list
        if (currentIndex < complimentsList.length) {
            const text = complimentsList[currentIndex]; 
            const el = document.createElement('div');
            el.className = 'compliment reveal';
            el.textContent = text;
            complimentsWrap.appendChild(el);
            complimentScroll();
            
            // Move to the next number for next time
            currentIndex++; 
        }
    };

    // Show the first one immediately
    showNext();
    
    complimentsInterval = setInterval(() => {
        showNext();
        elapsed += intervalMs / 1000;
        
        // Stop if time is up OR if we ran out of compliments
        if (elapsed >= durationSeconds || currentIndex >= complimentsList.length) {
            clearInterval(complimentsInterval);
            complimentsInterval = null;
            continueWrap.classList.remove('hidden');
        }
    }, intervalMs);
}

function complimentScroll() {
    // This now scrolls the specific box instead of the whole page
    complimentsWrap.scrollTo({ 
        top: complimentsWrap.scrollHeight, 
        behavior: 'smooth' 
    });
}

// Audio removed - compliments display silently now
function playComplimentSound() {
    // deliberately empty
}

continueBtn.addEventListener('click', () => {
    main.classList.add('hidden');
    letterSection.classList.remove('hidden');
    // Don't start typing yet - wait for lamp toggle
});

// Typing effect for the love letter
const letterText = `Hey mama,\n\nEvery time I think of you, my heart hums the sweetest tune. You're my morning light and my midnight star 💫.\n\nIn the quiet when the world slows down and everything fades into silence, you are the thought that stays\n\nI didn't plan to feel this way untill you arrived gently and somehow became everything\n\nYour smile feels like light after a long night,\n\nEven your on days when words fail me, my heart still speaks your namen\n\nIf love is patience, I'm learning it with you\n\nIf love is kindness, I see it in you and\n\nIf love is home... then that's where you are.\n\nNo matter where life takes us,\n\nKnow this, I choose you, in both calm and stormy days.\n\nForever yours,\nYour adoring partner ❤️😘`;

function startTypingLetter() {
    letterContent.textContent = '';
    let i = 0;
    const speed = 60; // ms per character
    const timer = setInterval(() => {
        letterContent.textContent += letterText.charAt(i);
        i++;
        if (i >= letterText.length) {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize: keep everything hidden until lamp is toggled on
login.classList.add('hidden');
sky.classList.add('hidden');
moon.classList.add('hidden');
main.classList.add('hidden');
letterSection.classList.add('hidden');
setLamp(false);





