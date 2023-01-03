import {Alarm, Timer, Todo} from '../../pages';

const DASHBOARD_PAGES_LIST: {
  name: string;
  naviagteTo: string;
  component: any;
}[] = [
  {name: 'Alarm', naviagteTo: 'Alarm', component: Alarm},
  {name: 'To Do', naviagteTo: 'ToDo', component: Todo},
  {name: 'Timer', naviagteTo: 'Timer', component: Timer},
  // {name: 'Reminder', naviagteTo: '', component: },
  // {name: 'SM-based Tracker', naviagteTo: '', component: },
  // {name: 'Music Player', naviagteTo: '', component: },
  // {name: 'Video Player', naviagteTo: '', component: },
  // {name: 'Camera', naviagteTo: '', component: },
  // {
  //   name: 'Blutooth Connectivity',
  //   naviagteTo: '',
  //   component: ,
  // },
  // {name: 'Wifi Connectivity', naviagteTo: '', component: },
  // {name: 'Hotspot Data Share', naviagteTo: '', component: },
  // {name: 'Insta Animation', naviagteTo: '', component: },
];

export {DASHBOARD_PAGES_LIST};
