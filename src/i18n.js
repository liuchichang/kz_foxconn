import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
  'en-US': {
    
  },
  'zh-TW': {
    "DigitalOutputs": {
      "DigitalOutput": "數位輸出",
    },
    "DigitalInputs": {
        "DigitalInput": "數位輸入",
    },
    "AnalogInputs": {
        "AnalogInput": "類比輸入",
    },
    "UPSs": {
        "BypassVoltage":"旁路電壓",
        "BypassVoltageR":"旁路電壓(R相)",
        "BypassVoltageS":"旁路電壓(S相)",
        "BypassVoltageT":"旁路電壓(T相)",
        "BypassFrequency":"旁路頻率",
        "BatteryVoltage":"電池電壓",
        "BatteryCurrent":"電池電流",
        "BatteryCapacity":"電池容量",
        "InputStatus":"輸入狀態",
        "InputFrequency":"輸入頻率",
        "InputFrequencyR":"輸入頻率(R相)",
        "InputFrequencyS":"輸入頻率(S相)",
        "InputFrequencyT":"輸入頻率(T相)",
        "InputVoltage":"輸入電壓",
        "InputVoltageR":"輸入電壓(R相)",
        "InputVoltageS":"輸入電壓(S相)",
        "InputVoltageT":"輸入電壓(T相)",
        "OutputCurrent":"輸出電流",
        "OutputCurrentR":"輸出電流(R相)",
        "OutputCurrentS":"輸出電流(S相)",
        "OutputCurrentT":"輸出電流(T相)",
        "OutputFrequency":"輸出頻率",
        "OutputLoad":"輸出負載",
        "OutputLoadR":"輸出負載(R相)",
        "OutputLoadS":"輸出負載(S相)",
        "OutputLoadT":"輸出負載(T相)",
        "OutputPower":"輸出功率",
        "OutputPowerR":"輸出功率(R相)",
        "OutputPowerS":"輸出功率(S相)",
        "OutputPowerT":"輸出功率(T相)",
        "OutputVoltage":"輸出電壓",
        "OutputVoltageR":"輸出電壓(R相)",
        "OutputVoltageS":"輸出電壓(S相)",
        "OutputVoltageT":"輸出電壓(T相)",
    },
    "PowerMeters": {
        "Current":"電流",
        "CurrentR":"電流(R相)",
        "CurrentS":"電流(S相)",
        "CurrentT":"電流(T相)",
        "Energy":"能耗",
        "Frequency":"頻率",
        "Power":"功率",
        "Voltage":"電壓",
        "VoltageR":"電壓(R相)",
        "VoltageS":"電壓(S相)",
        "VoltageT":"電壓(T相)",
    },
    "THMeters": {
        "Temperature":"溫度",
        "Humidity":"濕度",
    },
    "PDUs":{
        "Current":"電流",
        "CurrentR":"電流(R相)",
        "CurrentS":"電流(S相)",
        "CurrentT":"電流(T相)",
        "Power":"功率",
        "PowerR":"功率(R相)",
        "PowerS":"功率(S相)",
        "PowerT":"功率(T相)",
        "Voltage":"電壓",
        "VoltageR":"電壓(R相)",
        "VoltageS":"電壓(S相)",
        "VoltageT":"電壓(T相)",
    },
    "EquipSetUp":{
      "IsNormalOpen":"常開",
      "IsOnAlarm":"On 警報",
      "IsNot":"反相",
      "AlarmGroupIds":"警報群組",
      "UpperLimitAlarm":"上限警報",
      "LowerLimitAlarm":"下限警報",
      "Unit":"單位",
      "DigitalInputs":"數位輸入",
      "DigitalOutputs":"數位輸出",
      "AnalogInputs":"類比輸入",
      "UPSs":"不斷電系統",
      "THMeters":"溫溼度",
      "PDUs":"電力插座",
      "PowerMeters":"集合式電錶",
    },
    "UserInfo":{
      "Developer":"開發人員",
      "Manager":"管理人員",
      "Installer":"安裝人員",
      "Operator":"操作人員"
    },
  }
}

export default new VueI18n({
    locale: 'zh-TW', // set locale
    fallbackLocale: 'en-US',
    messages, // set locale dictionary
    silentTranslationWarn: true
  })