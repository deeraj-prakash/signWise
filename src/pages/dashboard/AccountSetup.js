// import PropTypes from 'prop-types';
// material
import {
  Stack,
  Paper,
  Typography,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Icon } from '@iconify/react'
import personFill from '@iconify/icons-eva/person-fill';
import phoneCallFill from '@iconify/icons-eva/phone-call-fill';
import bankIcon from '@iconify/icons-fa/bank';
import { experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

// AccountSetup.propTypes = {
//   post: PropTypes.object
// };
const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5), flexGrow: 1, backgroundColor: 'background.neutral', cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  }, 
}));

export default function AccountSetup() {
  const navigate = useNavigate();
  const steps = [
    { id: 1,
      name: 'Team member(s)',
      icon: personFill,
      redirect: PATH_DASHBOARD.callCenter.teams,
      message: 'Add people who would receive and make calls or manage and monitor the system'
    },
    { id: 2,
      name: 'Department(s)',
      icon: bankIcon,
      redirect: PATH_DASHBOARD.callCenter.departments,
      message: 'Group users to departments and define call distribution patterns for call flow'
    },
    { id: 3,
      name: 'Call flow',
      icon: phoneCallFill,
      redirect: PATH_DASHBOARD.callCenter.callFlows,
      message: 'Design call flows to distribute calls to different departments according to business timings'
    },
  ]

  return (
    <Page title="Account setup | SignWise Solutions">
      <Container>
        <HeaderBreadcrumbs
          heading="Account setup steps"
          // links={[
          //   { name: 'Dashboard', href: PATH_DASHBOARD.root },
          //   { name: 'User', href: PATH_DASHBOARD.user.root },
          //   { name: user.displayName }
          // ]}
        />
          <Stack spacing={1.5}>
            {steps.map((item) => (
                <PaperStyle>
                  <Stack key={item.id} direction="row" spacing={2} alignItems={'center'}> 
                    <Icon icon={item.icon} width={30} height={30} />
                      <Stack
                        onClick={()=>navigate(item.redirect)}
                        sx={{ mb: 0.5,  }}
                      >
                        <Typography sx={{userSelect:'none'}} variant="subtitle2">{item.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', userSelect: 'none' }}>
                        {item.message}
                      </Typography>
                      </Stack>
                  </Stack>
                </PaperStyle>
            ))}
          </Stack>
          </Container>
    </Page>
  );
}
