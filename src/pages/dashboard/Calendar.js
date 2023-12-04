import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Container, DialogTitle, useMediaQuery } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../components/_dashboard/calendar';
import Modal from 'src/components/_dashboard/blog/ProjectModel';
import CalenderPopOver from './CalenderPopOver';
// ----------------------------------------------------------------------


//
const sample=[
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-11-13",
    "id": "45cdbcc9-0d1e-4ff6-btrertd6232655f",
    "start": "2023-10-12",
    "textColor": "#1ccaff",
    "title": "Baskin Robins ",
    "installationDate": "2023-10-10",
    "status":'Success'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-12-13",
    "id": "45cdbcc9-0d1e-5456456-bee8-a5dd6232655f",
    "start": "2023-11-12",
    "textColor": "#1ccaff",
    "title": "Mc Donald",
    "installationDate": "2023-11-04",
    "status":'Success'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-11-1",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5kjlkjl5f",
    "start": "2023-10-12",
    "textColor": "#1ccaff",
    "title": "Jockey",
    "installationDate": "2023-10-04",
    "status":'In-Progress'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-10-13",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5dfg344f",
    "start": "2023-10-12",
    "textColor": "#1ccaff",
    "title": "American Tourister",
    "installationDate": "2023-10-09",
    "status":'Success'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-10-13",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5ggf35f",
    "start": "2023-10-12",
    "textColor": "#1ccaff",
    "title": "KFC",
    "installationDate": "2023-10-08",
    "status":'Success'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-10-13",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5dd6233312f",
    "start": "2023-10-12",
    "textColor": "#1ccaff",
    "title": "Louise Phillipe",
    "installationDate": "2023-10-07",
    "status":'Success'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-10-29",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5dd6245655f",
    "start": "2023-10-16",
    "textColor": "#1ccaff",
    "title": "Parker",
    "installationDate": "2023-10-16",
    "status":'In-Progress'
  },
  {
    "allDay": true,
    "description": "Voluptate sed sapiente sit ratione. Dolorum culpa quibusdam aut et ducimus rem excepturi molestias non. Quae doloremque velit quo ducimus odio debitis. Nulla aut est id. Asperiores atque beatae sint eos recusandae.",
    "end": "2023-12-13",
    "id": "45cdbcc9-0d1e-4ff6-bee8-a5dd623235f",
    "start": "2023-10-22",
    "textColor": "#1ccaff",
    "title": "Nike",
    "installationDate": "2023-10-22",
    "status":'Up-Coming'
  },
]
const selectedEventSelector = (state) => {
  console.log(state,'OOOOOOOOOOOOOOOOOOOO')
  const { events, selectedEventId } = sample;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};
export default function Calendar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? 'listWeek' : 'dayGridMonth');
  const selectedEvent = useSelector(selectedEventSelector);
  const { events, isOpenModal, selectedRange } = useSelector((state) => state.calendar);
  const [open ,setOpen] = useState(false)
  const [projectSelect,setProjectSelect]=useState([])
  console.log(isOpenModal,'@@@@@@@@@@@@@@')
  console.log(selectedRange,'!!!!!!!!!!!!!!!!!!!!!!')
  
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    console.log(arg,'186  IIIIIIIII')
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };
   const HandleopenModal=(id)=>{
    setOpen(true)
    let val = sample.filter((v)=>{
      return v.id=== id
    })
    setProjectSelect(...val)
    console.log(val,'#$$$$$$$$$$$$$$$$$$')
   }
  const handleSelectEvent = (arg) => {
    console.log(arg.event.id)
    HandleopenModal(arg.event.id)
    // dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }) => {
    console.log(event,'XXXXXXXXXXXXXXXXXXXXXXX')
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDropEvent = async ({ event }) => {
    console.log({event},'LLLLLLLLLLLLLLLLL')
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', {
        variant: 'success'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    
  };
console.log('selectedevent',selectEvent)
console.log('selectedRange',selectedRange)
  return (
    <Page title="Calendar | SignWise Solutions">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Calendar' }]}
          // moreLink="https://fullcalendar.io/docs/react"
          // action={
          //   <Button
          //     variant="contained"
          //     startIcon={<Icon icon={plusFill} width={20} height={20} />}
          //     onClick={handleAddEvent}
          //   >
          //     New Event
          //   </Button>
          // }
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              
              weekends
              editable
              droppable
              selectable
              events={sample}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="list-item"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isMobile ? 'auto' : 720}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </CalendarStyle>
        </Card>
         
         <CalenderPopOver title={selectedEvent ? 'Project Details' : 'Project Details'} setOpen={setOpen} project={projectSelect} open={open}
          handleClose={()=>{setOpen(!open)}} />
        {/* <Modal modalTitle={selectedEvent ? 'Project Details' : 'Project Details'} open={open} handleClose={!open} */}
        {/* //  open={isOpenModal}
          // onClose={handleCloseModal}
          // > */}
          {/* <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle> */}

          {/* <CalendarForm project={projectSelect} event={selectedEvent} range={selectedRange} onCancel={handleCloseModal} />
        </Modal> */}
      </Container>
    </Page>
  );
}
