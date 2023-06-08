(function(){
    const form = document.querySelector('form');
    const nameInput = document.querySelector('#name');
    const cardInput = document.querySelector('#card');
    const expDate = document.querySelector('#mm');
    const inputAno = document.querySelector('#yy');
    const cvc = document.querySelector('#cvc');
    const novoCvc = document.querySelector('.cardBack p');
  
    form.addEventListener('submit', function(e){
      e.preventDefault();
      enviarForm();
    });
  
    function enviarForm(){
      if(validarFormulario()){
        localStorage.setItem('numberCard', cardInput.value);
        localStorage.setItem('nameCard', nameInput.value);
        localStorage.setItem('cvcCard', cvc.value);
        localStorage.setItem('mesCard', expDate.value);
        localStorage.setItem('anoCard', inputAno.value);
        form.submit();
      }
    }
  
    function validarCampo(input, regex, erroSelector) {
      const erroElemento = document.querySelector(erroSelector);
  
      if (!input.value || !regex.test(input.value)) {
        erroElemento.style.display = 'block';
        input.style.border = '1px solid orange';
        return false;
      } else {
        erroElemento.style.display = 'none';
        input.style.border = '1px solid #bdbdbd';
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
      const expMesValido = validarCampo(expDate, regexMes, '.erroMes');
      const expAnoValido = validarCampo(inputAno, regexAno, '.erroAno');
      const cvcValido = validarCampo(cvc, regexCVC, '.erroCvc');
  
      return nomeValido && cardValido && expMesValido && expAnoValido && cvcValido;
    }
  
    function limitarNameCard(){
      if(nameInput.value.length > 25){
        nameInput.value = nameInput.value.slice(0, 30);
      }
    }
    
    function limitarTamanhoCartao() {
        if (cardInput.value.length > 16) {
            cardInput.value = cardInput.value.slice(0, 16);
      }
    }
  
    function limitarCvc(){
      if(cvc.value.length > 3){
        cvc.value = cvc.value.slice(0,3);
      }
    }
  
    function limitarAnoeMes() {
      if (expDate.value.length > 2) {
        expDate.value = expDate.value.slice(0, 2);
      }
  
      if (inputAno.value.length > 2) {
        inputAno.value = inputAno.value.slice(0, 2);
      }
  
      atualizarMeseAno();
    }
  
    function atualizarNumber() {
      const numerosCartao = cardInput.value.padEnd(16, '0').slice(0, 16);
      const spans = document.querySelectorAll('.zeros span');
  
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const numberZero = numerosCartao.substr(i * 4, 4);
        span.textContent = numberZero;
      }
    }
  
    function atualizarName() {
      const nomeCartao = nameInput.value;
      const nomeElemento = document.querySelector('.dados');
  
      if (nomeCartao.trim() !== '') {
        nomeElemento.textContent = nomeCartao.toUpperCase();
      } else {
        nomeElemento.textContent = 'Jane Appleseed';
      }
    }
  
    function atualizarCvc(){
      const cartaoCvc = cvc.value.padEnd(3, '0').slice(0, 3);
      novoCvc.textContent = cartaoCvc;
    }
  
    function atualizarMeseAno(){
      const mes = expDate.value;
      const ano = inputAno.value;
      const novoMesAno = document.querySelectorAll('.zeros2');
  
      novoMesAno.forEach(element => {
        element.textContent = `${mes}/${ano}`;
      });
    }
    
    function digitarInput() {
      this.nextElementSibling.style.display = 'none';
      this.style.border = '1px solid #bdbdbd';
    }
    nameInput.addEventListener('input', digitarInput);
    nameInput.addEventListener('input', limitarNameCard);
    nameInput.addEventListener('input', atualizarName);
    cardInput.addEventListener('input', digitarInput);
    cardInput.addEventListener('input', limitarTamanhoCartao);
    cardInput.addEventListener('input', atualizarNumber);
    expDate.addEventListener('input', digitarInput);
    expDate.addEventListener('input', atualizarMeseAno);
    expDate.addEventListener('input', limitarAnoeMes);
    inputAno.addEventListener('input', digitarInput);
    inputAno.addEventListener('input', limitarAnoeMes);
    inputAno.addEventListener('input', limitarAnoeMes);
    inputAno.addEventListener('input', atualizarMeseAno);
    cvc.addEventListener('input', digitarInput);
    cvc.addEventListener('input', atualizarCvc);
    cvc.addEventListener('input', limitarCvc);
  
  })();
  