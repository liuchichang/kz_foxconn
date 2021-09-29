import api from "./config"
import axios from "axios"

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default{
    GetDisplay(){
        return axios.get(`${api.mainBaseUrl}/AirCon/Display`,{
            cancelToken: source.token
          });
    },
    GetSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/AirCon/Settings?passcode=${passcode}`,{
            cancelToken: source.token
          });
    },
    UpdateSettings(data, passcode){
        return axios.patch(`${api.mainBaseUrl}/AirCon/Settings?passcode=${passcode}`, data);
    },
    GetOperateNameValue(name, value, passcode){
        return axios.get(`${api.mainBaseUrl}/AirCon/Operate/${name}/${value}?passcode=${passcode}`);
    },
    GetOperateName(name, passcode,config){
        return axios.get(`${api.mainBaseUrl}/AirCon/Operate/${name}?passcode=${passcode}`,{
            cancelToken: source.token
          }
        );
    },
    cancel(){
        source.cancel('cancelled');
        
    },
    start(){
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
    },
}