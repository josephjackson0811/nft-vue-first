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
            // var data = JSON.stringify({
            //     "jsonrpc": "2.0",
            //     "method": "ankr_getNFTsByOwner",
            //     "params": {
            //       "blockchain": [
            //         "eth"
            //       ],
            //       "walletAddress": address,
            //       // "pageSize": 9,
            //       "pageToken": ""
            //     },
            //     "id": 1
            //   });
            // var config = {
            //     method: 'post',
            //     url: 'https://rpc.ankr.com/multichain',
            //     headers: { 
            //       'Content-Type': 'application/json'
            //     },
            //     data : data
            //   };

            // axios(config)
            //     .then((response) => {
            //         // console.log(JSON.stringify(response.data.result.assets));
            //         commit('LOAD_ASSETS', response.data.result);
            //     })
            //     .catch((error) => {
            //         throw new Error(`API ${error}`);
            //     });


var config = {
  method: 'get',
  url: 'https://try.readme.io/https://eth-mainnet.g.alchemy.com/nft/v2/4FkEy06yNQbIQtWSLzacFfhySbD0cUNV/getNFTs?owner='+address+'&withMetadata=true',
  headers: { 
    'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8', 
    'Connection': 'keep-alive', 
    'Origin': 'https://docs.alchemy.com', 
    'Referer': 'https://docs.alchemy.com/', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'cross-site', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 
    'accept': 'application/json', 
    'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"', 
    'x-readme-api-explorer': '4.208.0'
  }
};

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

            axios(config)
                .then((response) => {
                    // console.log(JSON.stringify(response.data.result.assets));
                    commit('LOAD_ASSETS', response.data.ownedNfts);
                })
                .catch((error) => {
                    throw new Error(`API ${error}`);
                });

          
    }}
})