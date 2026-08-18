const form = document.querySelector("#card-form");
const completeState = document.querySelector("#complete-state");
const continueButton = document.querySelector("#continue-button");

const nameInput = document.querySelector("#cardholder-name");
const numberInput = document.querySelector("#card-number");
const monthInput = document.querySelector("#exp-month");
const yearInput = document.querySelector("#exp-year");
const cvcInput = document.querySelector("#cvc");

const cardName = document.querySelector("[data-card-name]");
const cardNumber = document.querySelector("[data-card-number]");
const cardMonth = document.querySelector("[data-card-month]");
const cardYear = document.querySelector("[data-card-year]");
const cardCvc = document.querySelector("[data-card-cvc]");

const errors = {
  cardholderName: document.querySelector('[data-error="cardholderName"]'),
  cardNumber: document.querySelector('[data-error="cardNumber"]'),
  expiration: document.querySelector('[data-error="expiration"]'),
  cvc: document.querySelector('[data-error="cvc"]')
};

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function setError(input, errorElement, message) {
  input.classList.toggle("input-error", Boolean(message));
  errorElement.textContent = message;
}

function updateCardPreview() {
  cardName.textContent = nameInput.value.trim() || "Jane Appleseed";
  cardNumber.textContent = numberInput.value || "0000 0000 0000 0000";
  cardMonth.textContent = monthInput.value || "00";
  cardYear.textContent = yearInput.value || "00";
  cardCvc.textContent = cvcInput.value || "000";
}

nameInput.addEventListener("input", updateCardPreview);
monthInput.addEventListener("input", updateCardPreview);
yearInput.addEventListener("input", updateCardPreview);
cvcInput.addEventListener("input", updateCardPreview);

numberInput.addEventListener("input", () => {
  numberInput.value = formatCardNumber(numberInput.value);
  updateCardPreview();
});

function validateForm() {
  let isValid = true;

  const name = nameInput.value.trim();
  const number = numberInput.value.replace(/\s/g, "");
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();
  const cvc = cvcInput.value.trim();

  setError(nameInput, errors.cardholderName, "");
  setError(numberInput, errors.cardNumber, "");
  setError(monthInput, errors.expiration, "");
  setError(yearInput, errors.expiration, "");
  setError(cvcInput, errors.cvc, "");

  if (!name) {
    setError(nameInput, errors.cardholderName, "Can't be blank");
    isValid = false;
  }

  if (!number) {
    setError(numberInput, errors.cardNumber, "Can't be blank");
    isValid = false;
  } else if (!/^\d{16}$/.test(number)) {
    setError(numberInput, errors.cardNumber, "Wrong format, numbers only");
    isValid = false;
  }

  if (!month || !year) {
    setError(monthInput, errors.expiration, "Can't be blank");
    setError(yearInput, errors.expiration, "Can't be blank");
    isValid = false;
  } else if (!/^\d{2}$/.test(month) || Number(month) < 1 || Number(month) > 12) {
    setError(monthInput, errors.expiration, "Enter a valid month");
    isValid = false;
  } else if (!/^\d{2}$/.test(year)) {
    setError(yearInput, errors.expiration, "Enter a valid year");
    isValid = false;
  }

  if (!cvc) {
    setError(cvcInput, errors.cvc, "Can't be blank");
    isValid = false;
  } else if (!/^\d{3}$/.test(cvc)) {
    setError(cvcInput, errors.cvc, "Wrong format");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  form.hidden = true;
  completeState.hidden = false;
});

continueButton.addEventListener("click", () => {
  form.reset();
  updateCardPreview();

  Object.values(errors).forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll(".input-error").forEach((input) => {
    input.classList.remove("input-error");
  });

  completeState.hidden = true;
  form.hidden = false;
  nameInput.focus();
});
