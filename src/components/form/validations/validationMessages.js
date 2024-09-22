import { validateCnpj } from "./validateCnpj";
import { validateCpf } from "./validateCpf";

export const validationMessageIdentificationField = (identity) => {
    if (identity.length < 14) {
        return "Quantidade de caracteres insuficiente";
    }

    const isCpf = identity.length === 14;
    const isCnpj = identity.length > 14;

    if (isCpf && !validateCpf(identity)) {
        return "CPF inválido";
    }

    if (isCnpj && !validateCnpj(identity)) {
        return "CNPJ inválido";
    }

    return "";
};

export const validateSumOfAgriculturalAndVegetationArea = (value, totalArea, agriculturalArea, vegetationArea) => {
    const totalAreaNumber = parseFloat(totalArea);
    const totalAgriculturalAreaNumber = parseFloat(agriculturalArea);
    const totalVegetationAreaNumber = parseFloat(vegetationArea);

    const sumAgriculturalAndVegetationArea = totalAgriculturalAreaNumber + totalVegetationAreaNumber;

    if (value === 0) return "";

    if (value > totalAreaNumber) {
        return "Esta área não pode ser maior que a área total";
    }

    if (sumAgriculturalAndVegetationArea > totalAreaNumber) {
        return "A soma da área agricultável e da área de vegetação não pode exceder a área total";
    }

    return "";
}