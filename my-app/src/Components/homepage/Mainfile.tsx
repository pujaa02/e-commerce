// npx create-react-app ecommerce-site
// cd ecommerce-site

// npm install redux react-redux
// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material

// src/
//   actions/
//     cartActions.js
//   components/
//     Cart.js
//     Header.js
//     Product.js
//     ProductList.js
//   reducers/
//     cartReducer.js
//     rootReducer.js
//   store/
//     store.js
//   App.js
//   index.js


import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer
});

export default rootReducer;

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;

export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  payload: id
});


import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-commerce Site
        </Typography>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;


import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ margin: '10px' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4">Your Cart</Typography>
      <List>
        {cartItems.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeFromCart(item.id))}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</Typography>
    </div>
  );
};

export default Cart;

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { Container } from '@mui/material';

const products = [
  { id: 1, name: 'Product 1', price: 10.0, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 20.0, image: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Container>
        <ProductList products={products} />
        <Cart />
      </Container>
    </Provider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




