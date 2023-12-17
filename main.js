let cart = JSON.parse(localStorage.getItem("data")) || [];
const itemslist = document.querySelector(".items-list");
const filterBtn = document.querySelector(".categories-container");
const totalProduct= document.getElementById("totalProduct");

// create & load products func
let displayProducts =(data)=>{ 
    return (itemslist.innerHTML = data.map((item)=>{
    let {id,title,price,desc,img} = item;
    let search = cart.find((i)=> i.id === id) || []
    return `<div class="item" id="product-id-${id}">
    <div class="img-box">
      <img src=${img} alt=""/>
    </div>
    <div>
      <hr>
      <h3>${title}</h3>
      <p>${desc}</p>
      <h3 class="price">$ ${price}</h3>
      <div class="quantity">
                      <ion-icon size="large" name="remove-circle" onclick="decrement(${id})"></ion-icon>
                      <div id=${id}> <h3>${search.item === undefined ? 0 : search.item}</h3></div>
                      <ion-icon size="large" name="add-circle" onclick="increment(${id})"></ion-icon>
        </div>
    </div>
  </div>`;
}).join("")
)};
displayProducts(shopItemsData);



// functions for filter menu buttons
function filterFun() {
    // to create non repeating category array
    const categories = shopItemsData.reduce(function(values,item) {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    },["All"]); // default/initial value is all and it is values array

    // to add btns in html container
    let displayFilterBtns =()=>{
        return(filterBtn.innerHTML = categories.map((category)=>{
            return `<div class="category" data-id=${category}><h3>${category}</h3></div>`;
        }).join("")
        )
    }; 
    displayFilterBtns();

    // function to filter items
    const catBtns = document.querySelectorAll(".category");
    catBtns.forEach((btn)=> {
        btn.addEventListener("click", (e)=> {
            const category = e.currentTarget.dataset.id;
            const filteredData = shopItemsData.filter((item)=> {
                if (item.category === category) {
                    return item;
                }
            });
            if (category === 'All') {
                displayProducts(shopItemsData);
                totalProduct.innerHTML = `Products found ${shopItemsData.length}`;
            }else{
                displayProducts(filteredData);
                totalProduct.innerHTML = `Products found ${filteredData.length}`;
            }
        });
    });
}
filterFun();



// products quantity handle
// plus
let increment = (id)=>{
    let selectedItem = id;
    let search = cart.find((i)=>i.id === selectedItem.id);
    if (search === undefined) {
        cart.push({
            id:selectedItem.id,
            item:1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data",JSON.stringify(cart))
    update(selectedItem.id);
    console.log(cart);
};
// minus
let decrement = (id)=>{
    let selectedItem = id;
    let search = cart.find((i)=>i.id === selectedItem.id);
    if (search === undefined) return; 
    else if (search.item === 0) return; 
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    cart = cart.filter((i)=> i.item !== 0);
    localStorage.setItem("data",JSON.stringify(cart))
    console.log(cart);
};
//update quantity
let update = (id)=>{
    let search = cart.find((i)=>i.id === id);
    let qunt = document.getElementById(id);
    qunt.innerHTML= search.item;
    calculation();
};

// cart icon value update
let calculation=()=>{
    let carticon = document.getElementById("cartAmount");
    carticon.innerHTML = cart.map((i)=> i.item).reduce((x,y)=> x+y,0);
};
calculation();
