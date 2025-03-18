document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Initial Cart:', cart);

    function addToCart(productName, productPrice, productImage) {
        const price = parseFloat(productPrice);
        if (isNaN(price)) {
            console.error('Invalid price for product:', productName);
            return;
        }

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: price,
                image: productImage,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification(`${productName} added to cart!`);
    }

    function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartBadge = document.getElementById('cart-badge');

        if (!cartItems || !emptyCartMessage || !cartBadge) {
            console.error('Cart elements not found!');
            return;
        }

        cartItems.innerHTML = '';
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach((item, index) => {
                const price = parseFloat(item.price);
                if (isNaN(price)) {
                    console.error('Invalid price for item:', item);
                    return;
                }

                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Price: $${price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
                `;
                cartItems.appendChild(itemElement);
            });
        }

        cartBadge.textContent = totalItems;
    }

    window.removeFromCart = function (index) {
        if (index < 0 || index >= cart.length) {
            console.error('Invalid index:', index);
            return;
        }
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification('Item removed from cart!');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2000);
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
            window.location.href = 'checkout.html';
        }
    }

    window.toggleCart = function () {
        const cartDropdown = document.getElementById('cart-dropdown');
        if (!cartDropdown) {
            console.error('Cart dropdown element not found!');
            return;
        }
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    };

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    } else {
        console.error('Cart icon not found!');
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length === 0) {
        console.error('No "Add to Cart" buttons found!');
    } else {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.card');
                if (!productCard) {
                    console.error('Product card not found!');
                    return;
                }
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.getAttribute('data-price');
                const productImage = productCard.querySelector('img').getAttribute('src');
                addToCart(productName, productPrice, productImage);
            });
        });
    }

    updateCartUI();
});
document.addEventListener("DOMContentLoaded", function() {
    // Get all video elements
    const videos = document.querySelectorAll('.video-wrapper video');

    // Loop through each video
    videos.forEach(video => {
        // Play video on mouse enter
        video.parentElement.addEventListener('mouseenter', () => {
            video.play();
        });

        // Pause video on mouse leave
        video.parentElement.addEventListener('mouseleave', () => {
            video.pause();
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const muteButtons = document.querySelectorAll('.mute-button');

    muteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const video = button.parentElement.querySelector('video');
            video.muted = !video.muted;
            button.textContent = video.muted ? '🔇' : '🔊';
        });
    });
});