
    // Cart Data
    let cart = [];

    // Toggle Cart Dropdown
    function toggleCart() {
        const cartDropdown = document.getElementById('cart-dropdown');
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
        updateCartUI();
    }

    // Add Item to Cart
    function addToCart(productName, productPrice, productImage) {
        const product = { name: productName, price: productPrice, image: productImage };
        cart.push(product);
        updateCartUI();
        showNotification(`${productName} added to cart!`);
    }

    // Remove Item from Cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    // Update Cart UI
    function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartBadge = document.getElementById('cart-badge');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        // Update Cart Badge
        cartBadge.textContent = cart.length;

        // Update Cart Items
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="images/${item.image}" alt="${item.name}" />
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} USD</p>
                </div>
                <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
            </div>
        `).join('');

        // Show/Hide Empty Cart Message
        emptyCartMessage.style.display = cart.length === 0 ? 'block' : 'none';
    }

    // Show Notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Checkout
    function checkout() {
        alert('Checkout functionality will be implemented later!');
    }

    // Function to search products
    function searchProducts() {
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        if (!searchQuery) return; // Exit if the search query is empty

        // Define product data (name and corresponding "Learn More" link)
        const products = [
            { name: "Niacinamide 10% + Zinc 1%", link: "learn.html#product1" },
            { name: "Hyaluronic Acid 2% + B5 (with Ceramides)", link: "learn.html#product2" },
            { name: "Natural Moisturizing Factors + PhytoCeramides", link: "learn.html#product3" },
            { name: "Glycolic Acid 7% Exfoliating Toner", link: "learn.html#product4" },
            { name: "Natural Moisturizing Factors + HA", link: "learn.html#product5" },
            { name: "Squalane Cleanser", link: "learn.html#product6" },
            { name: "Glycolipid Cream Cleanser", link: "learn.html#product7" },
            { name: "Multi-Peptide Eye Serum", link: "learn.html#product8" },
            { name: "Multi-Peptide + HA Serum", link: "learn.html#product9" },
            { name: "Multi-Peptide + Copper Peptides 1% Serum", link: "learn.html#product10" },
            { name: "Retinal 0.2% Emulsion", link: "learn.html#product11" },
            { name: "Multi-Peptide Serum for Hair Density", link: "learn.html#product12" }
        ];

        // Find the product that matches the search query
        const matchedProduct = products.find(product => 
            product.name.toLowerCase().includes(searchQuery)
        );

        if (matchedProduct) {
            // Redirect to the "Learn More" page for the matched product
            window.location.href = matchedProduct.link;
        } else {
            // Show a message if no product is found
            alert("No matching product found.");
        }
    }

    // Add event listener to the search input for real-time search
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts(); // Trigger search on Enter key press
        }
    });

    // Add event listener to the search button
    document.querySelector('.search-bar button').addEventListener('click', searchProducts);
