<template>
    <v-app id="inspire">
        ACdemo
    <main>
    <AppBar/>
    <SideMenu/>
    <v-main>
        <v-container fluid>
            <v-card class="mt-10" style="min-width: 650px;">
                <v-card-title>
                    空調狀態
                </v-card-title>
                <v-card-text class="img-area-parent">
                    <v-row class="mt-5 mx-auto item" align="center">
                        <p class="font-weight-bold my-0 mr-5">空調箱A</p>
                        <v-chip 
                            label 
                            outlined 
                            class="mr-5"
                        >
                            {{acA.isRemote ? '遠端控制' : '近端控制'}}
                        </v-chip>
                        <v-chip 
                            label 
                            class="mr-5 white--text"
                            :color="acA.isOn ? '#394153':'#F44336'"
                        >
                            {{acA.isOn ? '啟動' : '停止'}}
                        </v-chip>
                        <v-chip label class="mr-5">
                            {{acA.isError ? '異常' : '正常'}}
                        </v-chip>
                        <v-btn
                            color="primary"
                        >
                            {{acA.isRemote ? '遠端手動停止' : '遠端手動啟動'}}
                            
                        </v-btn>
                    </v-row>
                    <v-row class="mt-5 mx-auto " align="center">
                        <p class="font-weight-bold my-0 mr-5">空調箱B</p>
                        <v-chip 
                            label 
                            outlined 
                            class="mr-5"
                        >
                            {{acB.isRemote ? '遠端控制' : '近端控制'}}
                        </v-chip>
                        <v-chip 
                            label 
                            :color="acB.isOn ? '#394153':'#F44336'"
                            class="mr-5 white--text"
                        >
                            {{acB.isOn ? '啟動' : '停止'}}
                        </v-chip>
                        <v-chip label class="mr-5">
                            {{acB.isError ? '異常' : '正常'}}
                        </v-chip>
                        <v-btn
                            color="primary"
                        >
                            {{acB.isRemote ? '遠端手動停止' : '遠端手動啟動'}}
                        </v-btn>
                    </v-row>
                    <v-row class="mt-5 mx-auto item" align="center">
                        <p class="font-weight-bold my-0 mr-5">強制交替運轉時間</p>
                        <v-text-field 
                            type="number" 
                            value=99
                            style="max-width:150px;"
                        >
                        </v-text-field>
                        <p class="my-0 mr-5">時</p>
                        <v-btn>
                            強制交替運轉
                        </v-btn>
                    </v-row>
                    <v-row class="mt-5 mx-auto item" align="center">
                        <p class="font-weight-bold my-0 mr-5" color="primary">強制交替運轉時間</p>
                        <v-text-field type="number" value=99>
                        </v-text-field>
                        <p class="my-0 mr-5">時</p>
                        <v-text-field type="number" value=99>
                        </v-text-field>
                        <p class="my-0 mr-5">分</p>
                        <v-btn
                            color="primary"
                        >
                            運轉時間歸零
                        </v-btn>
                    </v-row>
                    <div class="img-area">
                        <v-img
                            class="room-img"
                            src="@/assets/room.png"
                        />
                        <div class="ac-container">
                            <div 
                                id="ac-a" 
                                class="ac"
                                :class="{on : acA.isOn, off: !acA.isOn}"
                            >
                                <p class="my-0">空調A</p>
                            </div>
                            <div 
                                id="ac-b" 
                                class="ac"
                                :class="{on : acB.isOn, off: !acB.isOn}"
                            >
                                
                                <p class="my-0">空調B</p>
                            </div>
                            <div 
                                id="fan-a" 
                                class="ceiling-container"
                                :class="{on : acA.isOn, off: !acA.isOn}"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                            <div 
                                id="fan-b" 
                                class="ceiling-container"
                                :class="{on : acB.isOn, off: !acB.isOn}"
                            >
                                <div class="ceiling-fan horizontal left"></div>
                                <div class="ceiling-fan horizontal right"></div>  
                                <div class="ceiling-fan vertical rotated top"></div>
                                <div class="ceiling-fan vertical rotated bottom"></div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
            
            
        </v-container>
    </v-main>
    </main>
