<template>
    <div>
      <a v-if="!isShowSetting" class="button is-primary" @click="isShowSetting = !isShowSetting">
        <b-icon
            icon="settings"
            size="is-small">
        </b-icon>
        <span>Settings</span>
      </a>
      <div v-else>
        <section>
         <b-collapse class="card">
             <div slot="trigger" slot-scope="props" class="card-header">
                 <p class="card-header-title">
                     Lesson
                 </p>
                 <a class="card-header-icon">
                     <b-icon
                         :icon="props.open ? 'menu-down' : 'menu-up'">
                     </b-icon>
                 </a>
             </div>
             <div class="card-content">
               <div class="content">
                 <div class="block">
                   <div class="columns is-multiline lesson-list">
                     <div v-for="lesson in lessons" :key="lesson" class="column is-3">
                        <b-checkbox v-model="localSettings" :native-value="lesson">{{ lesson }}</b-checkbox>
                     </div>
                   </div>

                 </div>
               </div>
             </div>
             <footer class="card-footer">
                 <a class="card-footer-item" @click="resetSettings">Reset</a>
                 <a class="card-footer-item" @click="isShowSetting = false">Close</a>
             </footer>
         </b-collapse>
     </section>
      </div>
    </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import * as Constants from '../utils/constants'
    // TODO: Add loading spinner
  export default {
  	name: "Setting",
  	data() {
  		return {
  			isShowSetting: false,
        lessons: 32,
        localSettings: []
  		}
  	},
    created() {
      console.log('localSettings created')
      this.localSettings = this.settings[Constants.KANJI_512_KEY]
    },
  	computed: {
      ...mapState(['settings'])
    },
    watch: {
      localSettings (newVal, oldVal) {
        console.log('localSettings change', newVal, oldVal)
        if (newVal.length !== oldVal.length) {
          const newSettings = {
            ...this.settings,
            [Constants.KANJI_512_KEY]: newVal
          }
          this.saveSettings(newSettings)
        }
      }
    },
  	methods: {
      ...mapActions(['resetSettings', 'saveSettings'])
  	}
  }
</script>

<style lang="scss">
.lesson-list {
  max-height: 200px;
  overflow-y: auto;
}

</style>
