//live validation
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

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
  }
});
