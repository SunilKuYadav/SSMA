import {Alarm, Timer} from '../../pages';
import {DashboardPagesArray} from '../../_types';

const DASHBOARD_PAGES_LIST: DashboardPagesArray[] = [
  {name: 'Alarm', naviagteTo: 'Alarm', component: Alarm},
  // {name: 'To Do', naviagteTo: 'Dashboard', component: },
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
