export const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    if (rest !== parseInt(cpf.charAt(9))) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) {
        rest = 0;
    }

    return rest === parseInt(cpf.charAt(10));
};