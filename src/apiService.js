import axios from "axios";
import { unexpectedErrorMsg } from "./consts.js"


const apiUrl = import.meta.env.VITE_API_URL;


export const apiFetchPlayers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/players`)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    throw new Error(errorMsg)
  }
}

export const apiDeletePlayer = async (deleteInfo) => {
  try {
    const response = await axios.delete(`${apiUrl}/player/${deleteInfo.id}/${deleteInfo.user_id}`)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    throw new Error(errorMsg)
  }
}

export const apiCreatePlayer = async (playerInfo) => {
  try {
    const response = await axios.post(`${apiUrl}/player`, playerInfo)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    throw new Error(errorMsg)
  }
}

export const apiIncrementPlayerStats = async (playerId, statsInfo) => {
  try {
    const response = await axios.put(`${apiUrl}/player/increment/${playerId}`, statsInfo)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    throw new Error(errorMsg)
  }
}

export const apiCheckDatabaseStatus = async () => {
  const response = await axios.get(`${apiUrl}/database-check`)
  return response.data.status
}

export const apiLoginUser = async (loginInfo) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginInfo)
    return response.data
  } catch(error) {
    let errorMsg = unexpectedErrorMsg
    if (error.status < 500) {
      errorMsg = error.response?.data?.detail ?? unexpectedErrorMsg
    }
    throw new Error(errorMsg)
  }
}
