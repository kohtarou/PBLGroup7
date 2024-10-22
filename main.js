document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('showFormButton');
    const addItemForm = document.getElementById('addItemForm');

    showFormButton.addEventListener('click', function() {
        addItemForm.style.display = 'block';
        showFormButton.style.display = 'none';
    });

    const inventory = [];
    const shoppingList = [];

    function displayInventory() {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        inventory.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.textContent = `${item.name} - 数量: ${item.quantity} - 賞味期限: ${item.expiryDate}`;
            itemList.appendChild(itemLi);
        });
    }

    function displayShoppingList() {
        const shoppingListUl = document.getElementById('shoppingListUl');
        shoppingListUl.innerHTML = '';
        shoppingList.forEach(item => {
            const shoppingListLi = document.createElement('li');
            shoppingListLi.textContent = `${item.name} - 数量: ${item.quantity}`;
            shoppingListUl.appendChild(shoppingListLi);
        });
    }

    function addItem(name, quantity, expiryDate) {
        inventory.push({ name, quantity, expiryDate });
        displayInventory();
    }

    function addShoppingItem(name, quantity) {
        shoppingList.push({ name, quantity });
        displayShoppingList();
    }

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('itemName').value;
        const quantity = document.getElementById('itemQuantity').value;
        const expiryDate = document.getElementById('expiryDate').value;
        if (name && quantity && expiryDate) {
            addItem(name, quantity, expiryDate);
            addShoppingItem(name, quantity); // 買い物リストにも追加
            addItemForm.reset();
            addItemForm.style.display = 'none';
            showFormButton.style.display = 'block';
        }
    });

    // 初期表示
    displayInventory();
    displayShoppingList();
});