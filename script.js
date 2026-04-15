const cord = document.getElementById("cord");
const cordArea = document.getElementById("cord-area");
const login = document.getElementById("login");
const ambient = document.getElementById("ambient");
const btn = document.getElementById("btn");
const overlay = document.getElementById("overlay");
const card = document.getElementById("cardContent");
const nameInput = document.getElementById("name");

let targetY = 0;
let currentY = 0;
let velocity = 0;
let pulling = false;
let startY = 0;
let isOn = false;

const physics = {
    stiffness: 0.1,
    damping: 0.7,
    maxPull: 80
};

// Capturar posição Y (Rato ou Touch)
const getY = (e) => e.touches ? e.touches[0].clientY : e.clientY;

const onStart = (e) => {
    pulling = true;
    startY = getY(e);
};

const onMove = (e) => {
    if (!pulling) return;
    
    // Evita o scroll da página enquanto puxa
    if (e.cancelable) e.preventDefault();

    let diff = getY(e) - startY;
    targetY = Math.max(0, Math.min(diff, physics.maxPull));
};

const onEnd = () => {
    if (!pulling) return;
    pulling = false;

    if (targetY > 35) {
        toggleLight();
    }
    targetY = 0;
};

// Eventos de Mouse
cordArea.addEventListener("mousedown", onStart);
window.addEventListener("mousemove", onMove);
window.addEventListener("mouseup", onEnd);

// Eventos de Touch
cordArea.addEventListener("touchstart", onStart, { passive: false });
window.addEventListener("touchmove", onMove, { passive: false });
window.addEventListener("touchend", onEnd);

function animate() {
    let force = (targetY - currentY) * physics.stiffness;
    velocity += force;
    velocity *= physics.damping;
    currentY += velocity;

    cord.style.transform = `translateY(${currentY}px)`;
    requestAnimationFrame(animate);
}
animate();

function toggleLight() {
    isOn = !isOn;
    if (isOn) {
        ambient.style.opacity = 1;
        login.classList.remove("hidden");
    } else {
        ambient.style.opacity = 0;
        login.classList.add("hidden");
    }
}

btn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return alert("Por favor, digita o teu nome");

    overlay.classList.remove("hidden");
    card.innerHTML = `
        <h2 style="color:#ffd27a">${name},</h2>
        <p style="margin-top:20px; line-height:1.6; font-size:1.1rem">
            Há mulheres que não pedem reconhecimento… mas merecem tudo.
            <br><br>
            Tu és força quando ninguém vê, és cuidado quando mais importa,
            e és amor na forma mais pura.
            <br><br>
            Ser quem tu és — e ainda uma mãe incrível — não é comum.
            É raro. É <strong>extraordinário</strong>.
        </p>
        <button class="choco-btn" id="choco">Queres um chocolate?</button>
    `;

    document.getElementById("choco").onclick = showChocolate;
});

function showChocolate() {
    card.innerHTML = `
        <div class="character">😋</div>
        <div class="chocolate">🍫🍫🍫</div>
        <p style="margin-top:10px">A processar o teu desejo...</p>
    `;

    setTimeout(() => {
        card.innerHTML = `
            <div class="character">😅</div>
            <p style="font-size:1.2rem; margin-top:20px">
                Pronto… já acabou 😅<br>
                Estavam tão bons que não resisti!
            </p>
            <button onclick="location.reload()" style="background:transparent; color:#aaa; font-size:0.8rem; margin-top:20px; border:1px solid #444">Recomeçar</button>
        `;
    }, 3000);
}
