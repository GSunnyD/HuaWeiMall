function addEmptyItem() {
  for(var i = 0; i < 2; i++){ 
  var itemEl = document.createElement("li")
  itemEl.classList.add("item")
  itemEl.classList.add("empty")
  productEl.append(itemEl)
}
}
