"use strict";

// Defining items on webpage
const imgLink = document.querySelector(".img-link");
const buttons = Array.from(document.querySelectorAll(".key-no"));

const lockBtn = document.querySelector(".lock-btn");
const clearBtn = document.querySelector(".clear");

const passcode = document.querySelector(".passcode");
const selectedImg = document.querySelector(".selected-img");

let images = {};
let currentPasscode = "";

function resetPasscode() { // resets passcode shown on screen
    currentPasscode = "";
    passcode.textContent = "0";
    passcode.classList.add("hidden");
}

function isLinkValid(link) {
    try {
        return Boolean(new URL(link));
    } catch (e) {
        return false;
    }
}

for (let i = 0; i < 10; i++) { // buttons(keys) function
    buttons[i].addEventListener("click", function () {
        if (currentPasscode.length >= 10) {
            window.alert("Password cannot exceed 10 numbers.");
            return;
        }

        passcode.classList.remove("hidden");

        currentPasscode += buttons[i].textContent;
        passcode.textContent = currentPasscode;
    });
}

clearBtn.addEventListener("click", function () { // clear button function
    resetPasscode();

    selectedImg.classList.add("hidden");
});

imgLink.addEventListener("input", function (link) { 
    //inputing something into image link function
    if (!link.target.value.toString()) {
        lockBtn.textContent = "Unlock Vault";
        lockBtn.classList.remove("lock");
        selectedImg.classList.add("hidden");
    }

    if (!isLinkValid(link.target.value.toString())) return;

    selectedImg.classList.remove("hidden");
    selectedImg.src = link.target.value.toString();

    lockBtn.textContent = "Lock Vault";
    lockBtn.classList.add("lock");
});

lockBtn.addEventListener("click", function () { // lock/unlock vault function
    if (lockBtn.classList.contains("lock")) { // lock function
        if (!currentPasscode) {
            window.alert("No password found!");
            return;
        } else if (!imgLink.value) {
            window.alert("No image link found!");
            return;
        }

        if (currentPasscode.length < 4) {
            window.alert("Password must have at least 4 numbers.");
            return;
        }

        if (!isLinkValid(imgLink.value)) {
            window.alert("Invalid Link!");
            return;
        }

        images[passcode.textContent] = imgLink.value;

        resetPasscode();

        imgLink.value = "";

        selectedImg.src = "";
        selectedImg.classList.add("hidden");

        lockBtn.textContent = "Unlock Vault";
        lockBtn.classList.remove("lock");
    } else { // unlock function
        console.log(images);
        if (images[Number(currentPasscode)]) {
            selectedImg.src = images[Number(currentPasscode)];
            selectedImg.classList.remove("hidden")

            resetPasscode();
        } else {
            window.alert("No such password!");
        }
    }
});
