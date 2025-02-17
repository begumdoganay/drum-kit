const buttons = document.querySelectorAll('.drum');
const languageToggle = document.getElementById('language-toggle');
const title = document.getElementById('title');
const description = document.getElementById('description');
const instructions = document.getElementById('instructions');

let isTurkish = true;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.getAttribute('data-sound');
        playSound(sound);
        animateButton(button);
        showWaveform(button);
    });
});

document.addEventListener('keydown', (event) => {
    const keyMap = {
        'b': 'sounds/boom.wav',
        'c': 'sounds/clap.wav',
        'h': 'sounds/hihat.wav',
        'o': 'sounds/openhat.wav',
        'r': 'sounds/ride.wav',
        's': 'sounds/snare.wav',
        't': 'sounds/tink.wav',
        'k': 'sounds/tom.wav'
    };
    const sound = keyMap[event.key.toLowerCase()];
    if (sound) {
        playSound(sound);
        const button = Array.from(buttons).find(btn => btn.getAttribute('data-sound') === sound);
        animateButton(button);
        showWaveform(button);
    }
});

languageToggle.addEventListener('click', () => {
    isTurkish = !isTurkish;
    updateLanguage();
});

function updateLanguage() {
    if (isTurkish) {
        title.textContent = "Davul Seti";
        description.textContent = "Bu uygulama, çeşitli davul seslerini çalmanıza olanak tanır. Düğmelere tıklayarak veya klavye tuşlarına basarak müzik yapabilirsiniz. Eğlenceli bir deneyim için hemen başlayın!";
        instructions.textContent = "Klavye ile de çalabilirsiniz: B, C, H, O, R, S, T";
        languageToggle.textContent = "English";
    } else {
        title.textContent = "Drum Kit";
        description.textContent = "This application allows you to play various drum sounds. You can make music by clicking the buttons or pressing the keyboard keys. Start now for a fun experience!";
        instructions.textContent = "You can also play with the keyboard: B, C, H, O, R, S, T";
        languageToggle.textContent = "Türkçe";
    }
}

function playSound(sound) {
    const audio = new Audio(sound);
    audio.play();
}

function animateButton(button) {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 200);
}

function showWaveform(button) {
    const waveform = document.createElement('div');
    waveform.classList.add('waveform');
    button.appendChild(waveform);
    
    setTimeout(() => {
        waveform.remove();
    }, 500);
}