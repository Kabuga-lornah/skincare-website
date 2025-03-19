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
document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.getElementById('checkout-button');
    const confirmOrderButton = document.getElementById('confirm-order-button');

    // Function to display cart items and total price in the review section
    function displayReviewOrder() {
        const reviewItemsContainer = document.getElementById('review-items');
        const reviewTotalPriceContainer = document.getElementById('review-total-price');

        // Clear previous content
        if (reviewItemsContainer) reviewItemsContainer.innerHTML = '';
        if (reviewTotalPriceContainer) reviewTotalPriceContainer.innerHTML = '';

        // Get cart items from localStorage or your cart management system
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
                orderReviewDropdown.style.display = 'block';
                displayReviewOrder();
            }
        });
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
    }

    // Function to toggle dropdowns
    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        dropdown.parentElement.classList.toggle('active');
    }
});
// Function to toggle user menu visibility
function toggleUserMenu() {
    const userMenu = document.getElementById("userMenu");
    userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
  }
  
  // Function to handle logout
  function logout() {
    sessionStorage.removeItem("loggedInUser"); // Clear logged-in user
    window.location.href = "register.html"; // Redirect to register page
  }
  
  // Close user menu when clicking outside
  document.addEventListener("click", function (event) {
    const userMenu = document.getElementById("userMenu");
    const userIcon = document.querySelector(".user-icon");
    
        // Check if the click is outside the user-icon and user-menu
        if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
          userMenu.style.display = "none";
        }
      });
 // Toggle between Sign Up and Login Forms
 const toggleLink = document.getElementById("toggleLink");
 const registerForm = document.getElementById("registerForm");
 const loginForm = document.getElementById("loginForm");
 const formTitle = document.getElementById("formTitle");
 const toggleText = document.getElementById("toggleText");

 // Set initial state of forms
 registerForm.style.display = "block"; // Show register form by default
 loginForm.style.display = "none"; // Hide login form by default
 formTitle.textContent = "Sign Up"; // Set initial title
 toggleText.textContent = "Already have an account?"; // Set initial toggle text
 toggleLink.textContent = "Login"; // Set initial toggle link text

 toggleLink.addEventListener("click", function (e) {
     e.preventDefault();
     if (registerForm.style.display === "none") {
         registerForm.style.display = "block";
         loginForm.style.display = "none";
         formTitle.textContent = "Sign Up";
         toggleText.textContent = "Already have an account?";
         toggleLink.textContent = "Login";
     } else {
         registerForm.style.display = "none";
         loginForm.style.display = "block";
         formTitle.textContent = "Login";
         toggleText.textContent = "Don't have an account?";
         toggleLink.textContent = "Sign Up";
     }
 });

 // Store User Data in localStorage
 const users = JSON.parse(localStorage.getItem("users")) || [];

 // Sign Up Form Submission
 const signUpForm = document.getElementById("registerForm");
 signUpForm.addEventListener("submit", function (e) {
     e.preventDefault();

     const name = document.getElementById("name").value;
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;
     const confirmPassword = document.getElementById("confirmPassword").value;

     // Check if passwords match
     if (password !== confirmPassword) {
         document.getElementById("passwordError").textContent =
             "Passwords do not match!";
         return;
     }

     // Check if user already exists
     const userExists = users.some((user) => user.email === email);
     if (userExists) {
         document.getElementById("passwordError").textContent =
             "User already exists!";
         return;
     }

     // Create new user
     const newUser = { name, email, password };
     users.push(newUser);
     localStorage.setItem("users", JSON.stringify(users));

     // Show success message
     document.getElementById("successMessage").textContent =
         "Registration successful!";
     signUpForm.reset();
 });

 // Login Form Submission
 const loginFormElement = document.getElementById("loginForm");
 loginFormElement.addEventListener("submit", function (e) {
     e.preventDefault();

     const email = document.getElementById("loginEmail").value;
     const password = document.getElementById("loginPassword").value;

     // Find user in localStorage
     const user = users.find(
         (user) => user.email === email && user.password === password
     );

     if (user) {
         // Store logged-in user in sessionStorage
         sessionStorage.setItem("loggedInUser", JSON.stringify(user));
         alert("Login successful! Redirecting to shop...");
         window.location.href = "shop.html"; // Redirect to shop page
     } else {
         alert("Invalid email or password!");
     }
 });

 // Check if the user is logged in
 const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
 const isLoggedIn = loggedInUser !== null;

 // Get the user icon element
 const userIcon = document.getElementById("user-icon");

 // Function to handle user icon click
 userIcon.addEventListener("click", function (event) {
     event.preventDefault(); // Prevent the default link behavior

     if (isLoggedIn) {
         // If the user is logged in, show a dropdown or modal with options to view profile or log out
         const dropdown = document.createElement("div");
         dropdown.innerHTML = `
             <div class="user-dropdown">
                 <a href="profile.html">View Profile</a>
                 <a href="#" id="logout-link">Log Out</a>
             </div>
         `;
         dropdown.style.position = "absolute";
         dropdown.style.top = "50px"; // Adjust as needed
         dropdown.style.right = "20px"; // Adjust as needed
         dropdown.style.backgroundColor = "white";
         dropdown.style.border = "1px solid #ccc";
         dropdown.style.padding = "10px";
         dropdown.style.zIndex = "1000";
         document.body.appendChild(dropdown);

         // Handle logout link click
         const logoutLink = document.getElementById("logout-link");
         logoutLink.addEventListener("click", function (event) {
             event.preventDefault();
             sessionStorage.removeItem("loggedInUser"); // Clear logged-in user
             window.location.href = "register.html"; // Redirect to register page
         });
     } else {
         // If the user is not logged in, redirect to the register page
         window.location.href = "register.html";
     }
 });
