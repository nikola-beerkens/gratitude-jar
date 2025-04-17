const log = require('electron-log');

document.addEventListener("DOMContentLoaded", () => {
  const orbContainer = document.getElementById("orbContainer");
  const input = document.getElementById("gratitudeInput");
  const submitBtn = document.getElementById("submitBtn");
  const numOrbs = 8;
  const colors = [
    "#FFE2DB", // pink
    "#D9A7C6" // purple
  ];

  const orbs = [];
  const ORB_SIZE = 12;

  function createOrb(message) {
    const orbWrapper = document.createElement("div");
    orbWrapper.classList.add("orb-wrapper");
    orbWrapper.setAttribute("data-message", message);
  
    const orb = document.createElement("div");
    orb.classList.add("orb");
    orbWrapper.appendChild(orb);
    orbContainer.appendChild(orbWrapper);
  
    const x = Math.random() * (orbContainer.clientWidth - ORB_SIZE);
    const y = Math.random() * (orbContainer.clientHeight - ORB_SIZE);
    orbWrapper.style.left = `${x}px`;
    orbWrapper.style.top = `${y}px`;
  
    const glowColor = colors[Math.floor(Math.random() * colors.length)];
    orb.style.boxShadow = `0 0 8px 8px ${glowColor}`;
  
    const orbData = {
      el: orbWrapper,
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      paused: false
    };
  
    // Pause on hover
    orbWrapper.addEventListener("mouseenter", () => {
      orbData.paused = true;
    });
    orbWrapper.addEventListener("mouseleave", () => {
      orbData.paused = false;
    });
  
    orbs.push(orbData);
  }
  

  submitBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (value !== "") {
      createOrb(value);
      input.value = "";
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });

  function animate() {
    for (let orb of orbs) {
      if (orb.paused) continue;
  
      orb.x += orb.vx;
      orb.y += orb.vy;
  
      if (orb.x <= 0 || orb.x >= orbContainer.clientWidth - ORB_SIZE) {
        orb.vx *= -1;
        orb.x = Math.max(0, Math.min(orb.x, orbContainer.clientWidth - ORB_SIZE));
      }
  
      if (orb.y <= 0 || orb.y >= orbContainer.clientHeight - ORB_SIZE) {
        orb.vy *= -1;
        orb.y = Math.max(0, Math.min(orb.y, orbContainer.clientHeight - ORB_SIZE));
      }
  
      orb.el.style.left = `${orb.x}px`;
      orb.el.style.top = `${orb.y}px`;
    }
  
    requestAnimationFrame(animate);
  }
  

  animate();
});
 