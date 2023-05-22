import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DeleteIcon} from '../../assets';

import {APP_CONSTANT} from '../../config';
import {
  BasicModal,
  CircularButton,
  SwitchSection,
  TextInputSection,
  TimeEditor,
} from '../../components';
import {validateTimeInput} from '../../utils';
import {AlarmModule} from '../../../NativeModules';

const ALARM_CONST = APP_CONSTANT?.STRING_CONSTANTS?.ALARM;
type AlarmTime = {
  hours: number;
  minutes: number;
};

const Alarm = () => {
  const [time, setTime] = useState<AlarmTime>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasVibration, setVibration] = useState<boolean>(false);

  const handleHourChange = (text: string) => {
    validateTimeInput(text) &&
      setTime(state => ({...state, hours: Number(text)}));
  };
  const handleMinuteChange = (text: string) => {
    validateTimeInput(text) &&
      setTime(state => ({...state, minutes: Number(text)}));
  };
  const handleAddAlarmOnPress: () => void = async () => {
    // setTime({
    //   hours: new Date().getHours(),
    //   minutes: new Date().getMinutes(),
    // });
    // setIsVisible(true);
    try {
      const {createAlarmEvent} = AlarmModule;
      await createAlarmEvent('Siddharth ', 'SidLocation');
    } catch (error) {
      throw new Error('Failed to connect to bridge @line48alarm/index.ts');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.alarmWrapper}>
        <CircularButton label="+" labelAction={handleAddAlarmOnPress} />
        <BasicModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          title={ALARM_CONST?.ADD_ALARM_MODAL_TITLE}>
          <View style={styles.modalBody}>
            <TimeEditor
              time={time}
              onHoursPress={handleHourChange}
              onMinutesPress={handleMinuteChange}
            />
            <View style={styles.alarmOptionsView}>
              <TextInputSection
                label="Label"
                selectedValue="add your label here"
              />
              <TextInputSection
                label="Snooze"
                selectedValue="snooze time here"
              />
              <TextInputSection label="Music" selectedValue="music here" />
              <SwitchSection
                label="Vibration"
                isSwitchEnabled={hasVibration}
                setIsSwitchEnabled={setVibration}
              />
            </View>
            <DeleteIcon
              style={styles.deleteAlarmIcon}
              width={50}
              height={50}
              fill={'#000'}
            />
          </View>
        </BasicModal>
      </View>
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  alarmWrapper: {
    position: 'absolute',
    bottom: '12%',
    right: '8%',
  },
  modalBody: {flex: 1},
  alarmOptionsView: {
    marginTop: '5%',
  },
  deleteAlarmIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '10%',
  },
});
