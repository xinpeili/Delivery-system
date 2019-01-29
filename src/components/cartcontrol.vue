<template>
	<div id="cart-control">
		<div class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click="dec"></div>
		<div class="count" v-show="food.count > 0">{{food.count}}</div>
		<div class="increase icon-add_circle" @click="inc"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			// 绑定了一个bsscrol
			dec (event) {
				// if(event._constructed) {
					
					if(this.food.count === 0){
						return
					}
					this.food.count --
				// }
			},
			inc (event) {
				// if(event._constructed) {
					if(!this.food.count) {
						Vue.set(this.food,"count")
						this.food.count = 1
					} else {
						this.food.count ++
					}
					console.log(this.food.count)
				// }
			}
		}
	}
</script>

<style lang="stylus" ref="stylesheet/stylus">
	@import '../assets/stylus/index.styl'
	#cart-control
		font-size: 0
		div
			display: inline-block
		.icon-remove_circle_outline, .icon-add_circle
			width: 24px
			height: 24px
			line-height: 24px
			font-size: 24px
		.decrease, .increase
			padding: 6px
			color: #00a0dc
			font-size: 24px
		.count
			font-size: 10px
			text-align: center
			width: 12px
			line-height: 24px
			color: rgb(147,153,159)
			vertical-align: top
			padding: 6px 0
</style>