document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('showFormButton');
    const addItemForm = document.getElementById('addItemForm');

    showFormButton.addEventListener('click', function() {
        //addItemForm.style.display = 'block';
        modal.style.display = "flex";
        //showFormButton.style.display = 'none';
    });

    const categories = {};

    function displayInventory(category) {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        if (categories[category]) {
            categories[category].forEach((item, index) => {
                const itemLi = document.createElement('li');
                itemLi.textContent = `${item.name} - 数量: ${item.quantity} - 賞味期限: ${item.expiryDate}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '削除';
                deleteButton.addEventListener('click', function() {
                    deleteItem(category, index);
                });

                itemLi.appendChild(deleteButton);
                itemList.appendChild(itemLi);
            });
        }
    }

    function displayAllInventory() {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        Object.keys(categories).forEach(category => {
            categories[category].forEach((item, index) => {
                const itemLi = document.createElement('li');
                itemLi.textContent = `${item.name} - 数量: ${item.quantity} - 賞味期限: ${item.expiryDate}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '削除';
                deleteButton.addEventListener('click', function() {
                    deleteItem(category, index);
                });

                itemLi.appendChild(deleteButton);
                itemList.appendChild(itemLi);
            });
        });
    }

    function displayCategories() {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = '';

        // すべて表示ボタンを追加
        const allCategoriesLi = document.createElement('li');
        const allCategoriesButton = document.createElement('button');
        allCategoriesButton.textContent = 'すべて表示';
        allCategoriesButton.className = 'category-button';
        allCategoriesButton.addEventListener('click', displayAllInventory);
        allCategoriesLi.appendChild(allCategoriesButton);
        categoryList.appendChild(allCategoriesLi);

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

    function deleteItem(category, index) {
        if (categories[category]) {
            categories[category].splice(index, 1);
            if (categories[category].length === 0) {
                delete categories[category]; // カテゴリーが空になったら削除
            }
            displayCategories();
            displayAllInventory(); // 全てのアイテムを表示
        }
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
            modal.style.display = "none";
            //addItemForm.style.display = 'none';
            //showFormButton.style.display = 'block';
        }
    });

    // 初期表示
    displayCategories();
});