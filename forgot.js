import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const auth = getAuth();

// Elements
const forgotLink = document.getElementById("forgot-password");
const modal = document.getElementById("forgot-modal");
const closeBtn = document.getElementById("forgot-close");
const cancelBtn = document.getElementById("forgot-cancel");
const form = document.getElementById("forgot-form");
const emailInput = document.getElementById("forgot-email");
const submitBtn = document.getElementById("forgot-submit");
const statusEl = document.getElementById("forgot-status");
const usernameField = document.getElementById("username");

function openModal() {
  // Prefill from username if it looks like an email
  const preset = (usernameField && /@/.test(usernameField.value)) ? usernameField.value.trim() : "";
  emailInput.value = preset;
  validate();
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  statusEl.style.display = "none";
  statusEl.textContent = "";
}

function validate() {
  const v = emailInput.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  submitBtn.disabled = !ok;
  submitBtn.style.cursor = ok ? "pointer" : "not-allowed";
}

emailInput.addEventListener("input", validate);

if (forgotLink) forgotLink.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  validate();
  if (submitBtn.disabled) return;
  statusEl.style.display = "block";
  statusEl.style.color = "#6b7280";
  statusEl.textContent = "Sending reset link...";
  try {
    await sendPasswordResetEmail(auth, emailInput.value.trim());
    statusEl.style.color = "#10b981";
    statusEl.textContent = "Password reset email sent. Check your inbox.";
    setTimeout(closeModal, 1400);
  } catch (err) {
    statusEl.style.color = "#ef4444";
    statusEl.textContent = (err && err.message) || "Failed to send reset email.";
  }
});


