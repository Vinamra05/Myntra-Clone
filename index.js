const  bagContainer=[];

function main()
{
 const i= JSON.parse(localStorage.getItem("bagContainer"))
 if(i)
 bagContainer.push(...i);
 console.log(bagContainer);
 bagQuant();
}
main()

function bagQuant(params) {
  const bagValue= document.querySelector(".bag-item-count");
  bagValue.innerText=bagContainer.length;
}


function displayItems(){
  const itemContainer=document.querySelector(".items-container")
  if (!itemContainer) {
    return;
  }
  items.forEach(item=>{
    itemContainer.innerHTML+=`<div class="item-container">
    <img class="item-image" src="${item.image}" alt="item image">
    <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count>1000?item.rating.count/1000+"K":item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
  </div>`
  })
}

displayItems();
 
function addToBag(id)
{
  bagContainer.push(id);
  localStorage.setItem("bagContainer",JSON.stringify(bagContainer)) 
  bagQuant()

  var x = document.getElementById("snackbar");
  x.className = "show";
  
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}