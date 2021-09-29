import api from "./config"
import axios from "axios"

export default{
    GetAlarmGroups(passcode){
        return axios.get(`${api.mainBaseUrl}/AlaSettings/GetAlarmGroups?passcode=${passcode}`);
    },
    GetAlarmSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/AlaSettings/AlarmSettings?passcode=${passcode}`);
    },
    SaveText(data, passcode){
        return axios.patch(`${api.mainBaseUrl}/AlaSettings/Text?passcode=${passcode}`, data);
    },
    SaveEmail(data, passcode){
        return axios.patch(`${api.mainBaseUrl}/AlaSettings/Email?passcode=${passcode}`, data);
    },
    SaveLine(data, passcode){
        return axios.patch(`${api.mainBaseUrl}/AlaSettings/Line?passcode=${passcode}`, data);
    },
}