document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('showFormButton');
    const addItemForm = document.getElementById('addItemForm');
    const cancelButton = document.getElementById('cancelButton');
    const categorySelect = document.getElementById('categorySelect');

    showFormButton.addEventListener('click', function() {
        modal.style.display = "flex";
    });

    const categories = {};

    function displayInventory(category) {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        if (category === 'all') {
            Object.keys(categories).forEach(cat => {
                categories[cat].forEach((item, index) => {
                    const itemLi = document.createElement('li');
                    itemLi.className = 'item';

                    const itemName = document.createElement('span');
                    itemName.className = 'item-name';
                    itemName.textContent = item.name;

                    const itemQuantity = document.createElement('span');
                    itemQuantity.className = 'item-quantity';
                    itemQuantity.textContent = `${item.quantity}`;

                    const itemExpiryDate = document.createElement('span');
                    itemExpiryDate.className = 'item-expiry-date';
                    itemExpiryDate.textContent = `${item.expiryDate}`;

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '削除';
                    deleteButton.addEventListener('click', function() {
                        deleteItem(cat, index);
                    });

                    itemLi.appendChild(itemName);
                    itemLi.appendChild(itemQuantity);
                    itemLi.appendChild(itemExpiryDate);
                    itemLi.appendChild(deleteButton);
                    itemList.appendChild(itemLi);
                });
            });
        } else if (categories[category]) {
            categories[category].forEach((item, index) => {
                const itemLi = document.createElement('li');
                itemLi.className = 'item';

                const itemName = document.createElement('span');
                itemName.className = 'item-name';
                itemName.textContent = item.name;

                const itemQuantity = document.createElement('span');
                itemQuantity.className = 'item-quantity';
                itemQuantity.textContent = `${item.quantity}`;

                const itemExpiryDate = document.createElement('span');
                itemExpiryDate.className = 'item-expiry-date';
                itemExpiryDate.textContent = `${item.expiryDate}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '削除';
                deleteButton.addEventListener('click', function() {
                    deleteItem(category, index);
                });

                itemLi.appendChild(itemName);
                itemLi.appendChild(itemQuantity);
                itemLi.appendChild(itemExpiryDate);
                itemLi.appendChild(deleteButton);
                itemList.appendChild(itemLi);
            });
        }
    }

    function displayCategories() {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = '';
        categorySelect.innerHTML = '<option value="all">すべて表示</option>';

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

            const categoryOption = document.createElement('option');
            categoryOption.value = category;
            categoryOption.textContent = category;
            categorySelect.appendChild(categoryOption);
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
        }
    });

    cancelButton.addEventListener('click', function(event) {
        event.preventDefault();
        addItemForm.reset();
        modal.style.display = "none";
    });

    categorySelect.addEventListener('change', function() {
        const selectedCategory = categorySelect.value;
        displayInventory(selectedCategory);
    });

    // 初期表示
    displayCategories();
});