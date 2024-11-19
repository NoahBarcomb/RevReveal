let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isPayPalButtonRendered = false; // Flag to track PayPal button rendering

// Function to add an item to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart)); // Persist cart in local storage
    updateCartBadge(); // Update cart count on the icon
}

// Function to update the cart item count on the badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
}

// Function to display the items in the cart and the total amount
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    if (!cartItems || !cartTotal || !paypalButtonContainer) {
        console.error('Cart elements not found!');
        return;
    }

    cartItems.innerHTML = ''; // Clear the previous items
    let total = 0;

    cart.forEach((item) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Render PayPal button only if there are items in the cart
    if (cart.length > 0 && !isPayPalButtonRendered) {
        renderPayPalButton(total);
    } else if (cart.length === 0) {
        paypalButtonContainer.innerHTML = ''; // Clear PayPal buttons if cart is empty
        isPayPalButtonRendered = false;
    }
}

// Function to render the PayPal button
function renderPayPalButton(total) {
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    
    // Check if the container exists before trying to render the PayPal button
    if (!paypalButtonContainer) {
        console.error('PayPal button container not found!');
        return;
    }

    paypalButtonContainer.innerHTML = ''; // Clear previous buttons if any

    // Render PayPal Button
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                cart = []; // Clear cart after successful payment
                localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                displayCart();
                updateCartBadge(); // Reset badge count to 0 after purchase
                closeCartDetails(); // Close the cart modal
            });
        },
        onError: function(err) {
            console.error('PayPal Checkout Error:', err);
            alert('There was an error processing your payment.');
        }
    }).render(paypalButtonContainer); // Render the PayPal button inside the container

    isPayPalButtonRendered = true; // Set the flag to true once the button is rendered
}

// Show Cart Details in a Modal
function showCartDetails() {
    displayCart(); // Update cart details when opening the modal
    const cartDetails = document.getElementById('cart-details');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartDetails && cartOverlay) {
        cartDetails.style.display = 'block';
        cartOverlay.style.display = 'block';
    }
}

// Close Cart Details
function closeCartDetails() {
    const cartDetails = document.getElementById('cart-details');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartDetails && cartOverlay) {
        cartDetails.style.display = 'none';
        cartOverlay.style.display = 'none';
    }
}

// Initialize the cart display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge(); // Set the initial cart count
    displayCart(); // Display the cart details if there are any items
});
