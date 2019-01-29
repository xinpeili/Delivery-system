<template>
	<div class="goods">
		<!--通过$refs找到对象-->
		<div class="goods-title" ref='titleWrapper'>
			<div class="list" v-for="(item,index) in goods" :key="item.id" :class="{active:activeIndex === index}" @click="selectIndex(index,$event)">
				<div class="text-wrapper">
					<span class="icon" v-show="item.type > 0" :class='classMap[item.type]'></span>
					<span class="text">{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="goods-content" ref='contentWrapper'>
			<ul class="content">
				<li class="content-list" v-for="items in goods" :key="items.id">
					<div class="items-title">{{items.name}}</div>
					<ul class="content1">
						<li class="content1-list" v-for="ele in items.foods" :key="ele.id">
							<div class="bg-image">
								<img :src="ele.icon"/>
							</div>
							<div class="text">
								<div class="content-title">{{ele.name}}</div>
								<div v-if="ele.description" class="desc content-desc">{{ele.description}}</div>
								<div class="haoping desc">
									<span class="first">月售{{ele.sellCount}}份</span>
									<span>好评率{{ele.rating}}%</span>
								</div>
								<div class="pay">
									<span class="new">￥{{ele.price}}</span>
									<span class="old" v-if="ele.oldPrice">￥{{ele.oldPrice}}</span>
									<div class="btn">
										<cartcontrol :food=ele></cartcontrol>
									</div>
								</div>
								
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--购物车-->
		<shopping :selectFoods="selectFoods" :minPrice="minPrice" :deliveryPrice="deliveryPrice"></shopping>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import shopping from './shopping'
	import cartcontrol from './cartcontrol'
	
	export default {
		data () {
			return {
				goods: {},
				classMap: [],
				heightList: [],
				scrollY: 0
			}
		},
		props: {
			minPrice: {
				type: Number
			},
			deliveryPrice: {
				type: Number
			}
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			axios.get('/good/goods').then(res => {
				if(res.data.code === 0){
					this.goods = res.data.data
					// 加载完数据再绑定事件
					Vue.nextTick(() => {
						this._initscroll()	// 绑定滑动事件
						this._caculateHeight()  //计算foods的高度
					})
				}
			})
		},
		computed: {
			activeIndex () {
				for(let i = 0; i < this.heightList.length; i ++){
					let height1 = this.heightList[i]
					let height2 = this.heightList[i + 1]
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
						return i
					}
				}
				return 0
			},
			selectFoods () {
				let foods = []
				if(this.goods.length !== 0) {
					Array.from(this.goods).forEach(item => {
						item.foods.forEach(items => {
							if(items.count) {
								foods.push(items)
							}
						})
					})
				}
				return foods
			}
		},
		methods: {
			selectIndex(index,$event) {
				// 忽略滑动
				console.log($event)
				if(!$event._constructed){
					return
				}
				let foodList = this.$refs.contentWrapper.getElementsByClassName('content-list')
				this.contentScroll.scrollToElement(foodList[index],200)
			},
			// better-scroll
			_initscroll() {
				this.titleScroll = new BScroll(this.$refs.titleWrapper,{
					click: true
				})
				this.contentScroll = new BScroll(this.$refs.contentWrapper,{
					probeType: 3,	// 探针的效果，实时获取滚动高度
					click: true
				})
				this.contentScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			// 计算每一个list的高度
			_caculateHeight() {
				let foodList = this.$refs.contentWrapper.getElementsByClassName('content-list')
				let height = 0
				this.heightList.push(height)
				for(let i = 0; i < foodList.length; i ++){
					let item = foodList[i]
					height += item.clientHeight
					this.heightList.push(height)
				}
			}
		},
		components: {
			shopping,
			cartcontrol
		}
	}
</script>

<style lang="stylus" ref="stylesheet/stylus">
	@import '../assets/stylus/index.styl'
	.goods
		width 100%
		display flex
		position absolute
		top 173px
		bottom 48px
		left 0
		right 0
		overflow hidden
		.goods-title
			flex 0 0 80px
			width 80px
			background-color #f3f5f7
			box-sizing border-box
			.list
				padding 0 12px
				&.active
					position relative
					margin-top -1px
					background-color #fff
					&:after
						border-top 1px solid #fff
					.text
						font-size 12
						line-height 14px
						font-weight 500
				.text-wrapper
					height 54px
					width 56px
					display table-cell
					vertical-align middle
					font-size 0
					font-weight 200
					border-1px(rgba(7,17,27,0.1))
					.icon
						display inline-block
						width 14px
						height 14px
						background-size 14px 14px
						vertical-align top
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
					.text
						font-size 12px
						line-height 14px
						
						
		.goods-content
			flex 1
			position relative
			.items-title
				background-color #f3f5f7
				font-size 12px
				color rgb(147,153,159)
				font-weight 700
				line-height 26px
				padding-left 14px
				height 26px
				border-left 4px solid #d9dde1
			.content1-list
				padding 18px
				border-1px(rgba(7,17,27,0.1))
				.bg-image
					float left
					img
						width 64px
						height 64px
				.text
					margin-left 74px	
					.content-title
						font-size 14px
						margin-top 2px
						margin-bottom 8px
						color rgb(7,17,27)
						line-height 14px
					.desc
						font-size 10px
						color rgb(147,153,159)
						line-height 10px
					.haoping
						margin-top 8px
						.first
							margin-right 12px	
					.pay
						position relative					
						.new
							font-size 14px
							color rgb(240,20,20)
							font-weight 700
							line-height 24px
						.old
							font-size 10px
							color rgb(147,153,159)
							font-weight 700
							line-height 24px
							text-decoration:line-through
						.btn	
							position absolute
							right: 0
							top: -5px
			
</style>