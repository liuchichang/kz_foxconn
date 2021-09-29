export default {
    methods: {
        StartPageLoading(){
            this.$store.state.loading = true;
        },
        StopPageLoading(){
            this.$store.state.loading = false;
        },
        Info(message){
            this.$root.$emit("info", message)
        },
        Alarm(message){
            this.$root.$emit("message", message)
        },
        Initial(value){

            if(value.response.data==="User's passcode is time out."||
                value.response.data==="This passcode is invalid."
            ){
                this.$store.state.loading = false;
                this.$store.state.UserInfo=null;
                localStorage.removeItem('UserInfo');
                this.$router.push({path:'/'});
                this.$root.$emit("message", "Passcode失效，請重新登入")
            }else{
                this.$root.$emit("message", value.response.data);
            }
            
        },
        ForceInitial(){
            this.$store.state.loading = false;
            this.$store.state.UserInfo=null;
            localStorage.removeItem('UserInfo');
            this.$router.push({path:'/'});
            location.reload();
            // this.$root.$emit("message", "系統整理中，請稍後重新登入")
        },
        Translate(type, name, value){
            let text;
            let color;
            switch(type){
                case "DigitalOutputs":
                    switch(name){
                        case "DigitalOutput":
                            text = value ? "On":"Off";
                            color = value ? "red":"black";
                    }
                    break;
                case "DigitalInputs":
                    switch(name){
                        case "DigitalInput":
                            text = value ? "On":"Off";
                            color = value ? "green":"black";
                    }
                    break;
                case "UPSs":
                    switch(name){
                        case "InputStatus":
                            text = value ? "正常":"異常";
                            color = value ? "green":"red";
                    }
                    break;
            }
            let returnData={
                text:text,
                color:color,
            } 
            return returnData;
        },
    }
}