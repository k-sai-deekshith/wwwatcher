import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Badge } from '@mui/material';

interface ProductCardProps {
  title: string;
  brand: string;
  price: string;
  imageURL: string;
  discount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, brand, price, imageURL, discount }) => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          image={imageURL}
          alt={title}
          sx={{ objectFit: 'contain', padding: 2 }}
        />
        {discount > 0 && (
          <Box sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#ae7657', color: '#fff', padding: '2px 8px', borderRadius: 2 }}>
            -{discount}%
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography variant="h6" component="div">
          {brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
