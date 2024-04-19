function displaybagitems()
{
  const bag_Container=document.querySelector(".bag-items-container");
  if (!bag_Container) {
    return;
  }
  bag_Container.innerHTML=``;

  bagContainer.forEach(id=>{
    const it= items.filter(i=>i.id==id);
    if(it){
      item=it[0];
    }
    
  bag_Container.innerHTML+=`<div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="../${item.image}">
  </div>
  <div class="item-right-part">
    <div class="company">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price-container">
      <span class="current-price">Rs ${item.current_price}</span>
      <span class="original-price">Rs ${item.original_price}</span>
      <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>

  <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
</div>`

   })
}
displaybagitems();



function removeFromBag(id){
  const rem= bagContainer.filter(i=>i!==id);
  while(bagContainer.length>0) bagContainer.pop();
  bagContainer.push(...rem);
  localStorage.setItem("bagContainer",JSON.stringify(bagContainer));
  displaybagitems();
  bagQuant()
  displayBagSummary();
}


function displayBagSummary(params) {
  const totalItem= bagContainer.length;
  let totalMRP=0;
  let totalDiscount=0;
  bagContainer.forEach(i=>{
    const obj=items.find(item=> item.id==i);
    totalMRP+=obj.original_price;
    totalDiscount+=obj.original_price-obj.current_price;
  });
  let conFee=0
  if(bagContainer.length!=0){
  conFee=99;
  }
  const finalPayment=totalMRP-totalDiscount+conFee;
  const bagSummary= document.querySelector(".bag-summary");
  if(!bagSummary){ 
    return;
  }
  bagSummary.innerHTML=``
  bagSummary.innerHTML+=`<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹${conFee}</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`
}

displayBagSummary();


