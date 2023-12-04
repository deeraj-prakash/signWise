import faker from 'faker';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Card, CardHeader, Typography, Stack } from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { mockImgProduct } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(5)].map((_, index) => {
  const setIndex = index + 12;
  return {
    name: faker.commerce.productName(),
    image: mockImgProduct(setIndex),
    price: faker.datatype.number({ min: 4, max: 49, precision: 0.1 }),
    priceSale: sample([0, faker.datatype.number({ min: 49, max: 99, precision: 0.1 })]),
    colors: (index === 1 && [faker.vehicle.color(), faker.vehicle.color()]) ||
      (index === 2 && [
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color()
      ]) || [faker.internet.color(), faker.internet.color(), faker.internet.color(), faker.internet.color()]
  };
});
const Product=[
  {id:0,
    name:'LEVIS',
    image:'https://media.designrush.com/inspiration_images/292255/conversions/levi_logo_4_82250bd000e1-mobile.jpg',
    price:'$ 16',
  },
  { id:1,
    name:'TITANS',
    image:'https://yt3.googleusercontent.com/ytc/APkrFKa4rHOmY5DlqAsH9kWfuCjGdhtVj-YJ_BMnnk087Q=s900-c-k-c0x00ffffff-no-rj',
    price:'$ 14',
  },
  { id:2,
    name:'RAYMOND',
    image:'https://i.pinimg.com/736x/43/0e/77/430e77e66be53229113c82e8350ac712.jpg',
    price:'$ 18',
  }, {
    id:3,
    name:'KELLOGs',
    image:'https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Kellogg_s_Logo_Design_History_Evolution_0_1024x1024.jpg?v=1692865122',
    price:'$ 23',
  }, {
    id:5,
    name:'STARBUCKS',
    image:'https://images.crowdspring.com/blog/wp-content/uploads/2022/09/07052909/62bc70073fd3864405fe0551_starbucks-logo-1992-2011.png',
    price:'$ 20',
  }


]
console.log(PRODUCTS,'%%%%%%%%%%%%%')
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 62,
  height: 62,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

function ProductItem({ product }) {
  const { name, image, price, id } = product;
  // const hasSale = priceSale > 0;
console.log({ name, image, price, id})
  return (
    <Stack direction="row" spacing={2}>
      <ThumbImgStyle alt={name} src={image} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Typography variant='subtitle2' sx={{ color: 'text.primary',  }}>
          {name}
        </Typography>

        <Stack direction="row">
          {/* {hasSale && (
            <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp; */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {price}
          </Typography>
        </Stack>
      </Box>

      {/* <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72, pr: 3 }} /> */}
    </Stack>
  );
}

export default function EcommerceLatestProducts() {
  return (
    <Card>
      <CardHeader title="Latest Orders" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {Product.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
