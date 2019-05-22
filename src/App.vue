<template>
  <div id="app">
    <div v-if="isLoadingSetting">Loading...</div>
    <div v-else-if="!currentWords.length">Generating...</div>
    <div v-else class="container">
      <div class="level">
        <div class="level-left">
          <b-input placeholder="Search..."
              v-model="searchText"
              type="search"
              icon="magnify">
          </b-input>
        </div>
        <button class="button is-success level-right" @click.stop.prevent="refreshWordHandler">
            <!-- <b-icon
               pack="fas"
               icon="sync-alt"
               custom-class="fa-spin">
           </b-icon> -->
             <span>Refresh</span>
         </button>
      </div>
      <swiper :options="swiperOption" v-if="currentWords.length > 1">
        <swiper-slide v-for="(word, index) in currentWords" :key="index">
          <word-card :currentWord="word" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination">
          <div>
            Thang Dep trai
          </div>
        </div>
      </swiper>
      <word-card :currentWord="currentWords[0]" v-else />
      <setting-panel>
        <setting />
      </setting-panel>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Setting from './components/Setting.vue'
import SettingPanel from './components/SettingPanel.vue'
import WordCard from './components/WordCard.vue'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'app',
  components: {
    Setting,
    SettingPanel,
    WordCard,
    swiper,
    swiperSlide
  },
  data () {
    return {
      currentWords: [],
      searchText: null,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  watch: {
    'isLoadingSetting': {
      handler: function (newVal) {
        if (!newVal) {
          this.refreshWord()
        }
      },
      deep: true
    },
    'searchText': function (newVal) {
      const validWords = []
      const currentWordList = []
      for (let idx = 0; idx < newVal.length; idx++) {
        const char = newVal[idx]
        if (this.wordDict[char] && !currentWordList.includes(char)) {
          currentWordList.push(char)
          validWords.push(this.wordDict[char])
        }
      }
      if (validWords.length > 0) {
        this.currentWords = validWords
      } else if (this.currentWords.length === 0) {
        this.refreshWord()
      }
    }
  },
  computed: {
    ...mapState(['isLoadingSetting', 'wordList']),
    ...mapGetters(['wordDict']),
  },
  created() {
    console.log(this.isLoadingSetting)
    this.getSettings()
  },
  methods: {
    ...mapActions(['getSettings']),
    refreshWord() {
      const randomIdx = Math.floor(Math.random() * this.wordList.length)
      this.currentWords = [this.wordList[randomIdx]]
    },
    refreshWordHandler() {
      this.refreshWord()
      this.searchText = ''
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans', sans-serif, Lato, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.column {
  border: 1px solid #ddd;
}

.pad-horizontal-25 {
  padding: 0% 25%;
}

.main-word {
  font-size: 12rem;
  font-weight: 500;
}

.word-name {
  margin-bottom: 0px !important;
}

.font-size-md {
  font-size: 1.5rem;
}

.m-0 {
  margin: 0px !important;
}

.mx-2 {
  margin-left: 2rem !important;
  margin-right: 2rem !important;
}
</style>
