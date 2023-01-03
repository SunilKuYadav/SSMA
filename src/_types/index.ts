export type RootStackParamList = {
  // todo : whenever adding props to a screen update here too
  Dashboard: undefined;
  Alarm: undefined;
  Timer: undefined;
  AddAlarm: undefined;
};
export type DashboardPagesArray = {
  name: string;
  naviagteTo: string;
  component: any;
};

export interface TimeProps {
  minutes: number;
  hours: number;
}
export interface TimeEditorProps {
  time: TimeProps;
  onPress?: () => void;
  onHoursPress: (text: string) => void;
  onMinutesPress: (text: string) => void;
}
