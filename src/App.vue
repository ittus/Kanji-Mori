<template>
  <div id="app">
    <div v-if="isLoadingSetting">Loading...</div>
    <div v-else-if="!currentWord">Generating...</div>
    <div v-else class="container">
      <div class="level">
        <h1 class="title has-text-centered level-item word-name">{{ currentWord.cn_mean }} ({{ currentWord.vi_mean }})</h1>
        <button class="button is-success level-right" @click.stop.prevent="refreshWord">
            <!-- <b-icon
               pack="fas"
               icon="sync-alt"
               custom-class="fa-spin">
           </b-icon> -->
             <span>Refresh</span>
         </button>
      </div>

      <div class="columns">
       <div class="column is-one-quarter">
           <div class="title main-word">{{ currentWord.word }}</div>
           <div class="speak-way">
             <div class="columns">
               <div class="column">
                  Onjomi:
               </div>
               <div class="column">
                  {{ currentWord.onjomi }} ({{ currentWord.ronjomi }})
               </div>
             </div>
             <div class="columns">
               <div class="column">
                  Kunjomi:
               </div>
               <div class="column">
                 {{ currentWord.kunjomi }} ({{ currentWord.rkunjomi }})
               </div>
             </div>
           </div>
       </div>
       <div class="column">
         <div v-html="currentWord.remember"></div>
         <figure class="image pad-horizontal-25">
           <img alt="Image to remember" :src="`./dist/assets/imgs/ikanji/${currentWord.image}.jpg`" >
         </figure>
       </div>
      </div>
      <div class="columns">
        <div class="column">
          <div v-for="(example, index) in exampleList" :key="example.word + index" class="font-size-md">
            <span class="title is-5">{{ example.word }}</span> ( {{ example.hiragana }} ) {{ example.meaning }}
          </div>
        </div>
      </div>
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

export default {
  name: 'app',
  components: {
    Setting,
    SettingPanel
  },
  data () {
    return {
      currentWord: null
    }
  },
  watch: {
    'isLoadingSetting': {
      handler: function (newVal) {
        console.log('isLoadingSetting change', newVal)
        if (!newVal) {
          this.refreshWord()
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['isLoadingSetting', 'wordList']),
    ...mapGetters(['randomWord']),
    exampleList () {
      let examples = []
      console.log(this.currentWord)
      if (this.currentWord && this.currentWord.note) {
        const wordPairs = this.currentWord.note.split('※').filter(item => item && item.length > 0)
        examples = wordPairs.map(item => {
          const words = item.split('∴')
          return {
            'word': words[0],
            'hiragana': words[1],
            'meaning': words[2]
          }
        })
      }
      console.log('examples', examples)
      return examples
    }
  },
  created() {
    console.log(this.isLoadingSetting)
    this.getSettings()
  },
  methods: {
    ...mapActions(['getSettings']),
    refreshWord() {
      console.log('wordList', this.wordList.length)
      const randomIdx = Math.floor(Math.random() * this.wordList.length)
      this.currentWord = this.wordList[randomIdx]
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
</style>
