<template>
    <div>
        <template v-for="(item, key) in selectedItem.Data">
            <v-row :key="key" class="justify-center align-start">
                <v-col cols="2" class="align-start">
                    <p class="subtitle font-weight-bold py-3">{{$t(`${type}.${key}`)}}</p>
                </v-col>
                <v-col cols="10">
                    <template v-for="(data, key2) in item" >
                        <v-row :key="key2" class="my-0">
                            <v-col cols="4">
                                <v-chip outlined small class="body-1 fw-400 my-0">{{$t(`EquipSetUp.${key2}`)}}</v-chip>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    type="number"
                                    class="body-1 fw-400 my-0 pt-0"
                                    v-model="data.LimitValue"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-checkbox 
                                    v-model="data.AlarmEnable"
                                    class="my-0 py-0"
                                    label="警報啟用"
                                    hide-details
                                ></v-checkbox>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="警報群組"
                                    hide-details
                                    v-if="data.AlarmEnable"
                                    v-model="data.AlarmGroupIds"
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
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="Digital Output Id"
                                    hide-details
                                    v-if="data.AlarmDOId"
                                    v-model="data.AlarmDOId"
                                    :items="AlarmViaDO"
                                    item-text="label"
                                    item-value="value"
                                    outlined
                                    dense
                                >
                                </v-select>
                            </v-col>
                            
                        </v-row>
                        <v-divider :key="key2+'divider'"/>
                    </template>
                </v-col>
            </v-row>
        </template>
    </div>
</template>

<script>
export default {
    name: 'EquipSetupOtherDetail',
    data() {
        return{
            
        }
    },
    props:["selectedItem", "AlarmGroups", "AlarmViaDO","type"],
    methods:{
        
    },
}

</script>