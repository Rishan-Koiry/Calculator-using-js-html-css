const display = document.getElementById("display");
let errorMode = false;
const clickSound = new Audio("click.mp3");
const resultSound = new Audio("result.mp3");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch((e) => {
    console.log("Audio play failed:", e);
  });
}

function playResultSound() {
  resultSound.currentTime = 0;
  resultSound.play().catch((e) => {
    console.log("Audio play failed:", e);
  });
}

function notification(message, type = "error") {
  const notificationElement = document.getElementById("notification");
  if (!notificationElement) return;
  notificationElement.className = "";
  notificationElement.textContent = message;
  notificationElement.classList.add("show", type);
  setTimeout(() => {
    notificationElement.classList.remove("show");
  }, 3000);
}

function appendToDisplay(input) {
  playClickSound();
  if (errorMode) {
    display.value = "";
    display.style.color = ""; // ✅ Reset text color if in error mode
    errorMode = false;
  }
  display.value += input;
  display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
  playClickSound();
  display.value = "";
  display.style.color = ""; // ✅ Reset text color on clear
  errorMode = false;
  display.scrollLeft = 0;
}

function setOperation(operator) {
  playClickSound();
  if (errorMode) {
    display.value = "";
    display.style.color = ""; // ✅ Reset color before adding operator
    errorMode = false;
  }
  display.value += operator;
  display.scrollLeft = display.scrollWidth;
}

function clearone() {
  playClickSound();
  if (errorMode) {
    return;
  }
  display.value = display.value.slice(0, -1);
}

