document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('showFormButton');
    const addItemForm = document.getElementById('addItemForm');

    showFormButton.addEventListener('click', function() {
        addItemForm.style.display = 'block';
        showFormButton.style.display = 'none';
    });

    const inventory = [];
    const categories = {};

    function displayInventory(category) {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        if (categories[category]) {
            categories[category].forEach(item => {
                const itemLi = document.createElement('li');
                itemLi.textContent = `${item.name} - 数量: ${item.quantity} - 賞味期限: ${item.expiryDate}`;
                itemList.appendChild(itemLi);
            });
        }
    }

    function displayCategories() {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = '';
        Object.keys(categories).forEach(category => {
            const categoryLi = document.createElement('li');
            const categoryButton = document.createElement('button');
            categoryButton.textContent = category;
            categoryButton.className = 'category-button';
            categoryButton.addEventListener('click', function() {
                displayInventory(category);
            });
            categoryLi.appendChild(categoryButton);
            categoryList.appendChild(categoryLi);
        });
    }

    function addItem(name, quantity, expiryDate, category) {
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ name, quantity, expiryDate });
        displayInventory(category);
        displayCategories();
    }

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('itemName').value;
        const quantity = document.getElementById('itemQuantity').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const category = document.getElementById('itemCategory').value;
        if (name && quantity && expiryDate && category) {
            addItem(name, quantity, expiryDate, category);
            addItemForm.reset();
            addItemForm.style.display = 'none';
            showFormButton.style.display = 'block';
        }
    });

    // 初期表示
    displayCategories();
});