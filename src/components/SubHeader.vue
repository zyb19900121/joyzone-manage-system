<template>
	<div class="sub-header">
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

.sub-header {
	padding: 20px 20px 0 20px;

}
</style>
