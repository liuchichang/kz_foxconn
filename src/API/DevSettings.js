import api from "./config"
import axios from "axios"

export default{
    GetDeviceSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/DevSettings/DeviceSettings?passcode=${passcode}`);
    },
    SaveDeviceSettings(passcode, data){
        return axios.patch(`${api.mainBaseUrl}/DevSettings/DeviceSettings?passcode=${passcode}`, data);
    },
}