import { MODELS_API, INSTRUCTIONS_API, PREDICT_MODEL_API } from '@env';

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

// HTTP POST request for predicting the furniture model from image
export const fetchPostImage = async (formData) => {
  try {
    const resp = await fetch(PREDICT_MODEL_API, {
      headers: {
        Accept: 'application/json',
      },
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) {
      console.error('HTTP error:', resp.status);
      throw new Error(`HTTP error: ${resp.status}`);
    }

    return await resp.json();
    
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
