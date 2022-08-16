<template>
    <v-container fluid class="down-top-padding">
        <v-row>
            <v-col
                v-for="(asset, i) in assets.assets"
                :key="i"
                cols="12" lg="3">
                
                <v-card >
                <v-card-text class="text-center pa-7">
                    <img
                    :src=asset.imageUrl
                    alt="user"
                    width="100%"
                    class="img-fluid"
                    />
                    <h4 class="mt-2 title blue-grey--text text--darken-2 font-weight-regular">{{asset.name}}</h4>
                    <div style="display: inline-flex;">
                      <h6 class="subtitle-2 text--darken-2 font-weight-regular mr-2">{{asset.collectionName}}</h6>
                      <img src="../../assets/conf.png" class="mt-2" />
                    </div>
                    
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </v-container>
</template>

<script>
// import InfiniteLoading from 'vue-infinite-loading';
import { mapState } from 'vuex';

export default {
  name: "Nfts",
  methods: {
    // infiniteHandler($state) {
    //   $state.loaded();
    // },
  },
  computed: mapState(['assets']),
  components: {
    // InfiniteLoading,
  },
};
</script>

