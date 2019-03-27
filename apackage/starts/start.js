// apackage/starts/start.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		stars: [0, 1, 2, 3, 4],
		normalSrc: '/images/test/normal.png',
		selectedSrc: '/images/test/selected.png',
		halfSrc: '/images/test/half.png',
		key: 5,//评分
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		//点击右边,半颗星
		selectLeft: function (e) {
			var key = e.currentTarget.dataset.key
			if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
				//只有一颗星的时候,再次点击,变为0颗
				key = 0;
			}
			this.setData({
				key: key
			})

		},
		//点击左边,整颗星
		selectRight: function (e) {
			var key = e.currentTarget.dataset.key
			console.log("得" + key + "分")
			this.setData({
				key: key
			})
		}
	}
})
