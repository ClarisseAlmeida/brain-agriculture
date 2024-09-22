export const validateCnpj = (cnpj) => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    const sanitizedCnpj = String(cnpj).replace(/[^\d]/g, '');

    if (sanitizedCnpj.length !== 14) {
        return false;
    }

    if (/^0{14}$/.test(sanitizedCnpj)) {
        return false;
    }

    const calculateCheckDigit = (digits, length) => {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += digits[i] * weights[i + (weights.length - length)];
        }
        return (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    };

    const firstCheckDigit = calculateCheckDigit(sanitizedCnpj, 12);
    if (sanitizedCnpj[12] != firstCheckDigit) {
        return false;
    }

    const secondCheckDigit = calculateCheckDigit(sanitizedCnpj, 13);
    if (sanitizedCnpj[13] != secondCheckDigit) {
        return false;
    }

    return true;
};