import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { loginUser } from '@src/services';
import icons from '../../assets/icons';
import RoundCheckBox from '../../components/atoms/RoundCheckBox';
import { HorizonLine, SocialButton } from '../../components/molecules';
import { strings, colors } from '../../constants';
import useScreenNavigation from '../../navigations/hooks/useScreenNavigation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LoginScreen: FunctionComponent<Props> = function LoginScreen() {
  const navigation = useScreenNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailAlert, setEmailAlert] = useState<boolean>(false);
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);

  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [memoLogin, setMemoLogin] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user', (error, result) => {
      if (error) {
        return;
      }

      if (result) {
        const userInfo = JSON.parse(result) as {
          email: string;
          password: string;
        };

        dispatch(loginUser(userInfo));
        navigation.navigate('Home');
      }
    }).catch(() => {});

    AsyncStorage.getItem('userEmail', (error, result) => {
      if (error) {
        return;
      }

      if (result) {
        setEmail(result);
        setMemoLogin(true);
      }
    }).catch(() => {});
  }, [dispatch, navigation, memoLogin]);

  useEffect(() => {
    if (!memoLogin) AsyncStorage.removeItem('userEmail').catch(() => {});
  }, [memoLogin]);

  const loginHandler = () => {
    const body = { email, password };

    const emailRegex =
      /([a-zA-Z+]|([0-9]))@([a-zA-Z+]|([0-9]))+[.]+([a-zA-Z+]|([0-9]))+/;

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;

    if (!emailRegex.test(body.email)) {
      setEmailAlert(true);
    } else {
      setEmailAlert(false);
    }

    if (!passwordRegex.test(body.password)) {
      setPasswordAlert(true);
    } else {
      setPasswordAlert(false);
    }

    if (body.email === 'mobile@slogup.com' && body.password === '123qwe!') {
      if (autoLogin) {
        AsyncStorage.setItem(
          'user',
          JSON.stringify({ email: body.email, password: body.password }),
        ).catch(() => {});
      }
      if (memoLogin) {
        AsyncStorage.setItem('userEmail', body.email).catch(() => {});
      } else {
        AsyncStorage.removeItem('userEmail').catch(() => {});
      }
      setEmail('');
      setPassword('');
      dispatch(loginUser(body));
      navigation.navigate('Home');
    }
  };

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
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Image source={icons.APP_LOGO} style={styles.logo} />
        </View>

        <TextInput
          onChangeText={text => setEmail(text)}
          style={getBorderStyle(email, emailAlert)}
          placeholder="아이디(이메일)"
          value={email}
        />

        {emailAlert ? (
          <View style={styles.rowView}>
            <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
            <Text style={styles.textAlert}>{strings.WRONG_EMAIL}</Text>
          </View>
        ) : null}

        <View>
          <TextInput
            placeholder="비밀번호"
            onChangeText={text => setPassword(text)}
            style={getBorderStyle(password, passwordAlert)}
            value={password}
            secureTextEntry={passwordVisible}
          />
          <Pressable onPress={onVisibleButtonPress} style={styles.visibleBox}>
            {passwordVisible ? (
              <Image source={icons.INVISIBLE} style={styles.visibleButton} />
            ) : (
              <Image source={icons.VISIBLE} style={styles.visibleButton} />
            )}
          </Pressable>
        </View>

        {passwordAlert ? (
          <View style={styles.rowView}>
            <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
            <Text style={styles.textAlert}>{strings.WRONG_PASSWORD}</Text>
          </View>
        ) : null}

        {!email || !password ? (
          <TouchableOpacity
            onPress={loginHandler}
            style={styles.LoginButtonOff}
            disabled
          >
            <Text style={styles.LoginButtonTextOff}>{strings.LOGIN}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={loginHandler} style={styles.LoginButtonOn}>
            <Text style={styles.LoginButtonTextOn}>{strings.LOGIN}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.checkBoxGroup}>
          <RoundCheckBox
            checkBool={autoLogin}
            checkSetBool={setAutoLogin}
            checkText={strings.LOGIN_STATUS_ON}
            uncheckButtonImage={icons.UNCHECK_BUTTON}
            checkButtonImage={icons.CHECK_BUTTON}
          />
          <RoundCheckBox
            checkBool={memoLogin}
            checkSetBool={setMemoLogin}
            checkText={strings.ID_SAVE}
            uncheckButtonImage={icons.UNCHECK_BUTTON}
            checkButtonImage={icons.CHECK_BUTTON}
          />
        </View>
        <View style={styles.singInCategory}>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Register')}
          >
            {strings.ID_FIND}
          </Text>
          <Text style={styles.textSpace}>|</Text>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Register')}
          >
            {strings.PASSWORD_FIND}
          </Text>
          <Text style={styles.textSpace}>|</Text>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Agreement')}
          >
            {strings.SIGN_UP}
          </Text>
        </View>

        <HorizonLine lineText={strings.OR} />

        <SocialButton />

        <Text
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          {strings.APP_SEE}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    margin: 20,
  },
  logoBox: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 144,
    height: 22,
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
  warning: {
    width: 16,
    height: 16,
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
  rowView: {
    flexDirection: 'row',
  },
  textAlert: {
    color: 'red',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 5,
  },
  checkBoxGroup: {
    flexDirection: 'row',
    marginTop: 15,
  },
  singInCategory: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
  },
  singInCategoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#646464',
  },
  socielCategory: {
    flexDirection: 'row',
  },
  textSpace: {
    marginLeft: 3,
    marginRight: 3,
  },
  homeButton: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    width: '100%',
    fontSize: 14,
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
});
