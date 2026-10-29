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

// 4. Pull the bar (Web Animations API)
const liftSetup = document.getElementById("liftSetup");   // lifter setting up over the bar
const liftPull = document.getElementById("liftPull");     // lifter pulling the bar off the floor
const liftMessage = document.getElementById("liftMessage");
const liftButton = document.getElementById("liftBar");
 
let isPulled = false;
let isBusy = false; // blocks clicks while an animation is running
 
async function toggleLift() {
  if (isBusy) return;
  isBusy = true;
 
  if (isPulled) {
    // reset: clear the animations and restore the starting state
    [liftSetup, liftPull].forEach((img) => img.getAnimations().forEach((a) => a.cancel()));
    liftSetup.style.opacity = "1";
    liftPull.style.opacity = "0";
    liftMessage.textContent = "Bar is loaded. Chalk up...";
    liftButton.textContent = "Pull the bar";
    isPulled = false;
    isBusy = false;
    return;
  }
 
  liftMessage.textContent = "Drive through the floor!";
 
  // fade out the setup photo
  await liftSetup.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 700, easing: "ease-in-out", fill: "forwards" }
  ).finished;
 
  liftPull.style.opacity = "1";
  liftButton.textContent = "Reset";
 
  // the pull: the photo pops up with a little overshoot
  await liftPull.animate(
    [
      { transform: "scale(0.8) translateY(50px)", opacity: 0 },
      { transform: "scale(1.05) translateY(-15px)", opacity: 1 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ],
    { duration: 1000, easing: "ease-out" }
  ).finished;
 
  liftMessage.textContent = "Bar is moving. Keep pulling!";
  isPulled = true;
  isBusy = false;
}
 
liftButton.addEventListener("click", toggleLift);
liftSetup.addEventListener("click", toggleLift);

// 5. Plate animations: each button names a plate and an animate.css effect
document.querySelectorAll("[data-plate]").forEach((button) => {
  button.addEventListener("click", () => {
    const plate = document.getElementById(button.dataset.plate);
    const classes = ["animate__animated", `animate__${button.dataset.effect}`];

    plate.classList.add(...classes);
    plate.addEventListener("animationend", () => plate.classList.remove(...classes), { once: true });
  });
});
