const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let orders = [];

app.post('/register', (req, res) => {
  const { name, phonenumber, password } = req.body;
  const user = { name, phonenumber, password };
  users.push(user);
  res.send('User registered successfully!');
});

app.post('/orders', (req, res) => {
  const { phonenumber, order } = req.body;
  const user = users.find((user) => user.phonenumber === phonenumber);
  if (!user) {
    res.status(404).send('User not found!');
  } else {
    orders.push({ phonenumber, order });
    res.send('Order added successfully!');
  }
});

app.get('/orders/:email', (req, res) => {
  const { phonenumber } = req.params;
  const userOrders = orders.filter((order) => order.phonenumber === phonenumber);
  if (userOrders.length === 0) {
    res.status(404).send('No orders found for this user!');
  } else {
    res.send(userOrders);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});