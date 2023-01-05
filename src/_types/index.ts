import 'react-native-svg';

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
export type BasicModalProps = {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  title?: string;
};
export interface TextInpSection {
  label: string;
  selectedValue: string;
  buttonOnPress?: () => void;
}

export interface SwitchSecInterface {
  label: string;
  isSwitchEnabled: boolean;
  setIsSwitchEnabled: (val: boolean) => void;
}

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
  }
  export interface PathProps {
    style?: string;
    color?: string;
    overflow?: string;
  }
}
