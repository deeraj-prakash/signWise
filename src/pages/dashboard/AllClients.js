import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import CardAllClients  from 'src/components/_dashboard/user/cards/CardAllClients';
import AllClientsSearch  from 'src/components/_dashboard/blog/AllClientsSearch.js';
import AddProject from 'src/components/_dashboard/blog/AddProject';
// ----------------------------------------------------------------------

const projectData = [
  { id:0,
    projectName: 'Jaydon Frankie',
    dueDate: 'California',
    status: 'Home Builders',
    numberOfMembers: 5,
    // tasks: 12,
    logo:'/static/mock-images/avatars/mockbg.png',
    img: '/static/mock-images/avatars/avatar_default1.jpg',
    medal: '/static/icons/great.png'
  },
  { id:1,
    projectName: 'Paceline Investors',
    dueDate: 'Manteca',
    status: 'MultiFamily',
    numberOfMembers: 8,
    // tasks: 20,
    logo:'/static/mock-images/avatars/mockbg.png',
    img: '/static/mock-images/avatars/avatar_1.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/super.png'
    
  },
  { id:2,
    projectName: 'Rubik Built',
    dueDate: 'San Francisco',
    status: 'General Contractor',
    numberOfMembers: 4,
    // tasks: 10,
    logo:'/static/mock-images/avatars/mockbg.png',
    img:'/static/mock-images/avatars/avatar_2.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/regular.png'

  },
  { id:3,
    projectName: 'CSI Construction',
    dueDate: 'Sedona',
    status: 'Single Family',
    numberOfMembers: 6,
    // tasks: 15,
    logo:'/static/mock-images/avatars/mockbg.png',
    img: '/static/mock-images/avatars/avatar_3.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/regular.png'
  },
  { id:4,
    projectName: 'AG Spanos',
    dueDate: 'California',
    status: 'Client',
    numberOfMembers: 7,
    // tasks: 18,
    logo:'/static/mock-images/avatars/mockbg.png',
    img: '/static/mock-images/avatars/avatar_4.jpg',
    medal: '/static/icons/great.png'
  },
  { id:5,
    projectName: 'AMC',
    dueDate: 'Miami',
    status: 'Sub Contractor',
    numberOfMembers: 3,
    // tasks: 8,
    logo:'/static/mock-images/avatars/mockbg.png',
    img:'/static/mock-images/avatars/avatar_9.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/super.png'
  },
  { id:6,
    projectName: 'Tim Lewis',
    dueDate: 'West Palm Beach',
    status: 'Home Builder',
    numberOfMembers: 9,
    // tasks: 22,
    logo:'/static/mock-images/avatars/mockbg.png',
    img:'/static/mock-images/avatars/avatar_6.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/regular.png'
  },
  { id:7,
    projectName: 'Lennar',
    dueDate: 'Manteca',
    status: 'MultiFamily',
    numberOfMembers: 5,
    // tasks: 14,
    logo:'/static/mock-images/avatars/mockbg.png',
    img: '/static/mock-images/avatars/avatar_7.jpg',
    medal: 'https://signwisesolutions.com/uploads/ranks/super.png'
  },
  { id:8,
    projectName: 'Skyniche',
    dueDate: 'San Francisco',
    status: 'General Contractor',
    numberOfMembers: 6,
    // tasks: 16,
    logo:'/static/mock-images/avatars/mockbg.png',
    img:'/static/mock-images/avatars/avatar_8.jpg',
    medal: '/static/icons/great.png'
  },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Profile Completeness' },
  { value: 'popular', label: 'Project Category' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
//   if (sortBy === 'popular') {
//     return orderBy(posts, ['view'], ['desc']);
//   }
  return posts;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);
//  
export default function AllClients({isAdmin}) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('latest');
  const [add,setAdd] = useState(false)
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);
  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <Page title="All Clients | SignWise Solutions">
      <Container sx={{marginTop: "15px"}}>
        <HeaderBreadcrumbs/>
        <Stack mb={4} direction="row" alignItems="center" justifyContent="flex-end" marginTop={'-50px'}>
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>
        <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between" marginTop={'-20px'}>
          <BlogPostsSearch tit={isAdmin ? 'All Team Members' : 'All Clients'} />
        </Stack>    

        <InfiniteScroll
          next={onScroll}
        //   hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          sx={{ overflow: 'inherit' }}
        >
          <Grid sx={{p:2}} container spacing={3}>
            {projectData.map((post, index) => (
              // <BlogPostCard key={post.id} post={post} index={index} />
              <Grid key={index} item xs={12} sm={6} md={4}>
              <CardAllClients user={post} />
            </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </Page>
  );
}
