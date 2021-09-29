<template>
    <div>
        <v-row class="justify-start">
            <v-col cols="3">
                <v-checkbox 
                    v-model="item.AlarmEnable"
                    class="my-0 py-0"
                    label="警報啟用"
                ></v-checkbox>
            </v-col>
            <v-col cols="9">
                <v-select
                    label="警報群組"
                    hide-details
                    v-if="item.AlarmEnable"
                    v-model="item.AlarmGroupIds"
                    :items="AlarmGroups"
                    item-text="Name"
                    item-value="Id"
                    :return-object="false"
                    multiple
                    outlined
                    dense
                >
                </v-select>
            </v-col>
            <v-col cols="3">
                <p>警報</p>
            </v-col>
            <v-col cols="9">
                <v-switch
                    class="my-0"
                    v-model="item.IsOnAlarm"
                    :label="item.IsOnAlarm ? 'On 警報' : 'Off 警報'"
                    inset
                ></v-switch>
            </v-col>
            <v-col cols="3">
                <p>反相</p>
            </v-col>
            <v-col cols="9">
                <v-switch
                    class="my-0"
                    v-model="item.IsNot"
                    :label="item.IsNot ? '是' : '否'"
                    inset
                ></v-switch>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'EquipSetupDODetail',
    data() {
        return{
            
        }
    },
    props:["selectedItem", "AlarmGroups", "AlarmViaDO"],
    computed:{
        item(){
            return this.selectedItem.Data;
        },
    },
}

</script>