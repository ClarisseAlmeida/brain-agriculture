import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRuralProducer, eraseRuralProducer, editRuralProducer } from "../../store/ruralProducers/slice.js";
import { useStates } from "../../hooks/useStates.jsx";
import { useCities } from "../../hooks/useCities.jsx";
import CustomInput from "../customInput/index.jsx";
import "./index.scss";
import CustomSelect from "../customSelect/index.jsx";
import CustomCheckbox from "../customCheckbox/index.jsx";
import Button from "../button/index.jsx";
import { numberFields, plantedCropOptions } from "./definitions.js";
import { cnpjMask, cpfMask, numberMask } from "./masks.js";
import { validationMessageIdentificationField, validateSumOfAgriculturalAndVegetationArea } from "./validations/validationMessages.js";

const Form = ({ ruralProducer }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identity: ruralProducer?.identity || "",
        producerName: ruralProducer?.producerName || "",
        farmName: ruralProducer?.farmName || "",
        totalArea: ruralProducer?.totalArea || 0,
        agriculturalArea: ruralProducer?.agriculturalArea || 0,
        vegetationArea: ruralProducer?.vegetationArea || 0,
        state: ruralProducer?.state || "",
        city: ruralProducer?.city || ""
    });
    const [selectedPlantedCrops, setSelectedPlantedCrops] = useState(ruralProducer?.plantedCrops || []);
    const [errors, setErrors] = useState({});

    const { states } = useStates();
    const { cities } = useCities(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === "identity") {
            newValue = value.length <= 14 ? cpfMask(value) : cnpjMask(value);
        }

        if (numberFields.includes(name)) {
            newValue = numberMask(value);
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }));

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const handleCheckboxChange = (plantation) => {
        setSelectedPlantedCrops((prevSelected) => {
            if (prevSelected.includes(plantation)) {
                return prevSelected.filter((item) => item !== plantation);
            } else {
                return [...prevSelected, plantation];
            }
        });
    };

    const handleRegistrationRuralProducer = (newRuralProducer) => {
        dispatch(addRuralProducer(newRuralProducer));
        alert("Produtor rural criado com sucesso.");
        navigate("/");
    };

    const handleEditingRuralProducer = (newRuralProducer) => {
        dispatch(editRuralProducer({ id: parseInt(ruralProducer.id), newRuralProducer }))
        alert("Produtor rural editado com sucesso.");
        navigate("/");
    };

    const handleEraseRuralProducer = (id, name) => {
        if (confirm(`Tem certeza de que deseja excluir o produtor ${name}?`)) {
            dispatch(eraseRuralProducer(id));
            navigate("/");
        }
    };

    const handleSubmit = (e, isEdit) => {
        e.preventDefault();

        if (validateForm()) {
            const newRuralProducer = {
                identity: formData.identity,
                producerName: formData.producerName,
                farmName: formData.farmName,
                city: formData.city,
                state: formData.state,
                totalArea: parseFloat(formData.totalArea),
                agriculturalArea: parseFloat(formData.agriculturalArea) || 0,
                vegetationArea: parseFloat(formData.vegetationArea) || 0,
                plantedCrops: selectedPlantedCrops
            }

            isEdit ? 
                handleEditingRuralProducer(newRuralProducer) : 
                handleRegistrationRuralProducer(newRuralProducer);
        }
    }

    const handleIdentityFieldValidation = (e) => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: validationMessageIdentificationField(value)
        });
    };

    const handleAreaFieldValidation = (e) => {
        const { name, value } = e.target;

        setErrors({
            ...errors,
            [name]: validateSumOfAgriculturalAndVegetationArea(value, 
                formData.totalArea, 
                formData.agriculturalArea, 
                formData.vegetationArea
            )
        });
    };

    const validateForm = () => {
        const { agriculturalArea, vegetationArea } = formData;

        const requiredFields = {
            identity: formData.identity,
            producerName: formData.producerName,
            farmName: formData.farmName,
            totalArea: formData.totalArea,
            state: formData.state,
            city: formData.city,
        }

        let newErrors = {};

        for (const key in requiredFields) {
            if (!requiredFields[key]) {
                newErrors[key] = "Campo é obrigatório";
            }
        }

        if (requiredFields.identity && validationMessageIdentificationField(requiredFields.identity)) {
            newErrors.identity = validationMessageIdentificationField(requiredFields.identity);
        }

        const validateAgriculturalArea = validateSumOfAgriculturalAndVegetationArea(agriculturalArea, 
            requiredFields.totalArea, 
            agriculturalArea, 
            vegetationArea
        );

        const validateVegetationArea = validateSumOfAgriculturalAndVegetationArea(vegetationArea, 
            requiredFields.totalArea, 
            agriculturalArea, 
            vegetationArea
        )

        if (validateAgriculturalArea || validateVegetationArea) {
            newErrors.agriculturalArea = validateAgriculturalArea;

            newErrors.vegetationArea = validateVegetationArea;

        }

        setErrors({ ...newErrors });

        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <form>
                <div className="form-wrapper">
                    <div className="form-halfColumn">
                        <CustomInput
                            label="CPF/CNPJ*:"
                            type={"text"}
                            name="identity"
                            placeholder={"Digite o CPF ou CNPJ do produtor"}
                            value={formData.identity}
                            onChange={handleInputChange}
                            onBlur={handleIdentityFieldValidation}
                            error={errors.identity}
                        />
                    </div>
                    <div className="form-halfColumn ">
                        <CustomInput
                            label="Nome do produtor*:"
                            type={"text"}
                            name="producerName"
                            placeholder={"Digite o nome do produtor"}
                            value={formData.producerName}
                            onChange={handleInputChange}
                            error={errors.producerName}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-halfColumn">
                        <CustomSelect
                            label="Estado*:"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Selecione o estado"
                            error={errors.state}
                        >
                            {states.map((estado) => (
                                <option key={estado.id} value={estado.sigla}>
                                    {estado.nome}
                                </option>
                            ))}
                        </CustomSelect>
                    </div>
                    <div className="form-halfColumn">
                        <CustomSelect
                            label="Cidade*:"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Selecione a cidade"
                            error={errors.city}
                            disabled={!formData.state}
                        >
                            {cities.map((cidade) => (
                                <option key={cidade.codigo_ibge}>{cidade.nome}</option>
                            ))}
                        </CustomSelect>
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-halfColumn">
                        <CustomInput
                            label="Nome da Fazenda*:"
                            type={"text"}
                            name="farmName"
                            placeholder={"Digite o nome da fazenda"}
                            value={formData.farmName}
                            onChange={handleInputChange}
                            error={errors.farmName}
                        />
                    </div>
                    <div className="form-halfColumn">
                        <CustomInput
                            label="Área total em hectares da fazenda*:"
                            type={"number"}
                            name="totalArea"
                            placeholder={"Digite a área total em hectares"}
                            value={formData.totalArea}
                            onChange={handleInputChange}
                            error={errors.totalArea}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-halfColumn form-tooltip">
                        {
                            !formData.totalArea && 
                            <span className="form-tooltip-text">Preencha a área total para habilitar o campo</span>
                        }
                        <CustomInput
                            label="Área agricultável em hectares:"
                            type={"number"}
                            name="agriculturalArea"
                            placeholder={"Digite a área agricultável em hectares"}
                            value={formData.agriculturalArea}
                            onChange={handleInputChange}
                            error={errors.agriculturalArea}
                            onBlur={handleAreaFieldValidation}
                            disabled={!formData.totalArea}
                        />
                    </div>
                    <div className="form-halfColumn form-tooltip">
                        {
                            !formData.totalArea && 
                            <span className="form-tooltip-text">Preencha a área total para habilitar o campo</span>
                        }
                        <CustomInput
                            label="Área de vegetação em hectares:"
                            type={"number"}
                            name="vegetationArea"
                            placeholder={"Digite a área vegetação em hectares"}
                            value={formData.vegetationArea}
                            onChange={handleInputChange}
                            error={errors.vegetationArea}
                            onBlur={handleAreaFieldValidation}
                            disabled={!formData.totalArea}
                        />
                    </div>
                </div>

                <CustomCheckbox>
                    {plantedCropOptions.map((item, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={selectedPlantedCrops.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>{item}</label>
                        </li>
                    ))}
                </CustomCheckbox>

                <div className="form-wrapper form-container">
                    {
                        !ruralProducer ?
                            <Button text={"Cadastrar"} onClick={(e) => handleSubmit(e)} /> :
                            <>
                                <Button text={"Excluir"}
                                    onClick={() => handleEraseRuralProducer(ruralProducer.id, ruralProducer.producerName)}
                                    ghost
                                />
                                <Button text={"Editar"} onClick={(e) => handleSubmit(e, true)} />
                            </>
                    }
                </div>
            </form>
            <p>Os campos com * são obrigatórios.</p>
        </>
    )
}

export default Form;
