import api from "./config"
import axios from "axios"

export default{
    LayoutSettings(passcode, data){
        return axios.post(`${api.mainBaseUrl}/LaySettings/LayoutSettings?passcode=${passcode}`, data);
    },
    GetLayoutSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/LaySettings/LayoutSettings?passcode=${passcode}`);
    },
}