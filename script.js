// ... Keep your existing variable declarations ...

function setLamp(on) {
    is0n = !!on;
    lamp.classList.toggle('on', is0n);
    document.body.classList.toggle('lit', is0n);
    
    if (is0n) {
        // MOON & SKY SHOW IMMEDIATELY
        sky.classList.remove('hidden');
        moon.classList.remove('hidden'); 
        createStars(100); // More visible stars
        document.body.style.background = "radial-gradient(circle at 80% 20%, #1a1a1a, #000)";
        
        if (!loggedIn) {
            login.classList.remove('hidden');
        } else if (!main.classList.contains('hidden')) {
            startCompliments();
        }
    } else {
        [sky, moon, login, main, letterSection].forEach(el => el.classList.add('hidden'));
        document.body.style.background = "black";
        if (complimentsInterval) clearInterval(complimentsInterval);
    }
}

// FIXED: COMPLIMENTS NOW IN ORDER (1-8)
function startCompliments() {
    complimentsWrap.innerHTML = '';
    let currentIndex = 0;
    
    complimentsInterval = setInterval(() => {
        if (currentIndex < complimentsList.length) {
            const el = document.createElement('div');
            el.className = 'compliment reveal';
            el.textContent = complimentsList[currentIndex];
            complimentsWrap.appendChild(el);
            currentIndex++;
            // Scroll to bottom
            complimentsWrap.scrollTo({ top: complimentsWrap.scrollHeight, behavior: 'smooth' });
        } else {
            clearInterval(complimentsInterval);
            continueWrap.classList.remove('hidden');
        }
    }, 2500);
}

// FIXED: TYPING + SPARKLES AT THE END
function startTypingLetter() {
    letterContent.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        letterContent.textContent += letterText.charAt(i);
        i++;
        letterContent.scrollTo({ top: letterContent.scrollHeight });
        if (i >= letterText.length) {
            clearInterval(timer);
            createFinalSparkles(120); // The "Glowing Stuff"
        }
    }, 50);
}

function createFinalSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const s = document.createElement('div');
            s.className = 'sparkle-final';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.top = Math.random() * 100 + 'vh';
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 2000);
        }, i * 20);
    }
}

// ... Keep your login event listener and credential variables ...

// INITIAL STATE: Everything hidden
[login, sky, moon, main, letterSection].forEach(el => el.classList.add('hidden'));
setLamp(false);
