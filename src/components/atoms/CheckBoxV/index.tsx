import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react';
import { Pressable, StyleSheet, Image, View, Text } from 'react-native';
import { icons } from '../../../assets';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  checkBool: Dispatch<SetStateAction<boolean>>;
  checkText?: string;
}

const CheckBoxV: FunctionComponent<Props> = function CheckBoxV({
  checkBool,
  checkText,
}) {
  const [onCheck, setOnCheck] = useState<boolean>(false);

  const onCheckBoxHandler = () => {
    setOnCheck(!onCheck);
    checkBool(!onCheck);
  };

  return (
    <Pressable onPress={onCheckBoxHandler}>
      <View style={styles.rowView}>
        {onCheck ? (
          <Image source={icons.CHECK_BUTTON} style={styles.checkBox} />
        ) : (
          <Image source={icons.UNCHECK_BUTTON} style={styles.checkBox} />
        )}
        <Text style={styles.checkContent}>{checkText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rowView: {
    flexDirection: 'row',
  },
  checkContent: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#646464',
  },
});

export default React.memo(CheckBoxV);
