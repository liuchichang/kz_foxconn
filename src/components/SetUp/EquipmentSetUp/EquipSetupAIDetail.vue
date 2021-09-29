<template>
    <div>
        <template v-for="(item, key) in selectedItem.Data">
            <v-row :key="key" class="justify-center">
                <v-col cols="2" class="align-start">
                    <p class="subtitle font-weight-bold py-3">{{$t(`EquipSetUp.${key}`)}}</p>
                </v-col>
                <v-col cols="10" v-if="key =='UpperLimitAlarm' || key =='LowerLimitAlarm'">
                    <v-row class="my-0">
                        <v-col cols="4">
                            <v-chip outlined small class="body-1 fw-400 my-0">{{$t(`EquipSetUp.${key}`)}}</v-chip>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                                type="number"
                                class="body-1 fw-400 my-0"
                                label="警報值"
                                v-model="item.LimitValue"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-checkbox 
                                v-model="item.AlarmEnable"
                                class="my-0 py-0"
                                label="警報啟用"
                                hide-details
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="8">
                            <v-select
                                label="Alarm Group Id"
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
                        <v-col cols="4">
                            <v-label>數位輸出警報</v-label>
                            <!-- <v-checkbox 
                                v-model="item.AlarmDOId"
                                class="my-0 py-0"
                                label="數位輸出警報"
                            ></v-checkbox> -->
                        </v-col>
                        <v-col cols="8">
                            <v-select
                                label="Digital Output Id"
                                hide-details
                                v-if="item.AlarmDOId"
                                v-model="item.AlarmDOId"
                                :items="AlarmViaDO"
                                item-text="label"
                                item-value="value"
                                outlined
                                dense
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    
                </v-col>
                <v-col cols="10" class="align-center" v-else-if="key =='Unit'">
                    <v-text-field
                        v-model="selectedItem.Data[key]"
                        placeholder="請填入單位"
                        type="text"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="10" class="align-center" v-else>
                    <p class="subtitle font-weight-bold mt-3">{{item}}</p>
                </v-col>
            </v-row>
            <!-- <v-divider :key="key+'divider'" /> -->
        </template>
    </div>
</template>

<script>
export default {
    name: 'EquipSetupAIDetail',
    data() {
        return{
        
        }
    },
    props:["selectedItem", "AlarmGroups", "AlarmViaDO","type"]
}

</script>