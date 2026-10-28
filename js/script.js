// 1. Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Close the mobile menu after a nav link is clicked
const navMenu = document.getElementById("navLinks");

document.querySelectorAll("#navLinks .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

// 3. Report which layout the visitor is seeing (matches Bootstrap's breakpoints)
const deviceAlert = document.getElementById("deviceAlert");

function checkDevice() {
  const width = window.innerWidth;
  let device = "desktop";

  if (width < 768) device = "phone";
  else if (width < 992) device = "tablet";

  deviceAlert.textContent = `Your window is ${width}px wide, so you are seeing the ${device} layout.`;
}

checkDevice();
window.addEventListener("resize", checkDevice);

// 4. Wake the corgi (Web Animations API)
const corgiSleep = document.getElementById("corgiSleep");
const corgiAwake = document.getElementById("corgiAwake");
const corgiMessage = document.getElementById("corgiMessage");
const wakeButton = document.getElementById("wakeCorgi");

let isAwake = false;
let isBusy = false; // blocks clicks while an animation is running

async function toggleCorgi() {
  if (isBusy) return;
  isBusy = true;

  if (isAwake) {
    // back to sleep: clear the animations and restore the starting state
    [corgiSleep, corgiAwake].forEach((img) => img.getAnimations().forEach((a) => a.cancel()));
    corgiSleep.style.opacity = "1";
    corgiAwake.style.opacity = "0";
    corgiMessage.textContent = "Zzz...";
    wakeButton.textContent = "Wake the corgi";
    isAwake = false;
    isBusy = false;
    return;
  }

  corgiMessage.textContent = "I'm awake!";

  await corgiSleep.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 700, easing: "ease-in-out", fill: "forwards" }
  ).finished;

  corgiAwake.style.opacity = "1";
  wakeButton.textContent = "Back to sleep";

  await corgiAwake.animate(
    [
      { transform: "scale(0.8) translateY(50px)", opacity: 0 },
      { transform: "scale(1.05) translateY(-15px)", opacity: 1 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ],
    { duration: 1000, easing: "ease-out" }
  ).finished;

  isAwake = true;
  isBusy = false;
}

wakeButton.addEventListener("click", toggleCorgi);
corgiSleep.addEventListener("click", toggleCorgi);

// 5. Apple animations: each button names an apple and an animate.css effect
document.querySelectorAll("[data-apple]").forEach((button) => {
  button.addEventListener("click", () => {
    const apple = document.getElementById(button.dataset.apple);
    const classes = ["animate__animated", `animate__${button.dataset.effect}`];

    apple.classList.add(...classes);
    apple.addEventListener("animationend", () => apple.classList.remove(...classes), { once: true });
  });
});
