document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart on Checkout Page:', cart); // Debugging: Check cart state

    // Function to update the checkout UI
    function updateCheckoutUI() {
        const checkoutItems = document.getElementById('checkout-items');
        const totalPriceElement = document.getElementById('total-price');

        console.log('Updating Checkout UI. Current Cart:', cart); // Debugging: Check cart before updating UI

        // Clear existing items
        checkoutItems.innerHTML = '';

        // Calculate total price and display cart items
        let totalPrice = 0;
        if (cart.length === 0) {
            checkoutItems.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;

                const itemElement = document.createElement('div');
                itemElement.className = 'checkout-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="checkout-item-details">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
                `;
                checkoutItems.appendChild(itemElement);
            });
        }

        // Update total price
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Function to remove item from cart
    window.removeFromCart = function (index) {
        console.log('Removing item at index:', index); // Debugging
        cart.splice(index, 1); // Remove item from cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCheckoutUI(); // Refresh checkout UI
        showNotification('Item removed from cart!'); // Notify user
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

    // Function to handle checkout
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }

        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            localStorage.setItem('pendingCheckoutCart', JSON.stringify(cart)); // Save cart for later
            alert('You must sign up to proceed to checkout.');
            window.location.href = 'register.html'; // Redirect to registration page
        } else {
            window.location.href = 'checkout.html'; // Redirect to checkout page
        }
    });

    // Update checkout UI on page load
    updateCheckoutUI();
});