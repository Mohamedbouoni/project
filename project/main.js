document.addEventListener("DOMContentLoaded",()=>{

    const addTocartbuttons=document.querySelectorAll(".add-to-cart");
    const cartItemcount=document.querySelector(".cart-icon span");
    const CartItemlist=document.querySelector(".cart-tems");
    const CartTotal=document.querySelector(".cart-total");
    const CartIcon=document.querySelector(".cart-icon");
    const sidebar=document.getElementById("sidebar");

    let cartItems=[];
    let totalAmount=0;
    addTocartbuttons.forEach((button,index)=>{
        button.addEventListener("click",()=>{
            const item= {
                name: document.querySelectorAll(".card .card--title")[index].textContent,
                price: parseFloat(document.querySelectorAll(".price")[index].textContent.slice(1),
            ),quantity:1,
            };
            const exisitingItem=cartItems.find(
                (cartItem)=>cartItem.name===item.name,
            );
            if(exisitingItem){
                exisitingItem.quantity++;
            }else{
                cartItems.push(item);
            }
            totalAmount+=item.price;
            updatecartUI();
        });
        function updatecartUI(){
            updateCartItemCount(cartItems.length);
            updateCartlist();
            updateCartTotal();
        }
        function updateCartItemCount(count){
            cartItemcount.textContent=count;
        }
        function updateCartlist(){
            CartItemlist.innerHTML='';
            cartItems.forEach((item,index)=>{
                const cartItem=document.createElement("div");
                cartItem.classList.add("cart-item", "individual-cart-item" );
                cartItem.innerHTML=`<span>(${item.quantity}X)${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}"> <i class="fa-solid fa-times"</i></button></span>`;
                CartItemlist.appendChild(cartItem);
            });
            const removeButtons=document.querySelectorAll(".remove-item");
            removeButtons.forEach((button)=>{
                button.addEventListener("click",(event)=>{
                    const index=event.target.dataset.index;
                    removeItemFromCart(index);
                }); 
            });
        }
        function removeItemFromCart(index){
            const removeItem=cartItems.splice(index,1)[0];
            totalAmount -=removeItem.price * removeItem.quantity;
            updatecartUI();
        }
        function updateCartTotal(){
            CartTotal.textContent=`$${totalAmount.toFixed(2)}`;
        }
        CartIcon.addEventListener("click",()=>{
            sidebar.classList.toggle("open");
        });
        const closeButton=document.querySelector(".sidebar-close");
        closeButton.addEventListener("click",()=>{
            sidebar.classList.remove('open');
        });
    });
    var icon= document.getElementById("icon");
    icon.onclick=function(){
        document.body.classList.toggle("dark-theme");
        if(document.body.classList.contains("dark-theme")){
            icon.src="sun.png";
        }else{
            icon.src="moon.png";
        }
    }
    const menu2=document.querySelector(".menu2");
    const togglebtn=document.querySelector(".fa-bars");
    const logo=document.querySelector(".restaurant");
    togglebtn.addEventListener("click",()=>{
        menu2.classList.toggle("active");
        logo.classList.toggle("visibale");
    })
    
});

