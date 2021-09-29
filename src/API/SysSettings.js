import api from "./config"
import axios from "axios"

export default{
    GetSysSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/SysSettings/SystemSettings?passcode=${passcode}`);
    },
    ChangeHostname(passcode, data){
        let Hostname = JSON.stringify(data);
        const config = { 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json-patch+json'
            } 
        };
        return axios.patch(`${api.mainBaseUrl}/SysSettings/ChangeHostname?passcode=${passcode}`, Hostname, config);
    },
    SysReboot(passcode){
        return axios.get(`${api.mainBaseUrl}/SysSettings/Reboot?passcode=${passcode}`);
    },
    SysReset(passcode){
        return axios.get(`${api.mainBaseUrl}/SysSettings/ResetSystem?passcode=${passcode}`);
    },
    SysUpdate(passcode){
        return axios.get(`${api.mainBaseUrl}/SysSettings/UpdateSystem?passcode=${passcode}`);
    },
    ExportSysSettings(passcode){
        return axios.get(`${api.mainBaseUrl}/SysSettings/ExportSettings?passcode=${passcode}`);
    },
    ImportSysSettings(passcode, file){
        const config = { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        
        return axios.post(`${api.mainBaseUrl}/SysSettings/ImportSettings?passcode=${passcode}`, file, config);
    },
}