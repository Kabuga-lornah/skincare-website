document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.getElementById('checkout-button');
    const confirmOrderButton = document.getElementById('confirm-order-button');

    // Function to display cart items and total price in the review section
    function displayReviewOrder() {
        console.log('Displaying review order...'); // Debugging
        const reviewItemsContainer = document.getElementById('review-items');
        const reviewTotalPriceContainer = document.getElementById('review-total-price');

        // Clear previous content
        if (reviewItemsContainer) reviewItemsContainer.innerHTML = '';
        if (reviewTotalPriceContainer) reviewTotalPriceContainer.innerHTML = '';

        // Get cart items from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Cart data:', cart); // Debugging

        let totalPrice = 0;

        // Display each cart item
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            if (reviewItemsContainer) reviewItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        // Display total price
        if (reviewTotalPriceContainer) {
            reviewTotalPriceContainer.innerHTML = `<p>Total: $${totalPrice.toFixed(2)}</p>`;
        }
    }

    // Function to clear the cart
    function clearCart() {
        localStorage.removeItem('cart');

        // Update the UI to reflect the empty cart
        const checkoutItemsContainer = document.getElementById('checkout-items');
        if (checkoutItemsContainer) {
            checkoutItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
        }

        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = 'Total: $0.00';
        }

        // Update the cart badge if it exists
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            cartBadge.textContent = '0';
        }

        // Clear the review section
        const reviewItemsContainer = document.getElementById('review-items');
        const reviewTotalPriceContainer = document.getElementById('review-total-price');
        if (reviewItemsContainer) reviewItemsContainer.innerHTML = '';
        if (reviewTotalPriceContainer) reviewTotalPriceContainer.innerHTML = '';
    }

    // Event listener for the "Proceed to payment" button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Display the review order section
            const orderReviewDropdown = document.getElementById('order-review');
            if (orderReviewDropdown) {
                console.log('Displaying order review dropdown'); // Debugging
                orderReviewDropdown.style.display = 'block';
                displayReviewOrder();
            } else {
                console.error('orderReviewDropdown not found!');
            }
        });
    } else {
        console.error('checkoutButton not found!');
    }

    // Event listener for the "Confirm Order" button
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Display the thank you message
            alert('Thank you for shopping with us! Your items will arrive in 3-4 business days.');

            // Clear the cart
            clearCart();
        });
    } else {
        console.error('confirmOrderButton not found!');
    }

    // Function to toggle dropdowns
    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        dropdown.parentElement.classList.toggle('active');
    }
});