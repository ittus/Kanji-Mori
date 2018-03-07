<template>
  <div id="app">
    <div class="container">
      <h1 class="title">{{ currentWord.cn_mean }} ({{ currentWord.vi_mean }})</h1>
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
          <div v-for="example in exampleList" :key="example.word">
            <span class="title is-5">{{ example.word }}</span> ( {{ example.hiragana }} ) {{ example.meaning }}
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import simpleKanjiList from './data/ikanji.js'

export default {
  name: 'app',
  data () {
    return {
      currentWord: simpleKanjiList[100]
    }
  },
  computed: {
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
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  font-size: 10rem;
}

</style>
