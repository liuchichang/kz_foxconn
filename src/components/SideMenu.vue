<template>
    <v-navigation-drawer
            app
            floating
            v-model="drawer"
            class="menu"
            :class="{'full-height':isFullHeight}"
            height="100%"
        >
            <v-list
              nav
              class="py-3"
              rounded
            >
            <template v-for="(item, i) in items">
              <v-list-item :key="i" v-if="!item.subItems"
                  link
                  @click="pathTo(item.path)"
                  :to="item.path"
                  >
                  <v-list-item-icon class="">
                    <v-icon class="">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="list-item" v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
              <v-list-group
                v-else
                class="group"
                :key="i"
                :prepend-icon="item.icon"
                :value="true"
                :group="item.path"
              >
                <template #activator>
                  <v-list-item-content>
                    <v-list-item-title class="list-item" >{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                dense
                  v-for="(subItem, j) in item.subItems"
                  :key="j"
                  link
                  @click="pathTo(subItem.path)"
                  :to="subItem.path"
                  class="subMenu"
                >
                  <v-list-item-icon>
                    <v-icon>{{ subItem.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="list-item" v-text="subItem.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <!-- <v-divider v-if="item.subItems" :key="i"/> -->
            </template>
            </v-list>
    </v-navigation-drawer>
</template>

<script>
import sideMenuData from "@/Data/Menu.json"
export default {
    name: 'side-menu',
    data() {
        return{
          drawer: false,
          item:0,
          color: 'primary',
          background: false,
          permanent:false,
          temporary:true,
          selectedItem:null,
        }
    },
    props: {
      UserInfo:{
        type:Object
      }
    },
    computed:{
      isFullHeight: function(){
        return this.$vuetify.breakpoint.mdAndDown ? 'isFullHeight' : '';
      },
      items:{
            get(){
              let Identity = 
                this.UserInfo ? 
                this.UserInfo.Identity : "Visitor";
              let sideMenu=[];
              sideMenuData.forEach(e => {
                if(e.auth.find(j=>j===Identity)){
                    sideMenu.push(e);
                }
              });
              return sideMenu;
            },
            set(){
                
            }
      }   
    },
    mounted(){
      this.$root.$on("openDrawer", (e)=>this.drawer=e);

      if(this.$vuetify.breakpoint.width>=1200){
        this.drawer=true;
      }else{
        this.drawer=false;
      }

      window.addEventListener('resize', ()=>{
          if(this.$vuetify.breakpoint.name!=='lg'){
              // this.permanent = true;
              // this.temporary=false;
          }
      })
    },
    methods:{
        pathTo(path){
            this.$router.push({path:path}).catch(error => {
                if (error.name != "NavigationDuplicated") {
                throw error;
                }
            });
        },
    },

}
</script>
<style scoped>
.logo{
    width: 100%;
    max-height: 100%;
}
.menu{
  background-color: #292F4A !important;
  margin-top: 64px;
  z-index: 0;
  /* border-right: solid 0.1px #e8e8e8 */
}
.menu >>> a, i, .v-list-item__title{
  color: white !important;
}
.group >>> i, .v-list-item__icon.v-list-group__header__prepend-icon >>> i{
  color: white !important;
}
.header.logo{
  max-width: 160px !important;
  margin-top: 8px;
}
.logo-text{
  margin: 50px !important;
}
.sidemenu{
  /* top: 64px !important; */
  height: 100% !important;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.routerView{
  padding: 10px;
}
.list-item{
  text-align: left;
  margin-left: 20px;
}

.full-height{
  margin-top: 0px !important;
}
</style>