import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./definitions";

export const ruralProducersSlice = createSlice({
  name: "ruralProducers",
  initialState: initialState,
  reducers: {
    addRuralProducer: (ruralProducers, action) => {
      let newRuralProducer = action.payload;
      newRuralProducer.id = ruralProducers.length ? Math.max(...ruralProducers.map(ruralProducer => ruralProducer.id)) + 1 : 1;
      ruralProducers.push(newRuralProducer);
    },
    eraseRuralProducer: (ruralProducers, action) => {
      return ruralProducers.filter(ruralProducers => ruralProducers.id != action.payload);
    },    
    editRuralProducer: (ruralProducers, action) => { 
      const { id, newRuralProducer } = action.payload;
      const item = ruralProducers.find(ruralProducer => ruralProducer.id === id);
      if (item) {
          item.identity = newRuralProducer.identity;
          item.producerName = newRuralProducer.producerName;
          item.farmName = newRuralProducer.farmName;
          item.city = newRuralProducer.city;
          item.state = newRuralProducer.state;
          item.totalArea = newRuralProducer.totalArea;
          item.agriculturalArea = newRuralProducer.agriculturalArea;
          item.vegetationArea = newRuralProducer.vegetationArea;
          item.plantedCrops = newRuralProducer.plantedCrops;
      }
    }
  }
})

export const { addRuralProducer, eraseRuralProducer, editRuralProducer } = ruralProducersSlice.actions;

export const selectRuralProducers = state => state.ruralProducers;

export default ruralProducersSlice.reducer;