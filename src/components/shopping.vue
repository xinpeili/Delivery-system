<template>
	<div class="shopping">
		<div class="shopping-left" @click="exchange">
			<div class="shopping-cart icon-shopping_cart" :class="{noZChart:totalCount !== 0}"></div>
			<div class="total-count" v-if="totalCount !== 0">{{totalCount}}</div>
		</div>
		<div class="shopping-center">
			<div class="count border-1px-right" :class="{noZPrice: totalPrice !== 0}">￥{{totalPrice}}</div>
			<div class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="shopping-right" :class="{ok: totalPrice >= minPrice}">{{minPrice1}}</div>
		<!--弹出层列表-->
		<div class="cart-list-wrapper" v-if="fold && !isSelectFoods">
			<div class="cart-gray"  @click="exchange"></div>
			<div class="cart-list">
				<div class="cart-list-header">
					<span class="cart-title">购物车</span>
					<span class="clear" @click="clear">清空</span>
				</div>
				<div class="food-item" v-for="ele in selectFoods" :key="ele.id">
					<span class="food-title">{{ele.name}}</span>
					<span class="food-price">￥{{ele.price}}</span>
					<cartcontrol class="cart-control" :food="ele"></cartcontrol>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cartcontrol from './cartcontrol'
	export default {
		data () {
			return {
				fold: false
			}
		},
		props: {
			minPrice: {
				type: Number
			},
			deliveryPrice: {
				type: Number
			},
			selectFoods: {
				type: Array,
				default () {
					return [
						{
							count: 10,
							price: 2
						},
						{
							count: 1,
							price: 20
						}
					]
				}
			}
		},
		computed: {
			isSelectFoods() {
				if(this.selectFoods + "" === "") {
					this.fold = false;
					return true;
				}
			},
			totalCount () {
				let totalCount = 0
				this.selectFoods.forEach(ele => {
					totalCount += ele.count
				})
				// console.log(this.selectFoods)
				return totalCount
			},
			totalPrice () {
				console.log(this.selectFoods)
				let totalPrice = 0
				this.selectFoods.forEach(ele => {
					totalPrice += ele.price * ele.count
				})
				return totalPrice
			},
			minPrice1 () {
				if(this.totalPrice === 0){
					return `起送价￥${this.minPrice}`
				} else if (this.totalPrice > 0 && this.totalPrice < 20) {
					return `还差￥${this.minPrice - this.totalPrice}起送`
				} else {
					return `去结算`
				}
			}
		},
		methods: {
			exchange (e) {
				if(!this.totalPrice) {
					alert("请先选择商品");
				} else {
					this.fold = !this.fold;
				}
			},
			clear () {
				this.fold = false;
				this.selectFoods.forEach(ele => {
					ele.count = 0;
				})
			}
		},
		components: {
			cartcontrol
		}
	}
</script>

<style lang="stylus" ref="stylesheet/stylus">
	@import '../assets/stylus/index.styl'
	.shopping
		position: fixed
		bottom: 0
		z-index: 100
		width: 100%
		display: flex
		background-color: #141d27
		height: 24px
		padding: 12px 0
		font-size: 0
		.shopping-left
			flex: 0 0 80px
			position: relative
			.shopping-cart
				position: relative
				font-size: 20px
				margin-left: 18px
				margin-top: -24px
				width: 44px
				height: 44px
				text-align center
				line-height 44px
				border-radius: 50%
				border: 6px solid #141d27
				background-color: #2b333b /*rgba(0,0,0,0.2)*/
				color: rgba(255,255,255,0.4)
				&.noZChart
					background-color: #00a0dc
					color: #ffffff
			.total-count
				position: absolute
				left: 44px
				top: -25px
				background-color: rgb(240,20,20)
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
				font-size: 9px;
				font-weight: 700;
				color: rgb(255,255,255);
				line-height: 18px;
				height: 18px;
				width: 24px;
				border-radius: 8px;
				text-align: center
		.shopping-center
			flex: 1
			div
				display: inline-block
			.count
				font-size: 16px
				color: rgba(255,255,255,0.4)
				font-weight: 700
				line-height: 24px
				border-1px-right(rgba(255,255,255,0.1))
				padding-right: 12px
				&.noZPrice
					color: #ffffff
			.deliveryPrice
				font-size: 16px
				color: rgba(255,255,255,0.4)
				line-height: 24px
				margin-left: 12px
		.shopping-right
			/*flex: 0 0 105px*/
			font-size: 12px
			color: rgba(255,255,255,0.4)
			font-weight: 700
			line-height: 24px
			text-align: center
			background-color: #2b333b
			position: absolute
			right: 0
			top: 0
			width: 105px
			padding: 12px 0
			height: 24px	
			&.ok
				background-color: green
				color: #ffffff
		.cart-list-wrapper
			position: fixed
			bottom: 48px
			top: 0
			width: 100%
			z-index: -1
			display: flex
			flex-direction: column
			.cart-gray
				flex: 1
				background: rgba(7,17,27,0.6)
			.cart-list
				width: 100%
				position: fixed
				font-size: 16px
				bottom: 48px
				left: 0
				background: #ffffff
				overflow: auto
				max-height: 217px
				.cart-list-header
					height: 40px
					background: #f3f5f7
					line-height: 40px
					padding: 0 18px
					border-1px(rgba(7,17,27,0.1))
					.cart-title
						font-size: 14px
						font-weight: 200
						color: rgb(7,17,27)
						float: left
					.clear
						font-size: 12px
						color: rgb(0,160,220)
						float: right
				.food-item
					height: 24px
					margin: 0 18px
					padding: 12px 0
					line-height: 24px
					border-1px(rgba(7,17,27,0.1))
					.food-title
						font-size: 14px
						color: rgb(7,17,27)
					.food-price
						font-size: 14px
						font-weight: 700
						color: rgb(240,20,20)
						float: right
						margin-right: 12px
					.cart-control
						font-size: 24px
						float: right	
						margin-top: -6px
</style>