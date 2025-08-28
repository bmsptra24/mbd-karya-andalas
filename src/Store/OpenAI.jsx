import { updateData } from './Database'
import axios from 'axios'

export const getDataFromGemini = async (input) => {
  const link = `${import.meta.env.VITE_APP_API_LINK}get-answer`;

  try {
    const response = await axios.post(link, input, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Gemini:", error.response?.data || error.message);
    return error.response?.data?.body || { role: 'assistant', content: 'Error...' };
  }
};

// get answer from api
export const getAnswer = async (path, log, input, setState, defaultSystem) => {
  // reset state
  setState('')

  if (input.length !== 0) {
    const templateUser = [
      defaultSystem,
      ...log,
      { content: input, role: 'user' },
    ]
    await updateData(path, templateUser)

    const data = await getDataFromGemini(templateUser)
    if (data) {
      updateData(path, [...templateUser, data])
    } else {
      const templateError = { role: 'assistant', content: 'error' }
      updateData(path, templateError)
    }
  }
}
