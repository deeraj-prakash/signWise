import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import {
    Box,
    Grid,
    Card,
    Stack,
    Divider,
    TextField,
    FormControlLabel,
    Typography,
    FormHelperText,
    Button,
    IconButton,
    Avatar
} from '@material-ui/core';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import Modal from '../blog/ProjectModel';
import AddTask from './AddTask';
import SvgIconStyle from 'src/components/SvgIconStyle';
// hooks
// import useAuth from '../../../../hooks/useAuth';
// import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// import { UploadAvatar } from '../../../upload';
// utils
// import { fData } from '../../../../utils/formatNumber';
//
// import countries from '../countries';

// ----------------------------------------------------------------------
const CardMediaStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 'calc(100% * 9 / 16)',
    '&:before': {
        top: 0,
        zIndex: 9,
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        //  backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
        borderTopLeftRadius: theme.shape.borderRadiusMd,
        borderTopRightRadius: theme.shape.borderRadiusMd,
        // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    }
}));
const CoverImgStyle = styled('img')({
    top: 0,
    zIndex: 8,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    // background: `url(${src}) center/cover no-repeat`
});
export default function ProjectTask() {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme()
    const [add, setAdd] = useState(false)
    const Data = [
        {
            id: 0,
            img: 'https://5.imimg.com/data5/RE/HG/MY-9519912/acrylic-sign-board-500x500.jpg',
            title: 'Installation of site maps',
        }, {
            id: 1,
            img: 'https://5.imimg.com/data5/RE/HG/MY-9519912/acrylic-sign-board-500x500.jpg',
            title: 'Site Maps'
        }]


    return (
        <>
            {!add ? (
                <Grid container spacing={3}>

                    <Grid item xs={12} md={4}>
                        <Button onClick={() => { setAdd(!add) }} sx={{ margin: 1, borderRadius: 20 }} variant='contained'>Add Task</Button>
                        <Grid sx={{ display: 'flex', flexDirection: 'row' }} spacing={3} item xs={12} lg={8} sm={6} md={4}>
                            <Grid  item xs={12} md={4}> 
                            {Data?.map((dat) => (
                                    <Card sx={{width:200,}} >
                                        <CardMediaStyle>
                                            <IconButton
                                                sx={{
                                                    top: 8,
                                                    right: 8,
                                                    position: 'absolute'
                                                }}
                                            >
                                                <Icon icon={moreVerticalFill} width={20} height={20} />
                                            </IconButton>
                                            <SvgIconStyle
                                                color="paper"
                                                src="/static/icons/shape-avatar.svg"
                                                sx={{
                                                    width: 144,
                                                    height: 62,
                                                    zIndex: 10,
                                                    bottom: -26,
                                                    position: 'absolute'
                                                }}
                                            />
                                            <Avatar
                                                alt={'project '}
                                                src={dat.img}
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    zIndex: 11,
                                                    position: 'absolute',
                                                    transform: 'translateY(-50%)'
                                                }}
                                            />
                                            <CoverImgStyle alt="cover" src={dat.img} />
                                        </CardMediaStyle>

                                        <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
                                            fgfdgdfg
                                        </Typography>
                                        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
                                            Date:fdgfdgd
                                        </Typography>



                                        <Divider />

                                        <Grid container sx={{ py: 3, textAlign: 'center', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', px: 2, }}>

                                            <Typography>{` Tasks:tasks`}</Typography>
                                        </Grid>

                                    </Card>
                            ))}
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            ) : (
                <AddTask add={add} setAdd={setAdd} />
            )}
        </>
    );
}
