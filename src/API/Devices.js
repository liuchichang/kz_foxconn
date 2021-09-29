import api from "./config"
import axios from "axios"

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default{
    GetDevices(){
        return axios.get(`${api.mainBaseUrl}/Devices/GetStatus`,{
            cancelToken: source.token
        });
    },
    GetDevices2(){
        return axios.get(`${api.mainBaseUrl}/Devices/GetStatus2`,{
            cancelToken: source.token
        });
    },
    cancel(){
        source.cancel('cancelled');
    },
    start(){
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
    },
}