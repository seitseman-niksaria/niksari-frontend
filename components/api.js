// HTTP GET request for all avaible futniture models
export const fetchModels = async () => {
  try {
    const resp = await fetch('http://127.0.0.1:8000/furniture-models/');
    return await resp.json();
  } catch (err) {
    return console.error(err);
  }
};

// HTTP GET request for all avaible instructions
export const fetchInstructions = async () => {
  try {
    const resp = await fetch('http://127.0.0.1:8000/instructions/');
    return await resp.json();
  } catch (err) {
    return console.error(err);
  }
};
