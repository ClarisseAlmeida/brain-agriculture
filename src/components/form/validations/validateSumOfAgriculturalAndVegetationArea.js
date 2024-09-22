export const validateSumOfAgriculturalAndVegetationArea = (totalArea, agriculturalArea, vegetationArea) => {

    if ((agriculturalArea + vegetationArea) > totalArea) {
        return true;
    }

    return false;
}

    