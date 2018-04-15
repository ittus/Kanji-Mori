<template>
    <div>
      <a v-if="!isShowSetting" class="button is-primary" @click="isShowSetting = !isShowSetting">
        <b-icon
            icon="settings"
            size="is-small">
        </b-icon>
        <span>Settings</span>
      </a>
      <div v-else-if="isLoadingSetting">Loading...</div>
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
                   <div class="columns is-multiline">
                     <div v-for="lesson in lessons" :key="lesson" class="column is-3">
                        <b-checkbox>{{ lesson }}</b-checkbox>
                     </div>
                   </div>

                 </div>
               </div>
             </div>
             <footer class="card-footer">
                 <a class="card-footer-item" @click="isShowSetting = false">Close</a>
             </footer>
         </b-collapse>
     </section>
      </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
    // TODO: Add loading spinner
  export default {
  	name: "Setting",
  	data(){
  		return {
  			isShowSetting: true,
        lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  		}
  	},

  	computed: {
      ...mapState(['isLoadingSetting'])
    },

  	methods: {
  		functionExample(){
        //Basic Component method
  		}
  	}
  }
</script>
