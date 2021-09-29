<template>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      item-text="Name"
      return-object
      :search-input.sync="search"
      hide-selected
      hide-details
      label="查詢項目"
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip
            :color="`${colors[nonce - 1]} lighten-3`"
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.Name }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >
            mdi-close
          </v-icon>
        </v-chip>
      </template>
    </v-combobox>
</template>

<script>
  export default {
    name:"Combobox",
    data: () => ({
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      nonce: 1,
      menu: false,
      model: [

      ],
      x: 0,
      search: null,
      y: 0,
    }),
    props:["items"],
    watch: {
      model (val, prev) {
        this.$emit("change",val);
        if (val.length === prev.length) return
        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)
            this.nonce++
          }
          return v
        })
      },
    },

    methods: {
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
    },
  }
</script>