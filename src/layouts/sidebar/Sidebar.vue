<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"    
    mobile-breakpoint="960"
    
    :right="$vuetify.rtl"
    mini-variant-width="70"
    app
    id="main-sidebar"
    style="background-color: #000000"
  >
    <v-list>
      <v-list-item
        :active-class="`white--text`"
      >
        <v-list-item-content>
          <vue-metamask ref="metamask" :initConnect="false" @onComplete="onComplete"></vue-metamask>
          <v-btn v-if ="isLoading != false" x-large style="color: white;border-radius: 40px;background-color: #8AA5FF" @click="connect">CONNECT WALLET</v-btn>
          
          <Hexagon
            v-if="isLoading != true"
            :border-size="0"
            borderColor="#8AA5FF"
            :size="180"
            :background-image="`url(${assets[0].metadata.image})`"
          >
          </Hexagon>
        </v-list-item-content>
        
      </v-list-item>
      <v-list-item v-if="isLoading != true">
        <v-list-item-content>
          <v-list-item-title style="font-size:30px; color: white;text-align: center;">
            {{metaMaskAddress.substr(0,4)+'...'+metaMaskAddress.substr(-3)}}
            </v-list-item-title>
          <v-list-item-title style="color: white;text-align: center;">
            {{assets[0].metadata.name}}
            <img src="../../assets/conf.png" class="mt-4" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="isLoading != true" style="position: absolute;left: 0;bottom: 205px;">
        <v-list-item-content>
          <v-list-item-title style="font-size:30px; color: white;text-align: center;">
          <img src="../../assets/middle.png" class="mt-4" />
            {{metaMaskAddress.substr(0,4)+'...'+metaMaskAddress.substr(-3)}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item style="position: absolute;left: 0;bottom: 0;">
        <v-list-item-content>
          <v-list-item-title style="font-size:30px; color: white;text-align: center;">
            <img src="../../assets/nft.png" class="mt-4" />
          </v-list-item-title>
          <v-list-item-title style="display:inline-flex:30px; color: white;text-align: center;">
            <img src="../../assets/bird.png" class="mt-4" />
            <img src="../../assets/M.png" class="mt-4" />
            <img src="../../assets/msg.png" class="mt-4" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import Hexagon from "@coddicat/vue-hexagon";
import VueMetamask from 'vue-metamask';

export default {
  name: "Sidebar",
  components: {
    Hexagon,
    VueMetamask
  },
  data: () => ({
    metaMaskAddress: '',
    isLoading: true
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg", "assets"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      }
    }
  },
  created() {
    
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    connect() {
      
      this.$refs.metamask.init();
    },
    onComplete(data){
      this.metaMaskAddress = data.metaMaskAddress;
      // data.metaMaskAddress = "0x0E11A192d574b342C51be9e306694C41547185DD"; //"0x0E11A192d574b342C51be9e306694C41547185DD"; // To do
      this.loading =  true
      this.$store.dispatch('loadAssets', data.metaMaskAddress).then(() => {
        this.isLoading = false;
        // this.$store.commit("IS_LOADING", false);

      });
    },
  }
};
</script>
<style lang="scss">
#main-sidebar{
  box-shadow:1px 0 20px rgba(0,0,0,.08);
  -webkit-box-shadow:1px 0 20px rgba(0,0,0,.08);
  .v-navigation-drawer__border{
    display: none;
  }
  .v-list{
    padding: 8px 5px;
  }
  .v-list-item{
      &__icon--text,
      &__icon:first-child{
        justify-content: center;
        text-align: center;
        width: 20px;
        
      }
      
  }    
}
</style>