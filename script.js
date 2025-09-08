const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');

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