function showFormulaWindow() {
  playClickSound();
  if (errorMode) {
    return;
  }
  let existingDiv = document.getElementById("formula-window");
  if (existingDiv) {
    existingDiv.style.display = "block";
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "formula-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const formulaDiv = document.createElement("div");
  formulaDiv.id = "formula-window";
  formulaDiv.style.cssText = `
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    min-width: 320px;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  formulaDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 id="formula-title" style="margin: 0; color: #333; font-size: 24px;">Common Formulas</h2>
      <button id="close-formula-window" style="
        background: #f0f0f0;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 16px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      " onmouseover="this.style.background='#e0e0e0'" onmouseout="this.style.background='#f0f0f0'">
        ×
      </button>
    </div>
   <!-- Math Formulas -->
    <div style="border-left: 4px solid #4CAF50; padding-left: 12px;">
      <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Math (Geometry & Algebra)</h3>
      <div style="font-family: 'Courier New', monospace; color: #555; line-height: 1.6;">
        <div><strong>1. Circle Area:</strong> A = πr²</div>
        <div><strong>2. Circle Circumference:</strong> C = 2πr</div>
        <div><strong>3. Rectangle Area:</strong> A = l × w</div>
        <div><strong>4. Triangle Area:</strong> A = ½bh</div>
        <div><strong>5. Parallelogram Area:</strong> A = bh</div>
        <div><strong>6. Trapezium Area:</strong> A = ½(a+b)h</div>
        <div><strong>7. Pythagoras Theorem:</strong> a² + b² = c²</div>
        <div><strong>8. Quadratic Formula:</strong> x = (-b ± √(b²-4ac)) / 2a</div>
        <div><strong>9. Distance Formula:</strong> d = √((x₂-x₁)² + (y₂-y₁)²)</div>
        <div><strong>10. Slope Formula:</strong> m = (y₂ - y₁)/(x₂ - x₁)</div>
        <div><strong>11. Midpoint Formula:</strong> M = ((x₁+x₂)/2, (y₁+y₂)/2)</div>
        <div><strong>12. Arithmetic Series Sum:</strong> Sₙ = n/2 (a₁ + aₙ)</div>
        <div><strong>13. Geometric Series Sum:</strong> Sₙ = a(1-rⁿ)/(1-r)</div>
        <div><strong>14. Perimeter of Square:</strong> P = 4a</div>
        <div><strong>15. Area of Square:</strong> A = a²</div>
        <div><strong>16. Area of Rhombus:</strong> A = (d₁ × d₂)/2</div>
        <div><strong>17. Heron’s Formula:</strong> A = √[s(s-a)(s-b)(s-c)]</div>
        <div><strong>18. Law of Sines:</strong> a/sinA = b/sinB = c/sinC</div>
        <div><strong>19. Law of Cosines:</strong> c² = a² + b² - 2ab cosC</div>
        <div><strong>20. Simple Interest:</strong> SI = (P × R × T)/100</div>
      </div>
    </div>
<br/>
    <hr style="border: none; border-top: 1px solid #5c5c5cff; margin: 20px 0;">
    <!-- Physics Formulas -->
    <div style="border-left: 4px solid #2196F3; padding-left: 12px;">
      <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Physics</h3>
      <div style="font-family: 'Courier New', monospace; color: #555; line-height: 1.6;">
        <div><strong>1. Speed:</strong> v = d/t</div>
        <div><strong>2. Acceleration:</strong> a = Δv/Δt</div>
        <div><strong>3. Force:</strong> F = ma</div>
        <div><strong>4. Weight:</strong> W = mg</div>
        <div><strong>5. Momentum:</strong> p = mv</div>
        <div><strong>6. Work:</strong> W = Fd cosθ</div>
        <div><strong>7. Power:</strong> P = W/t</div>
        <div><strong>8. Kinetic Energy:</strong> KE = ½mv²</div>
        <div><strong>9. Potential Energy:</strong> PE = mgh</div>
        <div><strong>10. Pressure:</strong> P = F/A</div>
        <div><strong>11. Density:</strong> ρ = m/V</div>
        <div><strong>12. Ohm’s Law:</strong> V = IR</div>
        <div><strong>13. Resistance:</strong> R = ρL/A</div>
        <div><strong>14. Electric Power:</strong> P = VI</div>
        <div><strong>15. Coulomb’s Law:</strong> F = kq₁q₂/r²</div>
        <div><strong>16. Frequency:</strong> f = 1/T</div>
        <div><strong>17. Wave Speed:</strong> v = fλ</div>
        <div><strong>18. Snell’s Law:</strong> n₁sinθ₁ = n₂sinθ₂</div>
        <div><strong>19. Lens Formula:</strong> 1/f = 1/v - 1/u</div>
        <div><strong>20. Mirror Formula:</strong> 1/f = 1/v + 1/u</div>
        <div><strong>21. Gravitational Force:</strong> F = Gm₁m₂/r²</div>
        <div><strong>22. Escape Velocity:</strong> vₑ = √(2GM/R)</div>
        <div><strong>23. Orbital Velocity:</strong> v = √(GM/R)</div>
        <div><strong>24. Period of Pendulum:</strong> T = 2π√(l/g)</div>
        <div><strong>25. Torque:</strong> τ = rF sinθ</div>
        <div><strong>26. Magnetic Force:</strong> F = BIL sinθ</div>
        <div><strong>27. Magnetic Flux:</strong> Φ = BA cosθ</div>
        <div><strong>28. Faraday’s Law:</strong> ε = -dΦ/dt</div>
        <div><strong>29. Efficiency:</strong> η = (Useful Work / Input Work) × 100%</div>
        <div><strong>30. Heat Transfer:</strong> Q = mcΔT</div>
      </div>
    </div>
  `;

  overlay.appendChild(formulaDiv);
  document.body.appendChild(overlay);

  const closeWindow = () => {
    playResultSound();
    overlay.remove();
  };

  document.getElementById("close-formula-window").onclick = closeWindow;

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeWindow();
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeWindow();
      document.removeEventListener("keydown", handleKeydown);
    }
  };
  document.addEventListener("keydown", handleKeydown);

  formulaDiv.setAttribute("role", "dialog");
  formulaDiv.setAttribute("aria-labelledby", "formula-title");
  formulaDiv.tabIndex = -1;
  formulaDiv.focus();
}

function calculateResult() {
  playResultSound();
  if (errorMode) {
    return;
  }
  try {
    const result = eval(display.value);
    if (isNaN(result)) {
      display.value = "Wrong Math !";
      display.style.color = "red";
      notification("Result is Not a Number !");
      errorMode = true;
    } else if (!isFinite(result)) {
      display.value = "Can not divide by 0!";
      display.style.color = "red";
      notification("Can not divide by 0!");
      errorMode = true;
    } else {
      display.value = result;
      display.style.color = ""; // ✅ Reset color after success
      errorMode = false; // ✅ Reset error mode
      notification("Calculation successful !", "success");
    }
    display.scrollLeft = display.scrollWidth;
  } catch (error) {
    display.value = "Error";
    display.style.color = "red";
    notification("Invalid Expression !");
    errorMode = true;
    display.scrollLeft = display.scrollWidth;
  }
}

function copyResult() {
  const displayValue = display.value;
  if (!displayValue || displayValue === "" || displayValue === "0") {
    notification("No result to copy!", "info");
    return;
  }
  if (
    displayValue === "Error" ||
    displayValue === "Wrong Math !" ||
    displayValue === "Can not divide by 0!"
  ) {
    notification("Cannot copy error message!");
    return;
  }

  navigator.clipboard
    .writeText(displayValue)
    .then(() => {
      notification("Result copied to clipboard!", "success");
      playResultSound();
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      notification("Failed to copy result!", "error");
    });
}
