<template>
  <div class="setting-panel">
    <slot></slot>
  </div>
</template>
<script>
  export default {
  	name: "setting-panel",
  	data(){
  		return {
  			//Component Data
        example: true,
        foo: "bar"
  		}
  	},

  	created(){
  		//On Component created
  	},

  	methods: {
  		functionExample(){
        //Basic Component method
  		}
  	}
  }
</script>

<style lang="scss" scoped>
.setting-panel {
  position: fixed;
  bottom: 1em;
  right: 1em;
  max-width: 400px;
}
</style>
