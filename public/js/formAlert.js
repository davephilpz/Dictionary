//live validation
//signup form
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
//signin form
const signInEmailInput = document.getElementById("signin-email");
const signInPasswordInput = document.getElementById("signin-password");

if (nameInput) {
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() === "") {
      nameInput.parentElement.classList.remove("success");
      nameInput.parentElement.classList.add("error");
      nameInput.nextElementSibling.style.display = "block";
    } else {
      nameInput.parentElement.classList.remove("error");
      nameInput.parentElement.classList.add("success");
      nameInput.nextElementSibling.style.display = "none";
    }
  });
}

if (emailInput) {
  emailInput.addEventListener("input", () => {
    if (!validateEmail(emailInput.value)) {
      emailInput.parentElement.classList.remove("success");
      emailInput.parentElement.classList.add("error");
      emailInput.nextElementSibling.style.display = "block";
    } else {
      emailInput.parentElement.classList.remove("error");
      emailInput.parentElement.classList.add("success");
      emailInput.nextElementSibling.style.display = "none";
    }
  });
}

if (signInEmailInput) {
  signInEmailInput.addEventListener("input", () => {
    if (!validateEmail(signInEmailInput.value)) {
      signInEmailInput.parentElement.classList.remove("success");
      signInEmailInput.parentElement.classList.add("error");
      signInEmailInput.nextElementSibling.style.display = "block";
    } else {
      signInEmailInput.parentElement.classList.remove("error");
      signInEmailInput.parentElement.classList.add("success");
      signInEmailInput.nextElementSibling.style.display = "none";
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    if (!validatePassword(passwordInput.value)) {
      passwordInput.parentElement.classList.remove("success");
      passwordInput.parentElement.classList.add("error");
      passwordInput.nextElementSibling.style.display = "block";
    } else {
      passwordInput.parentElement.classList.remove("error");
      passwordInput.parentElement.classList.add("success");
      passwordInput.nextElementSibling.style.display = "none";
    }
  });
}

if (signInPasswordInput) {
  signInPasswordInput.addEventListener("input", () => {
    if (!validatePassword(signInPasswordInput.value)) {
      signInPasswordInput.parentElement.classList.remove("success");
      signInPasswordInput.parentElement.classList.add("error");
      signInPasswordInput.nextElementSibling.style.display = "block";
    } else {
      signInPasswordInput.parentElement.classList.remove("error");
      signInPasswordInput.parentElement.classList.add("success");
      signInPasswordInput.nextElementSibling.style.display = "none";
    }
  });
}

if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener("input", () => {
    if (
      passwordInput.value === "" ||
      confirmPasswordInput.value !== passwordInput.value ||
      confirmPasswordInput.value.length < 10
    ) {
      confirmPasswordInput.parentElement.classList.remove("success");
      confirmPasswordInput.parentElement.classList.add("error");
      confirmPasswordInput.nextElementSibling.style.display = "block";
    } else {
      confirmPasswordInput.parentElement.classList.remove("error");
      confirmPasswordInput.parentElement.classList.add("success");
      confirmPasswordInput.nextElementSibling.style.display = "none";
    }
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}/;
  return passwordRegex.test(password);
}

function validateConfirmPassword(confirmPassword, password) {
  return (
    password !== "" &&
    confirmPassword === password &&
    confirmPassword.length >= 10
  );
}

//on submit validation
const form = document.getElementById("signup-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    let nameValid = true;
    let emailValid = true;
    let passwordValid = true;
    let confirmPasswordValid = true;

    if (nameInput.value.trim() === "") {
      nameInput.parentElement.classList.remove("success");
      nameInput.parentElement.classList.add("error");
      nameInput.nextElementSibling.style.display = "block";
      nameValid = false;
    } else {
      nameInput.parentElement.classList.remove("error");
      nameInput.parentElement.classList.add("success");
      nameInput.nextElementSibling.style.display = "none";
    }

    if (!validateEmail(emailInput.value)) {
      emailInput.parentElement.classList.remove("success");
      emailInput.parentElement.classList.add("error");
      emailInput.nextElementSibling.style.display = "block";
      emailValid = false;
    } else {
      emailInput.parentElement.classList.remove("error");
      emailInput.parentElement.classList.add("success");
      emailInput.nextElementSibling.style.display = "none";
    }

    if (!validatePassword(passwordInput.value)) {
      passwordInput.parentElement.classList.remove("success");
      passwordInput.parentElement.classList.add("error");
      passwordInput.nextElementSibling.style.display = "block";
      passwordValid = false;
    } else {
      passwordInput.parentElement.classList.remove("error");
      passwordInput.parentElement.classList.add("success");
      passwordInput.nextElementSibling.style.display = "none";
    }

    if (
      passwordInput.value === "" ||
      confirmPasswordInput.value !== passwordInput.value ||
      confirmPasswordInput.value.length < 10
    ) {
      confirmPasswordInput.parentElement.classList.remove("success");
      confirmPasswordInput.parentElement.classList.add("error");
      confirmPasswordInput.nextElementSibling.style.display = "block";
      confirmPasswordValid = false;
    } else {
      confirmPasswordInput.parentElement.classList.remove("error");
      confirmPasswordInput.parentElement.classList.add("success");
      confirmPasswordInput.nextElementSibling.style.display = "none";
    }

    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      // submit form
      form.submit();
    } else {
      // display flash error message
      console.log(
        "Form validation failed. Please check your inputs and try again."
      );
      showErrorBanner(
        "Form validation failed. Please check your inputs and try again."
      );
    }
  });
}

function showErrorBanner(message) {
  const banner = document.getElementById("alert-banner");
  banner.textContent = message;
  banner.classList.add("show");
  setTimeout(() => {
    banner.classList.remove("show");
  }, 5000);
}
