import React, { FunctionComponent } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { icons } from '../../../assets';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SocialButton: FunctionComponent<Props> = function SocialButton() {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.iconSize} source={icons.KAKAO} />
      <Image style={styles.iconSize} source={icons.NAVER} />
      <Image style={styles.iconSize} source={icons.GOOGLE} />
      <Image style={styles.iconSize} source={icons.FACEBOOK} />
      <Image style={styles.iconSize} source={icons.APPLE} />
    </Pressable>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  iconSize: {
    width: 44,
    height: 44,
  },
});
