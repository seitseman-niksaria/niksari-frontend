import { MODELS_API, INSTRUCTIONS_API } from '@env';

// HTTP GET request for all avaible futniture models
export const fetchModels = async () => {
  try {
    const resp = await fetch(MODELS_API);
    return await resp.json();
  } catch (err) {
    return console.error(err);
  }
};

// HTTP GET request for all avaible instructions
export const fetchInstructions = async () => {
  try {
    const resp = await fetch(INSTRUCTIONS_API);
    return await resp.json();
  } catch (err) {
    return console.error(err);
  }
};
