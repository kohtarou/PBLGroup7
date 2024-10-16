document.addEventListener('DOMContentLoaded', function() {
    const inventory = [];
    
    function displayInventory() {
        const inventoryDiv = document.getElementById('inventory');
        inventoryDiv.innerHTML = '';
        inventory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.name} - 賞味期限: ${item.expiryDate}`;
            ['+', '-'].forEach((text, i) => {
                const button = document.createElement('button');
                button.textContent = text;
                button.addEventListener('click', () => {
                    console.log(i % 2 === 0 ? 'add' : 'subtract');
                });
                itemDiv.appendChild(button);
            });
            inventoryDiv.appendChild(itemDiv);
        });
    }

    function addItem(name, expiryDate) {
        inventory.push({ name, expiryDate });
        displayInventory();
    }

    document.getElementById('addItemButton').addEventListener('click', function() {
        const name = prompt('商品名を入力してください:');
        const expiryDate = prompt('賞味期限を入力してください (YYYY-MM-DD):');
        if (name && expiryDate) {
            addItem(name, expiryDate);
        }
    });

    // 初期表示
    displayInventory();
});