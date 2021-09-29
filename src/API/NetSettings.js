import api from "./config"
import axios from "axios"

export default{
    NetworkStatus(passcode){
        return axios.get(`${api.mainBaseUrl}/NetSettings/NetworkStatus?passcode=${passcode}`);
    },
    NetworkSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/NetSettings/NetworkSettings?passcode=${passcode}`);
    },
    SetNetworkStatus(passcode, data){
        return axios.patch(`${api.mainBaseUrl}/NetSettings/NetworkSettings?passcode=${passcode}`, data);
    },
}