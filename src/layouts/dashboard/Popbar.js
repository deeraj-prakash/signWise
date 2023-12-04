import React, { useState } from 'react';
import { Button, Checkbox, Popover, Grid, Autocomplete, TextField } from '@material-ui/core';

const Service = [
  { title: 'Medical' },
  { title: 'Testing Lab' },
  { title: 'Distribution' },
  // Add more services as needed
];

const Location = [
  { title: 'Alabama' },
  { title: 'Alaska' },
  { title: 'Arizona' },
  // Add more services as needed
];

const Group = [
  { title: 'Sales' },
  { title: 'Design' },
  { title: 'Production' },
  // Add more services as needed
];

const Rank = [
  { title: 'Super' },
  { title: 'Great' },
  { title: 'Regular' },
  // Add more services as needed
];

const Availabilities = [
  { title: 'Onboarding Completed' },
  { title: 'Onboarding Not Completed' },
  // Add more services as needed
];

const MyComponent = () => {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElLocations, setAnchorElLocations] = useState(null);
  const [anchorElGroups, setAnchorElGroups] = useState(null);
  const [anchorElRanks, setAnchorElRanks] = useState(null);
  const [anchorElAvailabilities, setAnchorElAvailabilities] = useState(null);

  const handleClickServices = (event) => {
    setAnchorElServices(event.currentTarget);
  };

  const handleClickLocations = (event) => {
    setAnchorElLocations(event.currentTarget);
  };

  const handleClickGroups = (event) => {
    setAnchorElGroups(event.currentTarget);
  };

  const handleClickRanks = (event) => {
    setAnchorElRanks(event.currentTarget);
  };

  const handleClickAvailabilities = (event) => {
    setAnchorElAvailabilities(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElServices(null);
    setAnchorElLocations(null);
    setAnchorElGroups(null);
    setAnchorElRanks(null);
    setAnchorElAvailabilities(null);
  };

  const openServices = Boolean(anchorElServices);
  const openLocations = Boolean(anchorElLocations);
  const openGroups = Boolean(anchorElGroups);
  const openRanks = Boolean(anchorElRanks);
  const openAvailabilities = Boolean(anchorElAvailabilities);

  return (
    <div>
      <Button variant="contained" onClick={handleClickServices} sx={{ backgroundColor: "#161c24", border: "none", boxShadow: "none" }}>
        Services
      </Button>
      <Popover
        id="popover-services"
        open={openServices}
        anchorEl={anchorElServices}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              options={Service}
              disableCloseOnSelect
              value={services}
              onChange={(event, newValue) => {
                setServices(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} // Adjust the width of the checkbox here
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Services" placeholder="Services" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>

      {/* Locations Button and Popover */}
      <Button variant="contained" onClick={handleClickLocations} sx={{ backgroundColor: "#161c24", border: "none", boxShadow: "none" }}>
        Locations
      </Button>
      {/* Include a similar structure for other buttons and popovers */}
      <Popover
        id="popover-locations"
        open={openLocations}
        anchorEl={anchorElLocations}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Add the Autocomplete component for Locations */}
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              options={Location}
              disableCloseOnSelect
              value={locations}
              onChange={(event, newValue) => {
                setLocations(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} // Adjust the width of the checkbox here
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Location" placeholder="Location" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>

      {/* Groups Button and Popover */}
      <Button variant="contained" onClick={handleClickGroups} sx={{ backgroundColor: "#161c24", border: "none", boxShadow: "none" }}>
        Groups
      </Button>
      <Popover
        id="popover-Groups"
        open={openGroups}
        anchorEl={anchorElGroups}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Add the Autocomplete component for Locations */}
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              options={Group}
              disableCloseOnSelect
              value={groups}
              onChange={(event, newValue) => {
                setGroups(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} // Adjust the width of the checkbox here
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Group" placeholder="Group" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>
      {/* Add a similar structure for the Groups button and popover */}
      
      
      {/* Ranks Button and Popover */}
      <Button variant="contained" onClick={handleClickRanks} sx={{ backgroundColor: "#161c24", border: "none", boxShadow: "none" }}>
        Ranks
      </Button>
      <Popover
        id="popover-rank"
        open={openRanks}
        anchorEl={anchorElRanks}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Add the Autocomplete component for Locations */}
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              options={Rank}
              disableCloseOnSelect
              value={ranks}
              onChange={(event, newValue) => {
                setRanks(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} // Adjust the width of the checkbox here
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Rank" placeholder="Rank" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>
      {/* Add a similar structure for the Ranks button and popover */}
      
      {/* Availabilities Button and Popover */}
      <Button variant="contained" onClick={handleClickAvailabilities} sx={{ backgroundColor: "#161c24", border: "none", boxShadow: "none" }}>
        Availabilities
      </Button>

      <Popover
        id="popover-availabilities"
        open={openAvailabilities}
        anchorEl={anchorElAvailabilities}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* Add the Autocomplete component for Locations */}
        <Grid container sx={{ minWidth: '200px' }} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              options={Availabilities}
              disableCloseOnSelect
              value={availabilities}
              onChange={(event, newValue) => {
                setLocations(newValue);
              }}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    sx={{ width: '24px', height: '24px' }} // Adjust the width of the checkbox here
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Availability" placeholder="Availability" />
              )}
            />
          </Grid>
        </Grid>
      </Popover>
      {/* Add a similar structure for the Availabilities button and popover */}
    </div>
  );
};

export default MyComponent;
