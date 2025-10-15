import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Reuse auth from Firebase.js if available on window; otherwise, initialize minimal auth from config in Firebase.js
// Assumes Firebase.js is loaded on login.html which initializes the app and sets up auth
const auth = (() => {
  try {
    // eslint-disable-next-line no-undef
    return firebaseAuth || getAuth();
  } catch (e) {
    return getAuth();
  }
})();

const forgotLink = document.getElementById("forgot-password");
if (forgotLink) {
  forgotLink.addEventListener("click", async () => {
    const email = prompt("Enter your registered email to reset password:");
    if (!email) return;
    try {
      await sendPasswordResetEmail(auth, email.trim());
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      alert((err && err.message) || "Failed to send reset email. Try again.");
    }
  });
}


