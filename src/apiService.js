import axios from "axios";
import { unexpectedErrorMsg } from "./consts.js"


const apiUrl = import.meta.env.VITE_API_URL;


export const apiFetchPlayers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/players`)
    console.log("aquii")
    console.log(response.data)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    // showErrorModal({text: errorMsg})
    console.log(errorMsg)
  }
}

export const apiDeletePlayer = async (playerId) => {
  try {
    const response = await axios.delete(`${apiUrl}/player/${playerId}`)
    // showSuccessModal({title: "Jogador deletado com sucesso"})
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    // showErrorModal({text: errorMsg})
    console.log(error)
  }
}

export const apiCreatePlayer = async (playerInfo) => {
  try {
    const response = await axios.post(`${apiUrl}/player`, playerInfo)
    // showSuccessModal({title: "Jogador cadastrado com sucesso"})
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    // showErrorModal({text: errorMsg})
    console.log(errorMsg)
  }
}

export const apiIncrementPlayerStats = async (playerId, statsInfo) => {
  try {
    const response = await axios.put(`${apiUrl}/player/increment/${playerId}`, statsInfo)
    // showSuccessModal({title: "Jogador atualizado com sucesso"})
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    // showErrorModal({text: errorMsg})
  }
}
