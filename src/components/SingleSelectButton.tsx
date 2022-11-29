import React, {FC, ReactElement} from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  Text,
} from 'react-native';

type Props = TouchableOpacityProps & {
  label?: string;
  textStyle?: TextStyle;
  checked?: boolean;
  marginTop?: number | string;
  rightComponent?: ReactElement;
};

const SingleSelectButton: FC<Props> = ({
  style,
  marginTop = 8,
  checked,
  label,
  rightComponent,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={{...styles.border, ...(style as ViewStyle), marginTop}}>
      {/* <Icon
        name={checked ? 'radio-button-on' : 'radio-button-off-outline'}
        width={24}
        height={24}
        fill={'#005288'}
      /> */}
      <Text>{checked ? 'radio-button-on' : 'radio-button-off-outline'}</Text>
      <Text style={styles.text}>{label}</Text>
      {rightComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginStart: 10,
  },
  border: {
    borderColor: '#E6E7EB',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SingleSelectButton;
