<template>
  <div id="app">
    <div class="header">
    	<v-header :seller='seller'></v-header>
    </div>
    <div class="tab border-1px">
    	<div class="tab-item">
    		<router-link to='/goods'>商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to='/ratings'>评价</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to='/seller'>商家</router-link>
    	</div>
    </div>
    <div class="content">
    	<router-view :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header'
import axios from 'axios'
	
export default {
  name: 'App',
	data () {
		return {
			seller: {}
		}
	},
	components: {
		'v-header': header
	},
	created () {
		axios.get('/good/seller').then(res => {
			if(res.data.code === 0){
				this.seller = res.data.data
			}
		})
	}
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import './assets/stylus/index.styl'
#app 
	.tab
		display flex
		width 100%
		height 40px
		border-1px(rgba(240,20,20,0.2))
		.tab-item
			flex 1
			text-align center
			line-height 40px
			font-size 18px
			a
				display inline-block
				color rgb(77,85,93)
				width 100%
				height 100%
			a.router-link-active
				color rgb(240,20,20)
</style>
