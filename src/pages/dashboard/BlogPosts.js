import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Stack,Autocomplete,TextField,Checkbox,List,ListItem, Card, ListItemText, Popover } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPostsInitial, getMorePosts } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import { UserCard } from 'src/components/_dashboard/user/cards';
import AddProject from 'src/components/_dashboard/blog/AddProject';

// ----------------------------------------------------------------------
const TYPE = [
  { id: 0, value: 'COMPLETED', checked: false },
  { id: 1, value: 'PAST DUE', checked: false },
  { id: 2, value: 'ACTIVE', checked: false },
  { id: 3, value: 'INACTIVE', checked: false },
  { id: 4, value: 'EMERGENCY', checked: false },
];
const CATEGORY=[
  {id:0,value:'CATEGORY',checked: false},
  {id:1,value:'SPLIT IN',checked: false},
  {id:2,value:'SPLIT OUT',checked: false},
  {id:3,value:'INSTALL',checked: false},
  {id:4,value:'TRAFFIC SOLUTIONS',checked: false},
  // {id:5,value:'PRODUCTIONS',checked: false},
  // {id:6,value:'N/C SALES',checked: false},
  // {id:7,value:'N/C DESIGN',checked: false},
]
const projectData = [
  { id:0,
    projectName: 'Pizza Hut',
    dueDate: '2023-11-30',
    status: 'In Active',
    numberOfMembers: 5,
    tasks: 12,
    logo:'https://us.123rf.com/450wm/jetcityimage/jetcityimage1903/jetcityimage190300077/125083959-indianapolis-circa-march-2019-pizza-hut-fast-casual-restaurant-pizza-hut-is-a-subsidiary-of-yum.jpg?ver=6',
    img: 'https://www.shutterstock.com/image-photo/indianapolis-circa-february-2017-pizza-260nw-572078815.jpg',
  },
  { id:1,
    projectName: 'Nike',
    dueDate: '2023-12-15',
    status: 'Active',
    numberOfMembers: 8,
    tasks: 20,
    logo:'https://us.123rf.com/450wm/dipressionist/dipressionist2205/dipressionist220500091/189169566-2021-logotype-nike-sportswear-co-at-boutique.jpg?ver=6',
    img: 'https://thumbs.dreamstime.com/b/nike-logo-nike-neon-store-sign-shop-window-minsk-belarus-february-nike-logo-nike-neon-store-sign-shop-window-245037554.jpg',
  },
  { id:2,
    projectName: 'American Tourister',
    dueDate: '2023-11-20',
    status: 'Active',
    numberOfMembers: 4,
    tasks: 10,
    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMyKNxbpPLbARqdUwl38kf1_QgXg19NwO7qA&usqp=CAU',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_oxY095TxLfq8vs_O5Ywo0PRVBLNgprALbZlNy7BaNbFYGUk4hux39iqYMF8kHwTy-c&usqp=CAU',
  },
  { id:3,
    projectName: 'Jockey',
    dueDate: '2023-12-10',
    status: 'In Active',
    numberOfMembers: 6,
    tasks: 15,
    logo:'https://images.jdmagicbox.com/quickquotes/images_main/acrylic-sign-board-2019031267-cpr4wqti.jpg',
    img: 'https://5.imimg.com/data5/SELLER/Default/2022/12/VN/AQ/ZR/43195452/acrylic-company-led-logo-500x500.jpg',
  },
  { id:4,
    projectName: 'Baskin Robins',
    dueDate: '2023-11-25',
    status: 'In Active',
    numberOfMembers: 7,
    tasks: 18,
    logo:'https://www.usatoday.com/gcdn/-mm-/b47f194f3e7d8fc4c0174176cb3b826ddcdca22d/c=0-62-1000-624/local/-/media/2020/04/30/USATODAY/usatsports/MotleyFool-TMOT-6d945cda-baskin-robbins.jpg?width=1200&disable=upscale&format=pjpg&auto=webp',
    img: 'https://www.logo-designer.co/storage/2022/04/2022-ice-cream-chain-baskin-robbins-new-logo-design-3.png',
  },
  { id:5,
    projectName: 'Mc Donald s',
    dueDate: '2023-12-05',
    status: 'Active',
    numberOfMembers: 3,
    tasks: 8,
    logo:'https://image.cnbcfm.com/api/v1/image/107007653-16433170092022-01-27t205009z_350782834_rc2v7s9l3xsv_rtrmadp_0_mcdonalds-results.jpeg?v=1643317121&w=1920&h=1080',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrH-Cb_5rEpuiX7WhIpeAc7TY6DPsbNJdEAmjrA0c&s',
  },
  { id:6,
    projectName: 'KFC',
    dueDate: '2023-11-28',
    status: 'In Active',
    numberOfMembers: 9,
    tasks: 22,
    logo:'https://c8.alamy.com/comp/EK3WTA/kfc-sign-logo-EK3WTA.jpg',
    img:'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png',
  },
  { id:7,
    projectName: 'Royal Diamond',
    dueDate: '2023-12-08',
    status: 'Active',
    numberOfMembers: 5,
    tasks: 14,
    logo:'https://i.pinimg.com/originals/28/5e/22/285e2220bc90c2696cbba06be058df1f.jpg',
    img: 'https://img.freepik.com/premium-vector/royal-diamond-logo-gold-luxury-diamond-logo-design-template_664675-565.jpg',
  },
  { id:8,
    projectName: 'Parker',
    dueDate: '2023-11-23',
    status: 'Active',
    numberOfMembers: 6,
    tasks: 16,
    logo:'https://metrodetroitsigns.com/wp-content/uploads/2019/07/parker-box-signs2-e1572756850453.jpg',
    img:'https://logos-world.net/wp-content/uploads/2022/11/Parker-Logo-2016-present.png',
  },
  { id:9,
    projectName: 'Louise Phillipe',
    dueDate: '2023-12-12',
    status: 'Active',
    numberOfMembers: 7,
    tasks: 19,
    logo:'https://www.imagesbof.in/wp-content/uploads/2023/06/Louis-Philippe.jpg',
    img: 'https://5.imimg.com/data5/SELLER/Default/2023/4/299429836/DG/YI/HP/7051666/dental-clinic-acrylic-led-sign-board-500x500.JPG',
  },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Profile Completeness' },
  // { value: 'popular', label: 'Project Category' },
  // { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
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
export default function BlogPosts() {
  const dispatch = useDispatch();
  const [types,setTypes]  = useState(TYPE)
  const [categories,setCategories]  = useState(CATEGORY)
  const [filters, setFilters] = useState('latest');
  const [add,setAdd] = useState(false)
  const [openType,setOpenType] = useState(false)
  const [openCategory,setOpencategory] = useState(false)
  // const [add,setAdd] = useState(false)
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
    <Page title="Blog: Posts | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="All Projects"
          links={[
            { name: 'Project Type', href: PATH_DASHBOARD.root },
            { name: 'Project Category', href: PATH_DASHBOARD.blog.root },
            { name: 'Posts' }
          ]}
          action={
            <Button
              variant="contained"
              onClick={()=>{setAdd(true)}}
              // component={RouterLink}
              // to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Icon icon={plusFill} />}
            >
             Add Projects
            </Button>
          }
        />
        {!add ?
        (<>
        <Stack mb={5}  direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <Stack>
          <Button  onClick={()=>setOpenType(!openType)}>
        Project Type
      </Button>
      {openType && (
        <Popover 
        id="popover-services"
        open={Boolean(openType)}
        anchorEl={openType}
        onClose={()=>setOpenType(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        >
        
          <List>
          <Grid container>
            {types.map((type) => (
             
             <Grid item xs={12} sm={6} md={4} lg={3} key={type.id}>
              <ListItem key={type.id} >
                <Checkbox
                 checked={type.checked}
                 onChange={() => {
                  const updatedType = [...types];
                  const item = updatedType.find((item) => item.id === type.id);
                  if (item) {
                    item.checked = !item.checked;
                  }
                  setTypes(updatedType);
                }}
                />
                <ListItemText primary={type.value} />
              </ListItem>
             
            </Grid>
            ))}
            </Grid>
          </List>
       
        </Popover>
      )}
          </Stack>
          {/* Project Category */}
          <Stack>
          <Button  onClick={()=>setOpencategory(!openCategory)}>
        Project Category
      </Button>
      {openCategory && (
        <Popover 
        id="popover-services"
        open={Boolean(openCategory)}
        anchorEl={openCategory}
        onClose={()=>setOpencategory(false)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        >
        
          <List>
          <Grid container>
            {categories.map((type) => (
               <Grid  item xs={12} sm={6} md={4} lg={3} key={type.id}>
              <ListItem key={type.id}>
                <Checkbox
                 checked={type.checked}
                 onChange={() => {
                  const updatedType = [...categories];
                  const item = updatedType.find((item) => item.id === type.id);
                  if (item) {
                    item.checked = !item.checked;
                  }
                  setCategories(updatedType);
                }}
                />
                <ListItemText primary={type.value} />
              </ListItem>
              </Grid>
            ))}
            </Grid>
          </List>
       
        </Popover>
      )}
          </Stack>
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
          
        </Stack>
        
        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: 'inherit' }}
        >
          <Grid container spacing={3}>
            {projectData.map((post, index) => (
              // <BlogPostCard key={post.id} post={post} index={index} />
              <Grid key={index} item xs={12} sm={6} md={4}>
              <UserCard user={post} />
            </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
        </>
        ):(
          <AddProject add={add} setAdd={setAdd}/>
        )}
      </Container>
    </Page>
  );
}
