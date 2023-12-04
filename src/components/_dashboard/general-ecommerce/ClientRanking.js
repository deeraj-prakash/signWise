import faker from 'faker';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography, Stack } from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { mockImgProduct } from '../../../utils/mockImages';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs.js';
import Page from 'src/components/Page.js';
//
import Scrollbar from '../../Scrollbar';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(4)].map((_, index) => {
  const setIndex = index + 12;
  return {
    name: faker.commerce.productName(),
    image: mockImgProduct(setIndex),
  };
});
const Product=[
  {id:0,
    name:'Super',
    image:'https://signwisesolutions.com/uploads/ranks/super.png',
  },
  { id:1,
    name:'Great',
    image:'https://signwisesolutions.com/uploads/ranks/great.png',  
  },
  { id:2,
    name:'Regular',
    image:'https://signwisesolutions.com/uploads/ranks/regular.png',  
  }, {
    id:3,
    name:'Blacklisted',
    image:'https://signwisesolutions.com/uploads/ranks/blacklisted.png',   
  },

]

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 62,
  height: 62,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

ClientRanking.propTypes = {
  product: PropTypes.object.isRequired
};

function ClientRanking({ product }) {
  const { name, image, id } = product;
console.log({ name, image, id})
  return (
    <Stack direction="row" spacing={2}>
      <ThumbImgStyle alt={name} src={image} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Typography variant='subtitle2' sx={{ color: 'text.primary',  }}>
          {name}
        </Typography>
      </Box>

      {/* <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72, pr: 3 }} /> */}
    </Stack>
  );
}

export default function ClientRankingFunction() {
  return (
    <Page title="Client Ranking | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Client Ranking"        
        />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {Product.map((product) => (
            <ClientRanking key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
      </Container>
    </Page>
  );
}
