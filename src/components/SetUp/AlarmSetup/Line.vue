<template>
    <div class="data-second-container">
        <v-card flat>
            <v-row class="my-0">
                <v-col cols="12" sm="3">
                    <v-row class="align-center ma-4">
                        <v-icon class="mr-2">mdi-account-supervisor-circle</v-icon>
                        <p class="font-weight-bold title text-left my-0">發送對象設定</p>
                    </v-row>
                    <v-list dense>
                        <v-subheader  class="pl-4 pr-0">
                            群組名稱
                            <v-spacer/>
                            <v-btn 
                                color="primary"
                                icon
                                @click="addGroup"
                            >
                                <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-subheader>
                        <v-list-item-group
                            v-model="selectedIndex"
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, index) in alarms.Line.TargetChannelAccessTokens"
                            :key="index"
                            >
                            <v-list-item-content>
                                <v-list-item-title v-text="item.Name" class="text-left">

                                </v-list-item-title>
                                
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        small
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        <v-icon>
                                            mdi-dots-vertical
                                        </v-icon>
                                        
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                        v-for="(action, i) in actions"
                                        :key="i"
                                        @click="action.func(alarms.Line.TargetChannelAccessTokens, index)"
                                        >
                                        <v-list-item-title>{{ action.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
                <v-divider vertical/>
                <v-col cols="12" sm="9">
                    <div class="text-left ma-5">
                        <v-row class="mx-0 my-5 align-center">
                            <p 
                                v-if="!editing"
                                class="font-weight-bold headline my-0"
                            >
                                {{selectedItem ? selectedItem.Name :null}}
                            </p>
                            <v-text-field
                                v-model="selectedItem.Name"
                                v-else
                            >
                            </v-text-field>
                            <v-spacer/>
                            <div v-if="editing" class="mx-5">
                                <v-btn
                                    class="mr-2"
                                    text
                                    @click="CancelEdit()"
                                >
                                    取消
                                </v-btn>
                                <v-btn 
                                    @click="SaveEdit()"
                                    color="primary"
                                >
                                儲存
                                </v-btn>
                            </div>
                            <div v-else>
                                <v-btn
                                    class="mr-2"
                                    icon
                                    @click="editing=true"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                        <div v-if="selectedItem">
                                <v-row class="align-center mx-0">
                                    <v-textarea
                                        v-model="selectedItem.ChannelAccessToken"
                                        v-if="editing"
                                    >
                                    </v-textarea>
                                    <p 
                                        class="my-0" 
                                        v-else
                                        style="overflow-wrap: anywhere;"
                                    >
                                        {{selectedItem.ChannelAccessToken}}
                                    </p>
                                    
                                </v-row>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-divider/>
            <div class="pa-4">
                <v-row class="align-center pa-4 px-4 mb-6">
                    <v-icon class="mr-2">mdi-cog</v-icon>
                    <p class="font-weight-bold title text-left my-0">其他設定</p>
                </v-row>
                <div :class="$vuetify.breakpoint.smAndDown ? 'full' : 'notfull'">
                    <v-row justify="start">
                        <v-col cols="12" sm="3">
                            <p class="font-weight-bold text-left my-0">發送頻率(分鐘)</p>
                        </v-col>
                        <v-col cols="12" sm="">
                            <v-text-field
                                dense
                                v-model="alarms.Line.SendingInterval"
                                outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'AlarmSetupLine',
    components: { 
    },
    data() {
        return{
            selectedIndex:0,
            selectedItem:null,
            editItemIndex:null,
            editing:false,
            rawItem:null,
            tabIndex:null,
            actions:[
                {title:"刪除", func:(group, index)=>{this.deleteGroup(group, index)}}
            ],
        }
    },
    props:["alarms"],
    watch:{
        selectedIndex(val){
            console.log(val)
            this.selectedItem = this.alarms.Line.TargetChannelAccessTokens[val];
        },
        editing(val){
            if(val){
                this.rawItem = JSON.parse(JSON.stringify(this.alarms.Line));
            }
        }
    },
    mounted(){
        this.selectedItem = this.alarms.Line.TargetChannelAccessTokens[this.selectedIndex];
    },
    methods:{
        addGroup(){
            let newItem ={
                Name: "新群組",
                ChannelAccessToken:"請輸入 ChannelAccessToken",
            }
            this.alarms.Line.TargetChannelAccessTokens.push(newItem);
            
        },
        deleteGroup(group, index){
            console.log("delete: ", group, index)
            group.splice(index, 1);
            this.$forceUpdate();
        },
        Edit(item){
            this.rawData = item;
            this.editing=true;
        },
        CancelEdit(){
            this.editing = false;
            this.editItemIndex=null;
            let data={
                data:this.rawItem,
                type:"Line"
            }
            console.log(this.rawItem)
            this.selectedItem = this.rawItem.TargetChannelAccessTokens[this.selectedIndex];
            this.$emit("ChangeEdit", data);
        },
        SaveEdit(){
            this.editing = false;
            this.editItemIndex=null;
            let data={
                data:this.alarms.Line,
                type:"Line"
            }
            this.$emit("ChangeEdit", data);
        },
    },
}
</script>

<style scoped>
.full{
    width: 100%;
    padding: 0px 16px;
}
.notfull{
    width: 60%;
    padding: 0px 16px;
}
</style>