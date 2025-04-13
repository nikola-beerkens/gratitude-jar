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
    const orb = document.createElement("div");
    orb.classList.add("orb");

    // Store message as data attribute (could be shown on hover later)
    orb.setAttribute("data-message", message);

    // Position inside bounds
    const x = Math.random() * (orbContainer.clientWidth - ORB_SIZE);
    const y = Math.random() * (orbContainer.clientHeight - ORB_SIZE);
    orb.style.left = `${x}px`;
    orb.style.top = `${y}px`;

    // Assign random glow color
    const glowColor = colors[Math.floor(Math.random() * colors.length)];
    orb.style.boxShadow = `0 0 8px 8px ${glowColor}`;

    orbContainer.appendChild(orb);

    orbs.push({
      el: orb,
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5
    });
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
 