 // 0.banner的serverURL
 var searchUrl = "https://res.vmallres.com/"
 // 1.动态添加轮播图图片数据
 var albumEl = document.querySelector(".album")
 var activeItemEl = null
 for(var i = 0; i < banners.length; i++){
   // 获取一条数据
   var banner = banners[i]

   // 创建a元素
   var itemEl = document.createElement("a")
   itemEl.classList.add("item")
   itemEl.style.left = `${i*100}%`
   albumEl.append(itemEl)

   // 创建img元素
   var imgEl = document.createElement("img")
   imgEl.src = `${searchUrl}${banner.imgUrl}`
   itemEl.append(imgEl)
 }

 // 在最前面添加最后一张图片,在最后添加第一张图片
 var firstItemEl = albumEl.children[0].cloneNode(true)
 var lastItemEl = albumEl.children[banners.length-1].cloneNode(true)
 albumEl.append(firstItemEl)
 albumEl.prepend(lastItemEl)

 // 修正位置
 lastItemEl.style.left = "-100%"
 firstItemEl.style.left = `${100 * banners.length}%`

 // 2.按钮控制轮播播放
 // 获取元素
 var previousEl = document.querySelector(".previous")
 var nextEl = document.querySelector(".next")
 // 保存一些定义变量
 var previousIndex = 0
 var currentIndex = 0
 // 监听按钮点击
 previousEl.onclick = function(){
   previousIndex = currentIndex
   currentIndex--
   // 让currentIndex变成active状态,让previous变成普通状态
   switchBannerItem()
 }

 nextEl.onclick = function(){
   nextSwitch()
 }

 // 3.自动轮播效果
 var intervalId = null
 var bannerEl = document.querySelector(".banner")
 startSwitchbanner()

 // 4.开启和暂停自动轮播
 // 监听banner事件 
 bannerEl.onmouseenter = function(){
   if(!intervalId) return
   clearInterval(intervalId)
   intervalId = null// 清除定时器之后, 必须timer赋值为null
 }
 bannerEl.onmouseleave = function(){
   if(intervalId) return
   startSwitchbanner()
 }

  // 5.指示器的展示
 var operationEl = document.querySelector(".operation")
 for(var i = 0; i < banners.length; i ++){
   var operationItemEl = document.createElement("span")
   operationItemEl.classList.add("item")
   if(i === 0){
     operationItemEl.classList.add("active")
   }
   operationItemEl.style.left = `${500+i*30}px`
   operationEl.append(operationItemEl)

   // 监听operationItem的index 
   operationItemEl.index = i
   operationItemEl.onclick = function(){
     previousIndex = currentIndex
     currentIndex = this.index
     switchBannerItem()
   }
 }
 
 
 // 封装到函数:switchBannerItem
 function switchBannerItem() {
   albumEl.style.transition = "all 500ms ease"
   albumEl.style.transform = `translateX(${-100*currentIndex}%)`
   if(currentIndex === banners.length){
     currentIndex = 0
     fixBannerPosition()
   }
   if(currentIndex === -1){
     currentIndex = banners.length - 1
     fixBannerPosition()
   }
   var currentOpItemEl = operationEl.children[currentIndex]
   var previousOpItemEl =operationEl.children[previousIndex]
   previousOpItemEl.classList.remove("active")
   currentOpItemEl.classList.add("active")

 }

 // 封装到函数：播放下一个
 function nextSwitch() {
   previousIndex = currentIndex
   currentIndex++ 
   switchBannerItem()
 }

 // 封装开始定时器
 function startSwitchbanner(){
 intervalId = setInterval(function(){
 nextSwitch()
 }, 3000)
 }

 //  封装修正位移函数
 function fixBannerPosition(){
   setTimeout(function(){
       albumEl.style.transition = "none"
       albumEl.style.transform = `translateX(${-100*currentIndex}%)`
     },500)
 }

 // 通过document可见性改变
 document.onvisibilitychange = function(){
   if(document.visibilityState === "visible"){
     startSwitchbanner()
   }else if(document.visibilityState === "hidden"){
     clearInterval(intervalId)
   }
 }