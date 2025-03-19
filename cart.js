document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add item to cart
    function addToCart(productName, productPrice, productImage) {
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            cart.push({
                name: productName,
                price: parseFloat(productPrice), 
                image: productImage,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartUI(); 
        showNotification(`${productName} added to cart!`); 
    }

    // Function to update the cart UI
    function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartBadge = document.getElementById('cart-badge');

        if (!cartItems || !emptyCartMessage || !cartBadge) {
            console.error('Cart elements not found!');
            return;
        }

        // Clear existing items
        cartItems.innerHTML = '';

        
        let totalItems = 0;
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block'; 
        } else {
            emptyCartMessage.style.display = 'none'; 
            cart.forEach((item, index) => {
                totalItems += item.quantity;

                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
                `;
                cartItems.appendChild(itemElement);
            });
        }

        // Update cart badge
        cartBadge.textContent = totalItems;
    }

    // Function to remove item from cart
    window.removeFromCart = function (index) {
        console.log('Removing item at index:', index); 
        if (index < 0 || index >= cart.length) {
            console.error('Invalid index:', index);
            return;
        }
        cart.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartUI(); 
        showNotification('Item removed from cart!'); 
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000); // Remove notification after 2 seconds
    }

    window.checkout = function () {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
    
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            localStorage.setItem('pendingCheckoutCart', JSON.stringify(cart));
            alert('You must sign up to proceed to checkout.');
            window.location.href = 'register.html';
        } else {
            // Save the cart to localStorage before redirecting
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        }
    }

    // Function to toggle cart dropdown visibility
    window.toggleCart = function () {
        const cartDropdown = document.getElementById('cart-dropdown');
        if (!cartDropdown) {
            console.error('Cart dropdown element not found!');
            return;
        }
        if (cartDropdown.style.display === 'block' || cartDropdown.style.display === '') {
            cartDropdown.style.display = 'none';
        } else {
            cartDropdown.style.display = 'block';
        }
    };

    // Attach event listener to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    // Attach event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card');
            if (!productCard) {
                console.error('Product card not found!');
                return;
            }
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.getAttribute('data-price'); // Get price from data attribute
            const productImage = productCard.querySelector('img').getAttribute('src');
            addToCart(productName, productPrice, productImage); // Add product to cart
        });
    });

    // Update cart UI on page load
    updateCartUI();

   
    // Function to search products
    function searchProducts() {
        const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
        if (!searchQuery) return;

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

        const matchedProduct = products.find(product =>
            product.name.toLowerCase().includes(searchQuery)
        );

        if (matchedProduct) {
            window.location.href = matchedProduct.link;
        } else {
            alert("No matching product found.");
        }
    }

    // Add event listener to search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }

    // Add event listener to search button
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', searchProducts);
    }

    // Hamburger menu functionality
    const hamburger = document.querySelector(".hamburger");
    const navbarLinks = document.querySelector(".navbar-links");
    if (hamburger && navbarLinks) {
        hamburger.addEventListener("click", () => {
            navbarLinks.classList.toggle("active");
        });
    }

    // Display logged-in user's information
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        if (loggedInUser.name && loggedInUser.email) {
            document.getElementById('profile-name').textContent = `Name: ${loggedInUser.name}`;
            document.getElementById('profile-email').textContent = `Email: ${loggedInUser.email}`;
        } else {
            console.error("Logged-in user data is incomplete. Missing 'name' or 'email'.");
        }
    } else {
        console.error("No logged-in user found in sessionStorage.");
    }

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem('loggedInUser'); 
            window.location.href = 'register.html'; 
        });
    }
});

    