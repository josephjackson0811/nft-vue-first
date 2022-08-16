import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Sidebar_drawer: null,
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: '',
        address: '',
        assets: [],
        isLoading: false
      },
    mutations: {
        SET_SIDEBAR_DRAWER (state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER (state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR (state, payload) {
            state.SidebarColor = payload
        }, 
        LOAD_ASSETS(state, assets) {
            state.assets = assets;
        },
        // IS_LOADING (state, payload) {
        //   state.isLoading = payload
        // }
    },
    actions: {
        loadAssets({commit}, address) {
            // console.log(this.state.address);
            var data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "ankr_getNFTsByOwner",
                "params": {
                  "blockchain": [
                    "eth"
                  ],
                  "walletAddress": address,
                  // "pageSize": 9,
                  "pageToken": ""
                },
                "id": 1
              });
            var config = {
                method: 'post',
                url: 'https://rpc.ankr.com/multichain',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };

            axios(config)
                .then((response) => {
                    // console.log(JSON.stringify(response.data.result.assets));
                    commit('LOAD_ASSETS', response.data.result);
                })
                .catch((error) => {
                    throw new Error(`API ${error}`);
                });
          
    }}
})