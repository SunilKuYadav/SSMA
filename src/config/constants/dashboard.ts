import {Alarm, Dashboard, Timer} from '../../pages';

const DASHBOARD_PAGES_LIST: {
  name: string;
  naviagteTo: string;
  component: any;
}[] = [
  {name: 'Dashboard', naviagteTo: 'Dashboard', component: Dashboard},
  {name: 'Alarm', naviagteTo: 'Alarm', component: Alarm},
  // {name: 'To Do', naviagteTo: 'Dashboard', component: Dashboard},
  {name: 'Timer', naviagteTo: 'Timer', component: Timer},
  // {name: 'Reminder', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'SM-based Tracker', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'Music Player', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'Video Player', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'Camera', naviagteTo: 'Dashboard', component: Dashboard},
  // {
  //   name: 'Blutooth Connectivity',
  //   naviagteTo: 'Dashboard',
  //   component: Dashboard,
  // },
  // {name: 'Wifi Connectivity', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'Hotspot Data Share', naviagteTo: 'Dashboard', component: Dashboard},
  // {name: 'Insta Animation', naviagteTo: 'Dashboard', component: Dashboard},
];

export {DASHBOARD_PAGES_LIST};
