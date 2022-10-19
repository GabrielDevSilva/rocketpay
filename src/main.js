import "./css/index.css";
import IMask from "imask";


const securityCode = document.querySelector('#security-code');
const securityCodeMask = {
    mask: '0000'
}

const securityCodeMasked = IMask(securityCode, securityCodeMask);

const expirationCode = document.querySelector('#expiration-date');
const expirationCodeMask = {
    mask: 'MM{/}YY',
    blocks:{
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY:{
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 15).slice(2)
        }
    }
};

const expirationCodeMasked = IMask(expirationCode, expirationCodeMask);

const cardNumber = document.querySelector('#card-number');

const cardNumberMask = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            cardType: 'visa',
            regex: /^4\d{0,15}/
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'mastercard',
            regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/
        },
        {
            mask: '0000 0000 0000 0000',
            regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
            cardType: 'maestro'
        },
        {
            mask: '0000 000000 0000',
            regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
            cardType: 'diners'
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'default',
        },
    ],
    dispatch: (appended, dynamicMasked)=> {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(({regex})=>number.match(regex))
    }
}

const cardNumberMasked = IMask(cardNumber, cardNumberMask)

