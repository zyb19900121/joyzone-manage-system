<template>
	<div class="search-header">
		<h1>{{pageTitle}}</h1>
	</div>
</template>

<script type='es6'>
export default {
  name: "",
  props: {
    pageTitle: {
      type: String,
      default: new String()
    }
  },
  data() {
    return {};
	}
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.search-header {
	padding: 0 20px;
	height: 60px;
	line-height: 60px;
}
</style>
