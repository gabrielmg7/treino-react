import React, { useState } from 'react';
import { IconButton, Badge, Drawer, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ICarrinho } from '../../../../Types/restAPI/ICarrinho';
import { useThemeContext } from '../../../../Themes/ThemeProviderWrapper';

const Cart: React.FC<ICarrinho> = ({ quantidade }) => {
  const { theme } = useThemeContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>(['']);


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const incrementCartItem = (index: number) => {
    console.log("Quantidade: " + cartItems)
    const newItems = [...cartItems];
    newItems[index] = `Item ${index + 1}`;
    setCartItems(newItems);
  };

  const decrementCartItem = (index: number) => {
    console.log("Quantidade: " + cartItems)
    if (cartItems.length > 1) {
      const newItems = cartItems.filter((_, i) => i !== index);
      setCartItems(newItems);
    }
  };

  return (
    <div>

      <IconButton style={{ color: theme.palette.text.primary }} onClick={toggleCart}>
        <Badge badgeContent={quantidade} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <div style={{ width: 300 }}>
          <CardContent>
            {cartItems.map((item, index) => (
              <Card key={index} style={{ marginBottom: 10 }}>
                <CardContent>
                  <Grid container direction={"column"}>
                    <Typography variant="body1">{item}</Typography>
                    <Typography variant="body1">Quantidade: {quantidade}</Typography>
                  </Grid>
                  <Grid container>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<RemoveIcon />}
                      onClick={() => decrementCartItem(index)}
                    >
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => incrementCartItem(index)}
                    >
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;