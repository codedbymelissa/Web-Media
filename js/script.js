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

// 3. Report which layout the lifter is seeing (matches Bootstrap's breakpoints)
const deviceAlert = document.getElementById("deviceAlert");

function checkDevice() {
  const width = window.innerWidth;
  let device = "desktop";

  if (width < 768) device = "phone";
  else if (width < 992) device = "tablet";

  deviceAlert.textContent = `Your window is ${width}px wide, so you're seeing the ${device} layout. Train anywhere, track anywhere.`;
}

checkDevice();
window.addEventListener("resize", checkDevice);

// 4. Lift the bar (Web Animations API)
const barRacked = document.getElementById("barRacked");   // bar resting on the rack
const barLifted = document.getElementById("barLifted");   // lifter locked out overhead
const liftMessage = document.getElementById("liftMessage");
const liftButton = document.getElementById("liftBar");

let isLifted = false;
let isBusy = false; // blocks clicks while an animation is running

async function toggleLift() {
  if (isBusy) return;
  isBusy = true;

  if (isLifted) {
    // re-rack: clear the animations and restore the starting state
    [barRacked, barLifted].forEach((img) => img.getAnimations().forEach((a) => a.cancel()));
    barRacked.style.opacity = "1";
    barLifted.style.opacity = "0";
    liftMessage.textContent = "Bar is loaded. Chalk up...";
    liftButton.textContent = "Lift the bar";
    isLifted = false;
    isBusy = false;
    return;
  }

  liftMessage.textContent = "Squat... drive... lockout!";

  // fade out the racked bar
  await barRacked.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 700, easing: "ease-in-out", fill: "forwards" }
  ).finished;

  barLifted.style.opacity = "1";
  liftButton.textContent = "Re-rack";

  // the press: rise from the bottom with a little overshoot at lockout
  await barLifted.animate(
    [
      { transform: "scale(0.8) translateY(50px)", opacity: 0 },
      { transform: "scale(1.05) translateY(-15px)", opacity: 1 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ],
    { duration: 1000, easing: "ease-out" }
  ).finished;

  liftMessage.textContent = "Good lift! Three white lights.";
  isLifted = true;
  isBusy = false;
}

liftButton.addEventListener("click", toggleLift);
barRacked.addEventListener("click", toggleLift);

// 5. Plate animations: each button names a plate and an animate.css effect
document.querySelectorAll("[data-plate]").forEach((button) => {
  button.addEventListener("click", () => {
    const plate = document.getElementById(button.dataset.plate);
    const classes = ["animate__animated", `animate__${button.dataset.effect}`];

    plate.classList.add(...classes);
    plate.addEventListener("animationend", () => plate.classList.remove(...classes), { once: true });
  });
});
