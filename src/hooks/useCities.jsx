import { useEffect, useState } from "react";

export const useCities = ({ state }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!state) return;

    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`)
      .then((response) => response.json())
      .then((data) => setCities(data))
  }, [state]);

  return {
    cities
  };
};