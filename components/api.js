export const fetchModels = async () => {
    try {
        const resp = await fetch('http://127.0.0.1:8000/furniture-models/');
        return await resp.json();
    } catch (err) {
        return console.error(err);
    }
  };
  
  export const fetchInstructions = async () => {
    try {
          const resp = await fetch('http://127.0.0.1:8000/instructions/');
          return await resp.json();
      } catch (err) {
          return console.error(err);
      }
  };
  