</v-app>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import SideMenu from '../components/SideMenu.vue';
export default {
    name: 'ACdemo',
    components: { 
        AppBar, SideMenu
    },
    data() {
        return{
            acA:{
                isOn:true,
                isRemote:true,
                isError:false,

            },
            acB:{
                isOn:false,
                isRemote:true,
                isError:false,
            },
        }
    },
    computed:{
       
    },
    mounted(){
        setInterval(() => {
            this.switchOnOff();
        }, 30000);
    },
    methods:{
        switchOnOff(){
            this.acA.isOn = !this.acA.isOn;
            this.acB.isOn = !this.acB.isOn;
        },
    },
}
</script>

<style scoped>
.v-text-field{
    max-width: 58px;
}
.item{
    /* width:80% */
}
.main-container{
    overflow-y:auto;
    margin-top: 64px;
    padding: 25px;
    /* height: 100vh; */
    max-height: calc(100vh - 24px);
}
.container {
  /* background-image:url("../assets/background.png") */
  overflow: auto;
  background-color: #f1f1f1;
  height: calc(100vh - 24px);
}
.v-application{
  background: unset !important;
}
.img-area{
    margin-top: 50px;
}
.img-area-parent{
    min-width: 600px;
    min-height: 450px;
}
.room-img{
    max-width: 600px;
    /* position: absolute; */
}
.ac-container{

    top: -403px;
    position: relative;

}
.ac{
    position: relative;
    padding: 0px 14px 0px 14px;
    max-width: 71px;
}
.ac.on{
    background-color: #394153;
}
.ac.off{
    background-color: #F44336;
}
.ac p{
    color:white;
}
#ac-a{
    left: 200px;
    top: 49px;
}
#ac-b{
    left: 287px;
    top: 25px;
}




@keyframes spin{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
#fan-a{
    top: -35px;
    left: 218px;
}
#fan-b{
    top: -35px;
    left: 267px;
}
.ceiling-container.on{
    animation: spin 1000ms linear infinite;
}
.ceiling-container.off{
    animation: none;
}
.ceiling-container{
    width: 34px;
    height: 34px;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}
.ceiling-container:after{
    content:"";
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;
    background: #444;
    box-shadow: inset 0 0px 0px 8px #444444, inset 0 1px 5px 22px #383838;
  }
.ceiling-fan{
  display: block;
  background: #ccc;
  border-radius: 5px;
  position: absolute;
  box-shadow: inset 1px 1px 40px #555;
}
.ceiling-fan:after{
content: "";
position: absolute;
background: #666;
display: block;
}
.ceiling-fan.horizontal{
    width: auto;
    height: 7px;
    top: 50%;
    margin-top: -4px;
    transform: skewX(20deg);
}
.ceiling-fan.horizontal:after{
    top: 41%;
      width: 15px;
      height: 15%;
}



.ceiling-fan.vertical{
    width: 7px;
    height: auto;
    left: 50%;
    margin-left: -4px;
    transform: skewY(20deg);
}
.ceiling-fan.vertical:after{
    height: 15px;
    width: 15%;
    margin-left: 25%;
}
.ceiling-fan.left{
    left: 0;
    right: 50%;
    margin-right: 5px;
    border-radius: 50% 15px 15px 50%;
}
.ceiling-fan.left:after{
    left: 100%;
}

.ceiling-fan.right{
    right: 0;
    left: 50%;
    margin-left: 5px;
    border-radius: 15px 50% 50% 15px;
}
.ceiling-fan.right:after{
    right: 100%;
}

.ceiling-fan.top{
    top: 0;
    bottom: 50%;
    margin-bottom: 5px;
    border-radius: 50% 50% 15px 15px;
}
.ceiling-fan.top:after{
    top: 100%;
}

.ceiling-fan.bottom{
    top: 50%;
    bottom: 0;
    margin-top: 5px;
     border-radius: 15px 15px 50% 50%;
}
.ceiling-fan.bottom:after{
    bottom: 100%;
}
</style>