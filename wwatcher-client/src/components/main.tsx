import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Header from './header';
import SearchResults from './searchresults';
import ProductCard from './productCard';

interface Product {
  _id: string;
  title: string;
  brand: string;
  price: string;
  imageURL: string;
  discount: number;
}

const fetchFilteredWatches = async (filterObject: any): Promise<Product[]> => {
  const response = await fetch('http://3.141.3.156:3000/watches/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filterObject),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const ProductList: React.FC<{ search: string, filterObject: any }> = ({ search, filterObject }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price-low-high');

//   useEffect(() => {
//     setSearchText(search);
//   }, [search]);

  const { data: products, isLoading, error, refetch } = useQuery<Product[], Error>({
    queryKey: ['filteredWatches', filterObject],
    queryFn: () => fetchFilteredWatches(filterObject),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [search, filterObject, refetch]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading products: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 2, marginTop: "120px" }}>
      <SearchResults searchText={search} />
      <Header itemCount={products?.length || 0} sortBy={sortBy} onSortChange={setSortBy} />
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard
              title={product.title}
              brand={product.brand}
              price={product.price}
              imageURL={product.imageURL}
              discount={product.discount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
