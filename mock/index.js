import Mock from 'mockjs'
import Data from '../data.json'

Mock.mock(('/good/seller'),{
	code: 0,
	codeMsg: '成功',
	data: Data.seller
})

Mock.mock(('/good/goods'),{
	code: 0,
	codeMsg: '成功',
	data: Data.goods
})

Mock.mock(('/good/ratings'),{
	code: 0,
	codeMsg: '成功',
	data: Data.ratings
})