import { useEffect, useState } from 'react'
import type { Product } from "../models/product";
import Catalog from '../../features/catalog/Catalog';
import { Box, Button, Container, Typography } from '@mui/material';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('http://localhost:5005/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addProduct = () => {
    // Array of available images in public/images
    const images = [
      '/images/hero1.jpg',
      '/images/hero2.jpg',
      '/images/hero3.jpg',
      '/images/hero4.png'
    ];
    setProducts(prevState => [
      ...prevState,
      { 
        id: prevState.length + 1,
        name: 'product' + (prevState.length + 1), 
        price: (prevState.length * 100) + 100,
        quantityInStock: 100,
        description: 'test',
        // Cycle through images array
        pictureUrl: images[prevState.length % images.length],
        type: 'test',
        brand: 'test'
      }
    ]);
  };

  return (
    <>
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, marginY: 3 }}>
          <Typography variant='h4'>Re-store</Typography>
          <Button variant='contained' onClick={addProduct}>Add product</Button>
        </Box>
        <Catalog products={products} />
      </Container>
    </>
  )
}
export default App
