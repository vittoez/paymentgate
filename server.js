const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe('YOUR_SECRET_KEY'); // Replace with your Stripe secret key

app.use(bodyParser.json());

app.post('/pay', async (req, res) => {
    const { paymentMethodId } = req.body;

    try {
        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Replace with actual amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
