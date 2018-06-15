<template>
  <div>
    <div class="columns m-0">
     <div class="column is-one-quarter">
         <h2 class="title has-text-centered word-name">{{ currentWord.cn_mean }} ({{ currentWord.vi_mean }})</h2>
         <div class="title main-word">{{ currentWord.word }}</div>
         <div class="speak-way">
           <div class="columns" v-if="currentWord.onjomi">
             <div class="column">
                Onjomi:
             </div>
             <div class="column">
                {{ currentWord.onjomi }} ({{ currentWord.ronjomi }})
             </div>
           </div>
           <div class="columns" v-if="currentWord.kunjomi">
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
    <div class="columns m-0">
      <div class="column">
        <div v-for="(example, index) in exampleList" :key="example.word + index" class="font-size-md">
          <span class="title is-5">{{ example.word }}</span> ( {{ example.hiragana }} ) {{ example.meaning }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentWord: {
      required: true
    }
  },
  computed: {
    exampleList () {
      let examples = []
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

<style lang="css">
</style>
