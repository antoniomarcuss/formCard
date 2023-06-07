const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const cardInput = document.querySelector('#card');
const expDate = document.querySelector('#mm');
const inputAno = document.querySelector('#yy');
const cvc = document.querySelector('#cvc');

form.addEventListener('submit', function(e){
  e.preventDefault();
  enviarForm();
});

function enviarForm(){
  if(validarFormulario()){
    localStorage.setItem('numberCard', cardInput.value);
    localStorage.setItem('nameCard', nameInput.value)
    localStorage.setItem('cvcCard', cvc.value)
    localStorage.setItem('mesCard', expDate.value)
    localStorage.setItem('anoCard', inputAno.value)
    form.submit();
  }
}

function validarCampo(input, regex, erroSelector) {
  const erroElemento = document.querySelector(erroSelector);
  
  if (!input.value || !regex.test(input.value)) {
    erroElemento.style.display = 'block';
    return false;
  } else {
    erroElemento.style.display = 'none';
    return true;
  }
}

function validarFormulario() {
  const regexLetras = /^[A-Za-z\s]{4,}$/; // Expressão regular que permite apenas letras e espaços
  const regexNum = /^\d{16}$/; // Expressão regular para 16 dígitos numéricos
  const regexMes = /^(0?[1-9]|1[0-2])$/;
  const regexAno = /^\d{2}$/;
  const regexCVC = /^[0-9]{3,4}$/;
  
  const nomeValido = validarCampo(nameInput, regexLetras, '.erroName');
  const cardValido = validarCampo(cardInput, regexNum, '.erroCard');
  const expDateValido = validarCampo(expDate, regexMes, '.erroMes') && validarCampo(inputAno, regexAno, '.erroAno');
  const cvcValido = validarCampo(cvc, regexCVC, '.erroCvc');
  
  return nomeValido && cardValido && expDateValido && cvcValido;
}

nameInput.addEventListener('input', digitarInput);
cardInput.addEventListener('input', digitarInput);
expDate.addEventListener('input', digitarInput);
inputAno.addEventListener('input', digitarInput);
cvc.addEventListener('input', digitarInput);

function digitarInput() {
  this.nextElementSibling.style.display = 'none';
}
