// Load Stripe
const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe public key

// Elements for card details
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const resultContainer = document.getElementById('payment-result');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            name: document.getElementById('name').value,
        },
    });

    if (error) {
        resultContainer.textContent = error.message;
        resultContainer.classList.remove('hidden');
    } else {
        // Send the paymentMethod.id to the server for payment processing
        const response = await fetch('/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const paymentResult = await response.json();
        if (paymentResult.success) {
            resultContainer.textContent = 'Payment successful!';
            resultContainer.classList.remove('hidden');
        } else {
            resultContainer.textContent = 'Payment failed. Try again.';
            resultContainer.classList.remove('hidden');
        }
    }
});
