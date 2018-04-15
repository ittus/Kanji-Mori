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
  		}
  	},

  	methods: {
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
