function getSession(key, input) {
  if (window.sessionStorage.getItem(key)) {
    input.value = window.sessionStorage.getItem(key);
  }
}

function sessionHandle(key, inputValue) {
  window.sessionStorage.setItem(key, inputValue);
}

let inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  getSession(input.getAttribute("name"), input);
});

// Display session values on the front of the card
let frontCardNumber = document.querySelector(".card.front .content p");
let frontCardName = document.querySelector(".card.front .content .details span");
let frontCardExpireMonth = document.querySelector(".card.front .content .details .expire-date-card .month");
let frontCardExpireYear = document.querySelector(".card.front .content .details .expire-date-card .year");
let backCardCVC = document.querySelector(".card.back span");

if (window.sessionStorage.getItem("number")) frontCardNumber.textContent = window.sessionStorage.getItem("number");
if (window.sessionStorage.getItem("name")) frontCardName.textContent = window.sessionStorage.getItem("name");
if (window.sessionStorage.getItem("expire-month")) frontCardExpireMonth.textContent = window.sessionStorage.getItem("expire-month");
if (window.sessionStorage.getItem("expire-year")) frontCardExpireYear.textContent = window.sessionStorage.getItem("expire-year");
if (window.sessionStorage.getItem("cvc")) backCardCVC.textContent = window.sessionStorage.getItem("cvc");

// Handle input events
let formFields = [
  { name: 'name', selector: ".details span", defaultValue: "JANE APPLESEED" },
  { name: 'number', selector: ".content p", defaultValue: "0000 0000 0000 0000" },
  { name: 'cvc', selector: ".card.back span", defaultValue: "000" },
  { name: 'expire-month', selector: ".expire-date-card .month", defaultValue: "00" },
  { name: 'expire-year', selector: ".expire-date-card .year", defaultValue: "00" }
];

formFields.forEach(field => {
  let inputElement = document.querySelector(`[name='${field.name}']`);
  inputElement.addEventListener("input", (e) => {
    document.querySelector(field.selector).textContent = e.target.value || field.defaultValue;
    sessionHandle(e.target.getAttribute("name"), e.target.value);
  });
});

document.forms[0].addEventListener("submit", (e) => {
  let valid = true;

  let cardHolderName = document.querySelector("[name='name']");
  if (cardHolderName.value.length < 2) {
    cardHolderName.style.borderColor = "hsl(0, 100%, 66%)";
    cardHolderName.nextElementSibling.style.display = "block";
    valid = false;
  } else {
    cardHolderName.nextElementSibling.style.display = "none";
    cardHolderName.style.borderColor = "var(--textColor)";
  }

  let cardNumber = document.querySelector("[name='number']");
  let cardNumberRe = /(\d{4}\s\d{4}\s\d{4}\s\d{4}|\d{16})/ig;
  if (!cardNumberRe.test(cardNumber.value)) {
    cardNumber.style.borderColor = "hsl(0, 100%, 66%)";
    cardNumber.nextElementSibling.style.display = "block";
    valid = false;
  } else {
    cardNumber.nextElementSibling.style.display = "none";
    cardNumber.style.borderColor = "var(--textColor)";
  }

  let expireMonth = document.querySelector("[name='expire-month']");
  if (expireMonth.value.length < 1) {
    expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
    expireMonth.parentElement.nextElementSibling.textContent = "Can't be blank";
    expireMonth.parentElement.nextElementSibling.style.display = "block";
    valid = false;
  } else {
    if (isNaN(expireMonth.value)) {
      expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
      expireMonth.parentElement.nextElementSibling.textContent = "Invalid Month";
      expireMonth.parentElement.nextElementSibling.style.display = "block";
      valid = false;
    } else if (expireMonth.value < 1 || expireMonth.value > 12) {
      expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
      expireMonth.parentElement.nextElementSibling.textContent = "Invalid Month";
      expireMonth.parentElement.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      expireMonth.parentElement.nextElementSibling.style.display = "none";
      expireMonth.style.borderColor = "var(--textColor)";
    }
  }

  let expireYear = document.querySelector("[name='expire-year']");
  if (expireYear.value.length < 1) {
    expireYear.style.borderColor = "hsl(0, 100%, 66%)";
    expireYear.parentElement.nextElementSibling.textContent = "Can't be blank";
    expireYear.parentElement.nextElementSibling.style.display = "block";
    valid = false;
  } else {
    if (expireYear.value < 22 || expireYear.value > 40) {
      expireYear.style.borderColor = "hsl(0, 100%, 66%)";
      expireYear.parentElement.nextElementSibling.textContent = "Invalid Year";
      expireYear.parentElement.nextElementSibling.style.display = "block";
      valid = false;
    } else if (isNaN(expireYear.value)) {
      expireYear.style.borderColor = "hsl(0, 100%, 66%)";
      expireYear.parentElement.nextElementSibling.textContent = "Invalid Year";
      expireYear.parentElement.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      expireYear.parentElement.nextElementSibling.style.display = "none";
      expireYear.style.borderColor = "var(--textColor)";
      if (expireMonth.value.length < 1) {
        expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
        expireMonth.parentElement.nextElementSibling.textContent = "Can't be blank";
        expireMonth.parentElement.nextElementSibling.style.display = "block";
        valid = false;
      } else {
        if (isNaN(expireMonth.value)) {
          expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
          expireMonth.parentElement.nextElementSibling.textContent = "Invalid Month";
          expireMonth.parentElement.nextElementSibling.style.display = "block";
          valid = false;
        } else if (expireMonth.value < 1 || expireMonth.value > 12) {
          expireMonth.style.borderColor = "hsl(0, 100%, 66%)";
          expireMonth.parentElement.nextElementSibling.textContent = "Invalid Month";
          expireMonth.parentElement.nextElementSibling.style.display = "block";
          valid = false;
        } else {
          expireMonth.parentElement.nextElementSibling.style.display = "none";
          expireMonth.style.borderColor = "var(--textColor)";
        }
      }
    }
  }

  let cvc = document.querySelector("[name='cvc']");
  if (cvc.value.length < 1) {
    cvc.style.borderColor = "hsl(0, 100%, 66%)";
    cvc.nextElementSibling.style.display = "block";
    valid = false;
  } else {
    cvc.nextElementSibling.style.display = "none";
    cvc.style.borderColor = "var(--textColor)";
  }

  if (valid) {
    e.preventDefault();
    document.forms[0].classList.add("submitted");
    document.querySelector(".complete-state").classList.add("active");
  } else {
    e.preventDefault();
  }
});
