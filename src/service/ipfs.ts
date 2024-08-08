import axios from 'axios'

export const ipfs = async (file: File) => {
  try {
    const fileData = new FormData()
    fileData.append('file', file as File)
    const responseData = await axios({
      method: 'POST',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data: fileData,
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY
      }
    })

    return responseData.data.IpfsHash
  } catch (error) {
    console.error(error)
  }
}
