import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  Text,
  ImageURISource,
  ImageSourcePropType,
} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  checkSetBool: Dispatch<SetStateAction<boolean>>;
  checkBool: boolean;
  checkText?: string;
  checkButtonImage: ImageSourcePropType & ImageURISource;
  uncheckButtonImage: ImageSourcePropType & ImageURISource;
}

const RoundCheckBox: FunctionComponent<Props> = function RoundCheckBox({
  checkSetBool,
  checkBool,
  checkText,
  checkButtonImage,
  uncheckButtonImage,
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(checkBool);
  }, [checkBool]);

  const onCheckBoxPress = () => {
    // console.log('isChecked', isChecked);
    // console.log('checkSetBool', checkBool);
    setIsChecked(!checkBool);
    checkSetBool(!checkBool);
  };

  return (
    <Pressable onPress={onCheckBoxPress}>
      <View style={styles.rowView}>
        {isChecked ? (
          <Image source={checkButtonImage} style={styles.checkBox} />
        ) : (
          <Image source={uncheckButtonImage} style={styles.checkBox} />
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

export default RoundCheckBox;
