let label = document.getElementById("lable");
let totalP = document.querySelector(".tPrice");
let shoppingCart = document.querySelector(".items-list");
let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation=()=>{
    let carticon = document.getElementById("cartAmount");
    carticon.innerHTML = cart.map((i)=> i.item).reduce((x,y)=> x+y,0);
};
calculation();

let generateCart = ()=>{
    if (cart.length !== 0) {
        return (shoppingCart.innerHTML = cart.map((x)=>{
            let {id,item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return `<div class="cart-item">
            <div class="img-box">
                <img src=${search.img} alt="">
            </div>
            <div>
                <h3>${search.title}</h3>
                <h3>$ ${search.price}</h3>
                <h3 class="price">Total Price: ${item*search.price}</h3>
            </div>
            <div class="btn-quant">
                  <ion-icon size="large" name="remove-circle" onclick="decrement(${id})"></ion-icon>
                  <div id=${id}> <h3>${item}</h3></div>
                  <ion-icon size="large" name="add-circle" onclick="increment(${id})"></ion-icon>
            </div>
        </div>
        <hr>`;
        }).join(""));

    } else {
        shoppingCart.innerHTML = `<h2>Cart is empty</h2>`;
    }
};
generateCart();

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
    generateCart();
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
    generateCart();
    localStorage.setItem("data",JSON.stringify(cart))
    console.log(cart);
};
//update quantity
let update = (id)=>{
    let search = cart.find((i)=>i.id === id);
    let qunt = document.getElementById(id);
    qunt.innerHTML= search.item;
    calculation();
    totalAmt();
};


let clearCart = ()=>{
    cart = [];
    generateCart();
    localStorage.setItem("data",JSON.stringify(cart))
    calculation();
    totalAmt();
};


let totalAmt =()=>{
    if (cart.length !== 0) {
        let amount = cart.map((i)=>{
            let {item,id} = i;
            let search = shopItemsData.find((j)=> j.id === id) || [];
            return item * search.price;
        }) // console.log(amount);
        .reduce((x,y)=> x+y,0);
        // console.log(amount);
        label.innerHTML = `$ ${amount}`;
        totalP.innerHTML= `$ ${amount}`;
    } else{
        label.innerHTML = `$ 0`;
        totalP.innerHTML= `$ 0`;
    };
};
totalAmt();


