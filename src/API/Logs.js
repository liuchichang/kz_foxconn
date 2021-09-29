import api from "./config"
import axios from "axios"

export default{
    GetTags(){
        return axios.get(`${api.mainBaseUrl}/Logs/TagNames`);
    },
    Search(tags, endTime, days){
        let data={
            "tagIds": tags,
            "endTime": endTime,
            "days": days
        };
        return axios.put(`${api.mainBaseUrl}/Logs/TagLogs`, data);
    },
    GetQueryTitle(deviceId, valueId){
        return axios.get(`${api.mainBaseUrl}/Logs/GetQueryTitle?deviceId=${deviceId}&valueId=${valueId}`);
    },
    GetQueryOptions(){
        return axios.get(`${api.mainBaseUrl}/Logs/GetQueryOptions`);
    },
    GetLogs(deviceId, valueId, startTime, endTime){
        return axios.get(`${api.mainBaseUrl}/Logs/GetLogs?deviceId=${deviceId}&valueId=${valueId}&startTime=${startTime}&endTime=${endTime}`);
    },
}