(() => {

$('.navbar-nav li a').click(function() {
    $('.navbar-nav li').removeClass('active');
    $(this).parent().addClass('active');
});


function checkDevice() {
    const width = window.innerWidth;
    const deviceAlert = document.getElementById("deviceAlert");

    if (width < 768) {
        deviceAlert.innerHTML = "Based on the viewport, you could be using a phone.";
    }
    else if (width < 992) {
        deviceAlert.innerHTML = "Based on the viewport, you could be using a tablet.";
    }
    else {
        deviceAlert.innerHTML = "Based on the viewport, you could be using a desktop.";
    }
}
checkDevice();

window.addEventListener("resize", checkDevice);

const apple1 = document.querySelector("#apple-1");
const apple2 = document.querySelector("#apple-2");
const apple3 = document.querySelector("#apple-3");
const apple4 = document.querySelector("#apple-4");
const apple5 = document.querySelector("#apple-5");

const apple1Button = document.querySelector("#apple1Button");
const apple2Button = document.querySelector("#apple2Button");
const apple3Button = document.querySelector("#apple3Button");
const apple4Button = document.querySelector("#apple4Button");
const apple5Button = document.querySelector("#apple5Button");


apple1Button.addEventListener("click", function () {
    apple1.classList.add("animate__animated", "animate__fadeOutDown");

    apple1.addEventListener("animationend", function () {
        apple1.classList.remove("animate__animated", "animate__fadeOutDown");
    }, { once: true });
});

apple2Button.addEventListener("click", function () {
    apple2.classList.add("animate__animated", "animate__bounce");

    apple2.addEventListener("animationend", function () {
        apple2.classList.remove("animate__animated", "animate__bounce");
    }, { once: true });
});

apple3Button.addEventListener("click", function () {
    apple3.classList.add("animate__animated", "animate__rotateIn");

    apple3.addEventListener("animationend", function () {
        apple3.classList.remove("animate__animated", "animate__rotateIn");
    }, { once: true });
});

apple4Button.addEventListener("click", function () {
    apple4.classList.add("animate__animated", "animate__bounce");

    apple4.addEventListener("animationend", function () {
        apple4.classList.remove("animate__animated", "animate__bounce");
    }, { once: true });
});

apple5Button.addEventListener("click", function () {
    apple5.classList.add("animate__animated", "animate__fadeOutDown");

    apple5.addEventListener("animationend", function () {
        apple5.classList.remove("animate__animated", "animate__fadeOutDown");
    }, { once: true });
});

const corgiSleep = document.getElementById("corgiSleep"); // gets the sleeping Corgi from the HTML
const corgiAwake = document.getElementById("corgiAwake"); // gets the awake Corgi from the HTML
const wakeCorgi = document.getElementById("wakeCorgi"); // gets the button
const corgiMessage = document.getElementById("corgiMessage"); // gets message that says "Zzz..." or "I'm awake!"

let animationRunning = false; // keeps the image from being clicked during animation




function wakeUpCorgi() {

    // if the Corgi is awake, reset it
    if (corgiAwake.style.opacity === "1") {

       corgiSleep.getAnimations().forEach(function(animation) {
            animation.cancel();
        });

        corgiAwake.getAnimations().forEach(function(animation) {
            animation.cancel();
        });

        corgiSleep.style.opacity = "1";
        corgiAwake.style.opacity = "0";
        corgiMessage.textContent = "Zzz...";
        wakeCorgi.textContent = "Wake the Corgi";

        return;
    }

    corgiMessage.textContent = "I'm awake!"; // changes the message from "Zzz..." to "I'm awake!".

    corgiSleep.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards"
        }
    ).onfinish = function() {

        corgiAwake.style.opacity = "1";
        wakeCorgi.textContent = "Back to sleep";


        corgiAwake.animate( // animates the awake Corgi so it looks like it pops up
            [
                {
                    transform: "scale(0.8) translateY(50px)",
                    opacity: 0
                },
                {
                    transform: "scale(1.05) translateY(-15px)",
                    opacity: 1
                },
                {
                    transform: "scale(1) translateY(0)",
                    opacity: 1
                }
            ],
            {
                duration: 1000,
                easing: "ease-out"
            }
        ).onfinish = function() {

            // allows the image to be clicked again after animation
            animationRunning = false;
        };
    };
}


// resets the Corgi so the animation can be played again
function resetCorgi() {

    // don't reset while the animation is running
    if (animationRunning) {
        return;
    }

    corgiSleep.style.opacity = "1";
    corgiAwake.style.opacity = "0";
    corgiMessage.textContent = "Zzz...";
    corgiSleep.style.pointerEvents = "auto";
}

wakeCorgi.addEventListener("click", wakeUpCorgi);
corgiSleep.addEventListener("click", wakeUpCorgi);

})();