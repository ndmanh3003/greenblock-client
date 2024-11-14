import axios from 'axios'

export const server = async (file: File) => {
  try {
    const fileData = new FormData()
    fileData.append('image', file as File)
    const responseData = await axios({
      method: 'POST',
      url: import.meta.env.VITE_API_ENDPOINT + 'upload',
      data: fileData,
      headers: {
        'Content-Type': 'multipart/form-data',
        greenblock_api_key: import.meta.env.VITE_GREENBLOCK_API_KEY
      }
    })

    return responseData.data.path
  } catch (error) {
    throw new Error('Failed to upload image')
  }
}
