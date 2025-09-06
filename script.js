const categoryContainer = document.getElementById('category-container');

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