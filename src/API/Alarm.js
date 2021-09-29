import api from "./config"
import axios from "axios"

export default{
    GetContents(){
        return axios.get(`${api.mainBaseUrl}/Alarm/GetContents`);
    },
    Search(startTime, endTime, arr){
        let data={
            "startTime": startTime,
            "endTime": endTime,
            "contents": arr
        };
        return axios.put(`${api.mainBaseUrl}/Alarm/GetLogs`, data);
    },
    MultiDelete(passcode, target){
        let params={
            logId:target
        }
        return axios.delete(`${api.mainBaseUrl}/Alarm/DeleteLogs?passcode=${passcode}`, {params});
    },
    Delete(passcode, target){
        let params={
            logId:target
        }
        return axios.delete(`${api.mainBaseUrl}/Alarm/DeleteLog?passcode=${passcode}`, {params});
    },
}