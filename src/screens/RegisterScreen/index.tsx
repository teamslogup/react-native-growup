import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@src/assets';
import { colors, strings } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const RegisterScreen: FunctionComponent<Props> = function RegisterScreen() {
  const navigation = useScreenNavigation();
  const [email, setEmail] = useState<string>('');
  const [isEmailAlert, setIsEmailAlert] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [isPasswordAlert, setIsPasswordAlert] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isConfirmAlert, setIsConfirmAlert] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(true);

  const emailRegex =
    /([a-zA-Z+]|([0-9]))@([a-zA-Z+]|([0-9]))+[.]+([a-zA-Z+]|([0-9]))+/;

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;

  useEffect(() => {
    if (!emailRegex.test(email) && email.length !== 0) {
      setIsEmailAlert(true);
    } else {
      setIsEmailAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (!passwordRegex.test(password)) {
      setIsPasswordAlert(true);
    } else {
      setIsPasswordAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsConfirmAlert(true);
    } else {
      setIsConfirmAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  const getBorderStyle = (inputData: string, alertData: boolean) => {
    if (inputData.length === 0) {
      return styles.borderBottomOff;
    }
    if (alertData) {
      return styles.borderBottomRed;
    }
    return styles.borderBottomOn;
  };

  const onVisibleButtonPress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onConfirmVisibleButtonPress = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };

  const onOkButtonPress = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.background}>
      <TextInput
        onChangeText={text => setEmail(text)}
        style={getBorderStyle(email, isEmailAlert)}
        placeholder={strings.ID_EMAIL}
        value={email}
      />
      {email.length !== 0 &&
        (isEmailAlert ? (
          <View style={styles.rowView}>
            <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
            <Text style={styles.textAlert}>{strings.WRONG_EMAIL}</Text>
          </View>
        ) : (
          <View style={styles.rowView}>
            <Image source={icons.CHECK_BUTTON} style={styles.warning} />
            <Text style={styles.textUsable}>{strings.USABLE_EMAIL}</Text>
          </View>
        ))}

      <View>
        <TextInput
          placeholder={strings.PASSWORD}
          onChangeText={text => setPassword(text)}
          style={getBorderStyle(password, isPasswordAlert)}
          value={password}
          secureTextEntry={isPasswordVisible}
        />
        <Pressable onPress={onVisibleButtonPress} style={styles.visibleBox}>
          {isPasswordVisible ? (
            <Image source={icons.INVISIBLE} style={styles.visibleButton} />
          ) : (
            <Image source={icons.VISIBLE} style={styles.visibleButton} />
          )}
        </Pressable>
        {password.length !== 0 &&
          (isPasswordAlert ? (
            <View style={styles.rowView}>
              <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
              <Text style={styles.textAlert}>{strings.WRONG_PASSWORD}</Text>
            </View>
          ) : (
            <View style={styles.rowView}>
              <Image source={icons.CHECK_BUTTON} style={styles.warning} />
              <Text style={styles.textUsable}>{strings.USABLE_PASSWORD}</Text>
            </View>
          ))}
      </View>

      <View>
        <TextInput
          placeholder={strings.PASSWORD_CONFIRM}
          onChangeText={text => setConfirmPassword(text)}
          style={getBorderStyle(confirmPassword, isConfirmAlert)}
          value={confirmPassword}
          secureTextEntry={isConfirmVisible}
        />
        <Pressable
          onPress={onConfirmVisibleButtonPress}
          style={styles.visibleBox}
        >
          {isConfirmVisible ? (
            <Image source={icons.INVISIBLE} style={styles.visibleButton} />
          ) : (
            <Image source={icons.VISIBLE} style={styles.visibleButton} />
          )}
        </Pressable>
        {confirmPassword.length !== 0 &&
          (isConfirmAlert ? (
            <View style={styles.rowView}>
              <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
              <Text style={styles.textAlert}>{strings.UN_MATCH_PASSWORD}</Text>
            </View>
          ) : (
            <View style={styles.rowView}>
              <Image source={icons.CHECK_BUTTON} style={styles.warning} />
              <Text style={styles.textUsable}>{strings.MATCH_PASSWORD}</Text>
            </View>
          ))}
      </View>
      <View style={styles.bottomButton}>
        {email.length !== 0 &&
        password.length !== 0 &&
        confirmPassword.length !== 0 &&
        !isEmailAlert &&
        !isPasswordAlert &&
        !isConfirmAlert ? (
          <TouchableOpacity
            onPress={onOkButtonPress}
            style={styles.LoginButtonOn}
          >
            <Text style={styles.LoginButtonTextOn}>{strings.OK}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.LoginButtonOff} disabled>
            <Text style={styles.LoginButtonTextOff}>{strings.OK}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.WHITE,
    margin: 20,
  },
  borderBottomOn: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    height: 56,
    lineHeight: 24,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  borderBottomOff: {
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    width: '100%',
    height: 56,
    lineHeight: 24,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  borderBottomRed: {
    borderBottomColor: '#E60000',
    borderBottomWidth: 1,
    width: '100%',
    height: 56,
    lineHeight: 24,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  visibleButton: {
    width: 20,
    height: 20,
  },
  visibleBox: {
    position: 'absolute',
    right: 0,
    top: 27,
  },
  warning: {
    width: 16,
    height: 16,
  },
  rowView: {
    flexDirection: 'row',
  },
  textAlert: {
    color: colors.RED,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 5,
  },
  textUsable: {
    color: colors.DARK_BLACK,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 5,
  },
  LoginButtonOn: {
    width: '100%',
    height: 56,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonOff: {
    width: '100%',
    height: 56,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonTextOn: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  LoginButtonTextOff: {
    color: '#D2D2D2',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomButton: {
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
  },
});
