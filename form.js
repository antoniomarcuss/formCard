const formContainer = document.querySelector('.form')
const nameCard = document.querySelector('.dados')
const mesCard = document.querySelector('.mes')
const anoCard = document.querySelector('.ano')
const spans = document.querySelectorAll('.zeros span');
const cvcCard = document.querySelector('.cardBack p')
const formSent = document.querySelector('.form-sent')

const validateFild = (inputElement, regex) => {
  const errorMessage = inputElement.nextElementSibling;
  if (!regex.test(inputElement.value)) {
    errorMessage.classList.remove('hidden');
    inputElement.classList.add('inputErro');
    return false;
  }
  errorMessage.classList.add('hidden');
  inputElement.classList.remove('inputErro');
  return true;
}

const validateNameInput = (inputName) => {
  const nameRegex = /^[A-Za-z ]{4,20}$/
  return validateFild(inputName, nameRegex)
}

const validateCardInput = cardInput => {
  const numberCardRegex = /^\d{16}$/
  return validateFild(cardInput, numberCardRegex)
}

const validateMesInput = mesInput => {
  const mesRegex = /^(0?[1-9]|1[0-2])$/
  return validateFild(mesInput, mesRegex)
}

const validateAnoInput = anoInput => {
  const anoRegex = /^(15|1[6-9]|[2-3]\d|45)$/
  return validateFild(anoInput, anoRegex)
}

const validateCvcInput = cvcInput => {
  const cvcRegex = /^\d{3}$/
  return validateFild(cvcInput, cvcRegex)
}

const validateInputs = inputValue => { 
  const isNameValid = validateNameInput(inputValue.name);
  const isCardValid = validateCardInput(inputValue.card);
  const isMesValid = validateMesInput(inputValue.mes);
  const isAnoValid = validateAnoInput(inputValue.ano);
  const isCvcValid = validateCvcInput(inputValue.cvc); 
  return isNameValid && isCardValid && isMesValid && isAnoValid && isCvcValid;
}

const sendForm =  inputValue =>{
  if(validateInputs(inputValue)){
    formContainer.classList.add('hidden')
    formSent.classList.remove('hidden')
  }else{
    formSent.classList.add('hidden')
  }
}

formContainer.addEventListener('submit', event =>{
  event.preventDefault()
  const inputValue = event.target
  sendForm(inputValue)
})

formContainer.name.addEventListener('input', event => {
  let inputName = event.target;
  if (inputName.value.length > 20) {
    inputName.value = inputName.value.slice(0, 20);
  }
  if (!inputName.value) {
    nameCard.textContent = 'Preencha o campo Name';
    validateNameInput(inputName);
  } else {
    nameCard.textContent = inputName.value.toUpperCase();
    validateNameInput(inputName);
  }
});

formContainer.card.addEventListener('input', event => {
  let inputCard = event.target.value.padEnd(16, '0');
  if (inputCard.length > 16) {
    inputCard = inputCard.slice(0, 16);
    event.target.value = inputCard
  }
  spans.forEach((span, i) => {
    const numberZero = inputCard.substr(i * 4, 4);
    span.textContent = numberZero;
  });
  validateCardInput(event.target);
});

const modifyMonthAndYearTextCard = (inputValue, inputElement) =>{
  let modifiedValue = inputValue.value.padEnd(1,'0').slice(0,2)
  inputElement.textContent = modifiedValue
}

formContainer.mes.addEventListener('input', event => {
  let inputValue = event.target.value;
  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2);
    event.target.value = inputValue;
  }
  modifyMonthAndYearTextCard(event.target, mesCard);
  validateMesInput(event.target);
});

formContainer.ano.addEventListener('input', event => {
  let inputValue = event.target.value;
  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2);
    event.target.value = inputValue;
  }
  modifyMonthAndYearTextCard(event.target, anoCard);
  validateAnoInput(event.target);
});

formContainer.cvc.addEventListener('input', event => {
  let inputValue = event.target.value;
  if (inputValue.length > 3) {
    inputValue = inputValue.slice(0, 3);
    event.target.value = inputValue;
  }
  cvcCard.textContent = inputValue;
  validateCvcInput(event.target);
});

formSent.addEventListener('submit',event => {
  event.preventDefault()
  formContainer.classList.remove('hidden')
  formSent.classList.add('hidden')
  location.reload()
})


