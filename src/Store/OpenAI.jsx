import { updateData } from './Database'
import axios from 'axios'

// get data from api
export const getDataFromChatGPT = async (input) => {
  const params = new URLSearchParams({
    data: JSON.stringify(input),
  }).toString()
  const link = `${import.meta.env.VITE_APP_API_LINK}/gpt/get-answer?${params}`
  const data = await axios
    .get(link)
    .then((data) => data.data)
    .catch((error) => error.response.data.body)

  // const data = await axios
  //   .put(link, input)
  //   .then((data) => data.data)
  //   .catch((error) => error.response.data.body);

  // const url = `http://localhost:3000/tes?${params}`;

  // console.log(data);
  return data
}

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

    const data = await getDataFromChatGPT(templateUser)
    if (data) {
      updateData(path, [...templateUser, data])
    } else {
      const templateError = { role: 'assistant', content: 'error' }
      updateData(path, templateError)
    }
  }
}
