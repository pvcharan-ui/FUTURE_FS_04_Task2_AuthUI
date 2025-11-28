// Tab switching animation
const tabButtons = document.querySelectorAll(".tab-btn");
const forms = document.querySelectorAll(".auth-form");
const indicator = document.querySelector(".tab-indicator");

tabButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // active styles
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // move indicator
    indicator.style.transform = `translateX(${index * 100}%)`;

    // show corresponding form
    const target = btn.dataset.target;
    forms.forEach(form => {
      form.classList.toggle("active", form.id === `${target}Form`);
    });
  });
});

// Show / hide password
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    btn.textContent = isPassword ? "Hide" : "Show";
  });
});

// Helper: set error
function setError(inputId, message) {
  const errorSpan = document.querySelector(`[data-error-for="${inputId}"]`);
  if (errorSpan) {
    errorSpan.textContent = message || "";
  }
}

// Validation: Login
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let valid = true;

  // Clear old errors
  setError("loginEmail", "");
  setError("loginPassword", "");

  if (!email) {
    setError("loginEmail", "Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("loginEmail", "Enter a valid email");
    valid = false;
  }

  if (!password) {
    setError("loginPassword", "Password is required");
    valid = false;
  }

  if (valid) {
    alert("Login UI validated! (Frontend only – no real auth yet.)");
    loginForm.reset();
  }
});

// Validation: Register
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirm").value.trim();

  let valid = true;

  // Clear old errors
  setError("regName", "");
  setError("regEmail", "");
  setError("regPassword", "");
  setError("regConfirm", "");

  if (!name) {
    setError("regName", "Name is required");
    valid = false;
  }

  if (!email) {
    setError("regEmail", "Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("regEmail", "Enter a valid email");
    valid = false;
  }

  if (!password) {
    setError("regPassword", "Password is required");
    valid = false;
  } else if (password.length < 6) {
    setError("regPassword", "At least 6 characters");
    valid = false;
  }

  if (!confirm) {
    setError("regConfirm", "Please confirm password");
    valid = false;
  } else if (confirm !== password) {
    setError("regConfirm", "Passwords do not match");
    valid = false;
  }

  if (valid) {
    alert("Registration UI validated! (Frontend only – no DB yet.)");
    registerForm.reset();
  }
});
