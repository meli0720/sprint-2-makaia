//capturo los elementos de mi html
// CARDHOLDER NAME
let nametarjeta = document.querySelector('.tarjeta_details-name');
let inputName = document.querySelector('#cardholder');
let errorName = document.querySelector('.forms_cardholder--error');

// CARD NUMBER
let numbertarjeta = document.querySelector('.tarjeta_number');
let inputNumber = document.querySelector('#cardNumber');
let errorNumber = document.querySelector('.forms_inputnumber--error');

// MM
let monthtarjeta = document.querySelector('.tarjeta_month');
let inputmonth = document.querySelector('#cardMonth');
let errorMonth = document.querySelector('.forms_input-mm--error');

// YY
let yeartarjeta = document.querySelector('.tarjeta_year');
let inputYear = document.querySelector('#cardYear');
let errorYear = document.querySelector('.forms_input-yy--error');

// CVC
let cvctarjeta = document.querySelector('.tarjeta-back_cvc');
let inputcvc = document.querySelector('#cardCvc');
let errorcvc = document.querySelector('.forms_input-cvc--error');

// Ingreso  nombre del propietario + evento escuchador 
inputName.addEventListener('input', () => {
    if (inputName.value == '') {
        nametarjeta.innerText = 'JANE APPLESEED'
    } else {
        nametarjeta.innerText = inputName.value;
    }
});

//Ingreso numero de la tarjeta  + evento escuchador 
inputNumber.addEventListener('input', () => {



    // en caso de que haya una letra 
    let hallazgo = /[A-z]/g;
    if (hallazgo.test(inputNumber.value)) {
        showError(inputNumber, errorNumber, 'ingreso incorrecto, solo NUMEROS');
    } else {
        // borrando espacios ingresados por el usuario, agregando espacios cada 4 digitos, y borrando el espacio final
        inputNumber.value = inputNumber.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(inputNumber, errorNumber, '', false);
    }

    // pintando en la tarjeta el numero ingresado 
    numbertarjeta.innerText = inputNumber.value;

    // pontando los 0 por defecto 
    if (inputNumber.value == '') {
        numbertarjeta.innerText = '0000 0000 0000 0000';
    }
});

// Ingreso  del mes de vencimiento de la tarjeta 
inputmonth.addEventListener('input', () => {
    monthtarjeta.innerText = inputmonth.value;
    validateLetters(inputmonth, errorMonth);
});

// Ingreso del año de vencimiento de la tarjeta 
inputYear.addEventListener('input', () => {
    yeartarjeta.innerText = inputYear.value;
    validateLetters(inputYear, errorYear);
});

// Ingreso de cvc
inputcvc.addEventListener('input', () => {
    cvctarjeta.innerText = inputcvc.value;
    validateLetters(inputcvc, errorcvc);
});


// Boton de confirmacion

let button_check = document.querySelector('.forms_submit')

let name_check = false;
let number_check = false;
let month_check = false;
let year_check = false;
let cvc_check = false;


let sectiontwo_forms = document.querySelector('.forms');
let sectionthree_thanks = document.querySelector('.sectionThreeThanks');

button_check.addEventListener('click', event => {
    event.preventDefault();

    // Validar nombre ingresado en el formulario 
    if (verifyIsFilled(inputName, errorName)) {
        name_check = true;
    } else {
        name_check = false;
    }

    // Validar numero de tarjeta  ingresado en el formulario
    if (verifyIsFilled(inputNumber, errorNumber) == true) {
        if (inputNumber.value.length == 19) {
            showError(inputNumber, errorNumber, '', false);
            number_check = true;
        } else {
            showError(inputNumber, errorNumber, 'numero incorrecto');
            number_check = false;
        }
    }

    // Validar mes ingresado en el formulario
    if (verifyIsFilled(inputmonth, errorMonth)) {
        if (parseInt(inputmonth.value) > 0 && parseInt(inputmonth.value) <= 12) {
            showError(inputmonth, errorMonth, '', false);
            month_check = true;
        } else {
            showError(inputmonth, errorMonth, 'mes incorrecto ');
            month_check = false;
        }
    }

    // Validar mes ingresado en el formulario
    if (verifyIsFilled(inputYear, errorYear)) {
        if (parseInt(inputYear.value) > 22 && parseInt(inputYear.value) <= 27) {
            showError(inputYear, errorYear, '', false);
            year_check = true;
        } else {
            showError(inputYear, errorYear, 'año incorrecto');
            year_check = false;
        }
    }

    // Validar clave ingresada en el formulario
    if (verifyIsFilled(inputcvc, errorcvc)) {
        if (inputcvc.value.length == 3) {
            showError(inputcvc, errorcvc, '', false);
            cvc_check = true;
        } else {
            showError(inputcvc, errorcvc, 'clave incorrecta');
            cvc_check = false;
        }
    }

    if (name_check == true && number_check == true && month_check == true && year_check == true && cvc_check == true) {
        sectiontwo_forms.style.display = 'none';
        sectionthree_thanks.style.display = 'block';
    }

});


// Funciones callbacks: 

function showError(divInput, divError, msgError, show = true) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "Debe llenar todos los espacios");
        return false;
    }
}

function validateLetters(input, divError) {
    let hallazgo = /[A-z]/g;
    if (hallazgo.test(input.value)) {
        showError(input, divError, 'ingreso incorrecto, solo NUMEROS');
    } else {
        showError(input, divError, '', false);
    }
}