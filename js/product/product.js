
    // 1.动态展示商品列表 
    var productEl = document.querySelector(".product")

    // 2.服务优惠的筛选
    var menuEl = document.querySelector(".menu")
    var discountEl = menuEl.querySelector(".discount")
    // 定义变量,用户记录选中的服务
    var discountFilter = []
    // 定义变量,用户记录选中的排序
    var sortKey = null

    for(var j = 1; j < discountEl.children.length; j++){
      // 获取对应的discountItemEl
      var discountItemEl = discountEl.children[j]
      // 监听discountItemEl
      discountItemEl.onclick = function() {
        // 在active和非active切换
        this.classList.toggle("active")

        // 判断是否将关键字添加或者从discountFilters移除掉
        if(this.classList.contains("active")){
          discountFilter.push(this.textContent.trim())
        }else{
          var filter = this.textContent.trim()
          var filterIndex = discountFilter.indexOf(filter)
          discountFilter.splice(filterIndex, 1)
        }

        // 1.过滤resultList
        filterResultListAction()

        // 2.已选中排序 进行排序展示
         showSortList(sortKey)
     
      }
    }

     // 监听排序点击事件
     var sortEl = document.querySelector(".sort")
    for(var j = 1; j < sortEl.children.length; j++){
      // 获取对应的discountItemEl
      var sortItemEl = sortEl.children[j]
      var activeEl = sortEl.querySelector(".active")
      // 监听sortItemEl
      sortItemEl.onclick = function() {
        // 取消之前的,添加新的active
        activeEl.classList.remove("active")
        this.classList.add("active")
        activeEl = this

        // 获取信息
        sortKey = this.dataset.key

        // 根据key对数据排序
        showSortList(sortKey)
      }
    }


    // 封装函数:过滤resultList数据
    var resultFilter =[].concat(resultList) 

    function filterResultListAction() {
      resultFilter = resultList.filter(function(item){
        var discount = item.services
        var isFlag = true
        for(var label of discountFilter){
          if(!discount.includes(label)){
            isFlag = false
            break
          }
        }
        return isFlag
      })
    }
    // 封装函数:通过for循环展示数据
    showResultListAction()

    function showResultListAction()  {
      productEl.innerHTML = ""
      for(var i = 0; i < resultFilter.length; i++){ 
      
      var resultItem = resultFilter[i]

      var itemEl = document.createElement("li")
      itemEl.classList.add("item")
      
      var welfareString = ""
      for(var label of resultItem.promoLabels){
        welfareString +=`<span class="tip">${label}</span>` 
      }

      itemEl.innerHTML = `
        <a href="">
          <img class="album" src="https://res.vmallres.com/pimages${resultItem.photoPath}428_428_${resultItem.photoName}" alt="">
          <div class="title">${resultItem.name}</div>
          <div class="discount">${resultItem.promotionInfo}</div>
          <div class="price">¥${resultItem.price}</div>
          <div class="welfare">
            ${welfareString}
          </div>
          <div class="comment">
            <span class="count">${resultItem.rateCount}人评价</span>
            <span class="rate">${resultItem.goodRate}%好评</span>
          </div>
        </a>
      `
      productEl.append(itemEl)
    }
    // 添加空的item
      addEmptyItem() 
    }

  //  封装函数:排序
    function showSortList(key) {
      if(key === "default"){
        filterResultListAction() 
      }else{
        resultFilter.sort(function(item1, item2){
        return item2[key] - item1[key]
        })
      }
      showResultListAction()
    }
      