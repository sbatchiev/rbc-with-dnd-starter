import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import events from './events'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import FaceIcon from '@material-ui/icons/Face';

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class App extends Component {

  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
      }
    ]
  };

  // constructor(...args) {
  //   super(...args)

  //   this.state = { events }
  // }

  handleSelect = ({ start, end, slots }) => {
    const title = window.prompt('New Event name')
    console.log(slots);
    console.log(moment(start, "DD-MM-YYYY"));
    console.log(moment(start, "DD-MM-YYYY").add(1, 'days'));
    if (title) {
      let slotEvents = slots.map(slot => {
        return {
          start: slot,
          end: slot,
          title
        }
      })
      this.setState({
        events: [
          ...this.state.events,
          ...slotEvents
          // {
          //   start,
          //   end,
          //   title,
          // },
          
        ],
      })
    }
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
      <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.MONTH}
          // scrollToTime={new Date(1970, 1, 1, 6)}
          // defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

export default App;
