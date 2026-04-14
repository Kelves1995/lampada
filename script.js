const cord = document.getElementById("cord");
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
  stiffness: 0.08,
  damping: 0.75,
  maxPull: 90
};

// PUXAR
cord.addEventListener("mousedown", e=>{
  pulling = true;
  startY = e.clientY;
});

window.addEventListener("mousemove", e=>{
  if(!pulling) return;

  let diff = e.clientY - startY;
  targetY = Math.max(0, Math.min(diff, physics.maxPull));
});

window.addEventListener("mouseup", ()=>{
  if(!pulling) return;
  pulling = false;

  if(targetY > 40){
    toggleLight();
  }

  targetY = 0;
});

// ANIMAÇÃO FLUIDA
function animate(){
  let force = (targetY - currentY) * physics.stiffness;
  velocity += force;
  velocity *= physics.damping;
  currentY += velocity;

  cord.style.transform = `translateY(${currentY}px)`;

  requestAnimationFrame(animate);
}
animate();

// LUZ
function toggleLight(){
  isOn = !isOn;

  if(isOn){
    ambient.style.opacity = 1;
    setTimeout(()=>login.classList.remove("hidden"),400);
  }else{
    ambient.style.opacity = 0;
    login.classList.add("hidden");
  }
}

// LOGIN → CARD
btn.addEventListener("click", ()=>{
  const name = nameInput.value.trim();
  if(!name) return alert("Digite o nome");

  overlay.classList.remove("hidden");

  card.innerHTML = `
    <h2>${name},</h2>
    <p style="margin-top:15px">
      Há mulheres que não pedem reconhecimento… mas merecem tudo.
      <br><br>
      Tu és força quando ninguém vê, és cuidado quando mais importa,
      e és amor na forma mais pura.
      <br><br>
      Ser quem tu és — e ainda uma mãe incrível — não é comum.
      É raro. É extraordinário.
    </p>
    <button class="choco-btn" id="choco">Quer chocolate?</button>
  `;

  document.getElementById("choco").onclick = showChocolate;
});

// CHOCOLATE
function showChocolate(){
  card.innerHTML = `
    <div class="character">😋</div>
    <div class="chocolate">🍫🍫🍫</div>
  `;

  setTimeout(()=>{
    card.innerHTML = `
      <div class="character">😅</div>
      <p>Pronto… já acabou 😅<br>Prometo que não resisti!</p>
    `;
  },3000);
}