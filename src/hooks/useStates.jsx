import { useEffect, useState } from "react";

export const useStates = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("https://brasilapi.com.br/api/ibge/uf/v1")
      .then((response) => response.json())
      .then((data) => setStates(data));
  }, []);

  return {
    states
  };
};