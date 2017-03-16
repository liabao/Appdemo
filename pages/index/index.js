//index.js
Page({
  data: {
    swiperimgUrls: [
      '../../images/product/swiper1.jpg',
      '../../images/product/swiper2.jpg',
      '../../images/product/swiper3.jpg'
    ],
     products:[{
        name:'ZYA札雅韩版新款单肩包女士',
        price:199,
        sales:300
    },
    {
        name:'ZYA札雅韩版新款单肩包女士',
        price:199.00,
        sales:300
    },
    {
        name:'ZYA札雅韩版新款单肩包女士',
        price:199.00,
        sales:300
    },
    {
        name:'ZYA札雅韩版新款单肩包女士',
        price:199.00,
        sales:300
    }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
