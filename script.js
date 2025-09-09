const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');
const cartContainer = document.getElementById('cart-container');
const cartItemContainer = document.getElementById('cart-item-count');
let totalPrice = document.getElementById('total-price');
let isCartItemCountDisplay = false;
let totalCartItem = 0;

// load category from api
const loadCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.categories))
    .catch(err => console.log("something is wrong", err))
}

// call load category
loadCategory();

// display category 
const displayCategory = data => {
    data.forEach(cat => {
        const li = document.createElement('li');
        li.classList.add('category-btn', 'hover:bg-green-500', 'hover:text-white', 'py-1', 'px-2', 'rounded', 'my-2');
        li.id = `category-${cat.id}`;
        li.title = `${cat.small_description}`;
        li.innerHTML = `
            ${cat.category_name}
        `;
        categoryContainer.appendChild(li);
    });
}

// category active status
categoryContainer.addEventListener('click', (event) => {
    // remove previous active color
    const allLi = document.querySelectorAll('li');
    allLi.forEach(sts => {
        sts.classList.remove('bg-green-700', 'text-white');
    })

    // add active color
    if(event.target.localName === 'li'){
        event.target.classList.add('bg-green-700', 'text-white');
    };
})

// load default card
const loadDefaultCard = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res => res.json())
    .then(data => displayDefaultCard(data.plants))
    .catch(err => console.log('something is wrong'))
}

// call default card 
loadDefaultCard();

// display card
const displayDefaultCard = (data, catId = 0) => {
    cardContainer.innerHTML = "";
    data.forEach(tree => {
        const card = document.createElement('div');
        card.classList.add('p-4', 'rounded-xl', 'bg-white', 'shadow', 'h-full', 'hover:scale-105', 'opacity-90', 'hover:opacity-100', 'flex', 'flex-col', 'justify-between');
        card.id = `${tree.id}`;
        card.innerHTML = `
                    <img class="mb-3 rounded w-full h-52 bg-cover" src="${tree.image}" alt="${tree.name}">
                    <h1 class="tree-name font-bold">${tree.name}</h1>
                    <p class="text-gray-500 mt-2">${tree.description}</p>
                    <div class="flex justify-between items-center my-3">
                        <div class="py-2 px-3 font-bold text-green-700 bg-green-200 rounded-full">${tree.category}</div>
                        <p class="font-bold">$<span>${tree.price}</span></p>
                    </div>
                    <button class="cart-btn bg-green-700 text-white hover:bg-green-600 cursor-pointer font-semibold py-2 px-1 rounded-full w-full">Add to Cart</button>
        `;
        cardContainer.appendChild(card);
    })
}

// load card by category
categoryContainer.addEventListener('click', (event) => {
    const getId = event.target.id.slice(9);
    if(event.target.classList.contains('category-btn')){
        loadCardByCategory(getId);
    };
})


// loads card by category function 
const loadCardByCategory = (id) => {
    const catId = id;
    const url = `https://openapi.programming-hero.com/api/category/${catId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDefaultCard(data.plants, catId))
    .catch(err => console.log(`something is wrong`, err))
}

// loads card details
cardContainer.addEventListener('click', (event) => {
    const cardId = event.target.parentNode.id;
    if(event.target.classList.contains('tree-name')){
        const url = `https://openapi.programming-hero.com/api/plant/${cardId}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setModalValue(data.plants))
        .catch(err => console.log("something is wrong", err))
    };
})

// set modal value and call
const setModalValue = data => {
    const treeName = document.getElementById('tree-name');
    const treeImg = document.getElementById('tree-img');
    const treeCategory = document.getElementById('tree-category');
    const treePrice = document.getElementById('tree-price');
    const treeDes = document.getElementById('tree-des');
    const detailsModal = document.getElementById('details-modal');

    treeName.innerHTML = data.name;
    treeImg.src = data.image;
    treeCategory.innerHTML = data.category;
    treePrice.innerHTML = data.price;
    treeDes.innerHTML = data.description;

    // display modal
    detailsModal.showModal();
}

// add too cart
cardContainer.addEventListener('click', (event) => {
    const treeName = event.target.parentNode.children[1].innerHTML;
    const treePrice = event.target.parentNode.children[3].querySelector('span').innerHTML;

    if(event.target.classList.contains('cart-btn')){
        // add to cart alert
        alert(`${treeName} has been added to the cart`);

        // total cart item display
        totalCartItem++;
        if(isCartItemCountDisplay === false){
            const div = document.createElement('div');
            div.classList.add('flex', 'justify-between', 'items-center');
            div.innerHTML = `
                        <h2 class="font-semibold text-gray-500">Total Item</h2>
                        <div class="text-gray-500">
                            <i class="fa-solid fa-cart-shopping"></i> <span id="total-item">0</span>
                        </div>
            `;
            cartItemContainer.appendChild(div);
            isCartItemCountDisplay = true;
            document.getElementById('total-item').innerHTML = totalCartItem;
        }
        else{
            document.getElementById('total-item').innerHTML = totalCartItem;
        }


        const cartCard = document.createElement('div');
        cartCard.classList.add('flex', 'items-center', 'justify-between', 'gap-2', 'bg-gray-100', 'rounded', 'p-3', 'my-3');
        cartCard.innerHTML = `
                        <div>
                            <h1 class="font-semibold mb-1">${treeName}</h1>
                            <p class="font-semibold">$<span>${treePrice}</span></p>
                        </div>
                        <div>
                            <p class="remove-btn cursor-pointer">❌</p>
                        </div>
        `;
        cartContainer.appendChild(cartCard);

        // money calculation
        const totalPriceNum = Number(totalPrice.innerHTML);
        const cardTreePrice = Number(treePrice);
        let currentPrice = totalPriceNum + cardTreePrice;
        totalPrice.innerHTML = currentPrice;
    };
})

// remove cart items
cartContainer.addEventListener('click', (event) => {
    const cartCardPrice = Number(event.target.parentNode.parentNode.children[0].querySelector('span').innerHTML);
    const total = Number(totalPrice.innerHTML);

    if(event.target.classList.contains('remove-btn')){
        // subtraction
        totalCartItem--;
        document.getElementById('total-item').innerHTML = totalCartItem;

        // subtraction before item remove
        let currentPrice = total - cartCardPrice;
        totalPrice.innerHTML = currentPrice;

        // remove element
        const cart = event.target.parentNode.parentNode;
        cart.remove();
    };
})