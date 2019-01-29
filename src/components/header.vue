<template>
<div>
	<div class="wrapper">
		<div class="content">
			<div class="img">
				<img :src='seller.avatar'/>
			</div>
			<div class="text">
				<div class="text-title">
					<span class="bg-image"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="text-body">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="text-footer" v-if="seller.supports">
					<span class="bg-image" :class='classMap[seller.supports[0].type]'></span>
					<span class="jian">{{seller.supports[0].description}}</span>
					<span class="jian-num" @click="exchangeFold">{{seller.supports.length}}个 > </span>
				</div>
			</div>
		</div>
		<div class="footer" @click="exchangeFold">
			<div class="box">
				<span class="bg-image"></span>
				<span class="gonggao">{{seller.bulletin}}</span>
			</div>
		</div>
		<div class="bg-images">
			<img :src="seller.avatar"/>
		</div>

	</div>
	<div class="jian-message" v-show="fold">
		<div class="title">{{seller.name}}</div>
		<!-- 留給星星組件 -->
		<div class="youhui">优惠信息</div>
		<div class="youhui-wrapper">
			<ul>
				<li v-for="(items,index) in seller.supports" :key="index">
					<span class="bg-img" :class="classMap[items.type]"></span>
					<span>{{items.description}}</span>
				</li>
			</ul>
		</div>
		<div class="gonggao">商家公告</div>
		<div class="gonggao-wrapper">{{seller.bulletin}}</div>
		<div class="close icon-close" @click="exchangeFold"></div>
	</div>
</div>
</template>

<script>
	export default {
		data () {
			return {
				classMap: [],
				fold: false
			}
		},
		props: ['seller'],
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			console.log(this.seller)
		},
		methods: {
			exchangeFold () {
				this.fold = !this.fold;
			}
		}
	}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.wrapper
	width 100%
	background-color rgba(7,17,27,0.5)
	position relative
	overflow hidden
	.content
		padding 24px 12px 18px 24px
		position relative
		.img
			float left
			img
				set-img(64px)
		.text
			margin-left 64px
			padding-left 16px
			.text-title
				.bg-image
					bg-image('brand')
					display inline-block
					width 30px
					height 18px
					background-size 30px 18px
					vertical-align top
				.name
					color rgb(255,255,255)
					font-size 16px
					font-weight bold
					line-height 18px
			.text-body
				color rgb(255,255,255)
				font-size 12px
				font-weight 200
				line-height 12px
				margin-top 8px
			.text-footer
				margin-top 8px
				.bg-image
					display inline-block
					width 14px
					height 14px
					background-size 14px
					vertical-align middle
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
				.jian
					font-size 10px
					color rgb(255,255,255)
					font-weight 200
					line-height 12px
				.jian-num
					font-size 10px
					color rgb(255,255,255)
					font-weight 200
					line-height 12px
					height 12px
					padding 6px 8px
					background-color rgba(0,0,0,0.2)
					float right
					margin-right 12px
					border-radius 12px
	.footer
		width 100%
		height 28px
		background-color rgba(7,17,27,0.2)	
		.box
			padding 0 12px
			white-space nowrap
			text-overflow ellipsis
			overflow hidden
			.bg-image
				bg-image('bulletin')
				display inline-block
				width 25px
				height 16px
				background-size 25px 16px
				vertical-align middle
			.gonggao
				margin-left 4px
				font-size 10px
				color rgb(255,255,255)
				font-weight 200
				line-height 28px
	.bg-images
		width 100%
		position absolute
		z-index -1
		top -80px
		left 0
		filter blur(10px)
		img
			background-size cover
			width 100%
.jian-message
	position absolute
	top 0
	left 0
	z-index 1000
	background-color rgba(7,17,27,0.8)
	width 100%
	height 100%
	.title
		font-size 16px
		font-weight 700
		color rgb(255,255,255)
		line-height 16px
		text-align center
		margin 64px 0 16px 0
	.youhui, .gonggao
		font-size 14px
		font-weight 700
		color rgb(255,255,255)
		margin 28px 0 24px 0
		text-align center
		position relative
		&::before, &::after
			content ''
			height 1px
			width 112px
			background-color rgba(255,255,255,0.2)
			position absolute
			top 50%
		&::before
			left 36px
		&::after
			right 36px
	.youhui-wrapper
		font-size 12px
		font-weight 200
		color rgb(255,255,255)
		line-height 12px
		ul
			margin-left 36px
			padding-left 12px
			li
				margin 12px 0
				.bg-img
					display inline-block
					width 16px
					height 16px
					background-size 14px
					vertical-align middle
					&.decrease
						bg-image('decrease_1')
					&.discount
						bg-image('discount_1')
					&.guarantee
						bg-image('guarantee_1')
					&.invoice
						bg-image('invoice_1')
					&.special
						bg-image('special_1')
	.gonggao-wrapper
		margin 0 36px
		padding 0 12px
		font-size 12px
		font-weight 200
		color rgb(255,255,255)
		line-height 24px
	.close
		position absolute
		bottom 32px
		color rgba(255,255,255,0.5)
		font-size 32px
		left 50%
		transform translateX(-50%)

</style>