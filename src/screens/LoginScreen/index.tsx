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
import React, { FunctionComponent, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '@src/services';
import useScreenNavigation from '../../navigations/hooks/useScreenNavigation';
import icons from '../../assets/icons';
import { CheckBoxV } from '../../components/atoms';
import { HorizonLine, SocialButton } from '../../components/molecules';

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    AsyncStorage.getItem('userId');
  }, [navigation]);

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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        AsyncStorage.setItem('userId', body.email);
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (memoLogin) AsyncStorage.setItem('userId', body.email);
      setEmail('');
      setPassword('');
      dispatch(loginUser(body));
      navigation.navigate('Home');
    }
  };

  function borderCheck(inputData: string, alertData: boolean) {
    if (inputData.length === 0) {
      return styles.borderBottomOff;
    }
    if (alertData) {
      return styles.borderBottomRed;
    }
    return styles.borderBottomOn;
  }

  const onVisibleHandler = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logoBox}>
          <Image source={icons.APP_LOGO} style={styles.logo} />
        </View>

        <TextInput
          onChangeText={text => setEmail(text)}
          style={borderCheck(email, emailAlert)}
          placeholder="아이디(이메일)"
          value={email}
        />

        {emailAlert ? (
          <View style={styles.rowView}>
            <Image source={icons.WARNING_CIRCLE} style={styles.warning} />
            <Text style={styles.textAlert}>잘못된 이메일 형식입니다.</Text>
          </View>
        ) : null}

        <View>
          <TextInput
            placeholder="비밀번호"
            onChangeText={text => setPassword(text)}
            style={borderCheck(password, passwordAlert)}
            value={password}
            secureTextEntry={passwordVisible}
          />
          <Pressable onPress={onVisibleHandler} style={styles.visibleBox}>
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
            <Text style={styles.textAlert}>잘못된 비밀번호 형식입니다.</Text>
          </View>
        ) : null}

        {!email || !password ? (
          <TouchableOpacity
            onPress={loginHandler}
            style={styles.LoginButtonOff}
            disabled
          >
            <Text style={styles.LoginButtonTextOff}>로그인</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={loginHandler} style={styles.LoginButtonOn}>
            <Text style={styles.LoginButtonTextOn}>로그인</Text>
          </TouchableOpacity>
        )}

        <View style={styles.checkBoxGroup}>
          <CheckBoxV checkBool={setAutoLogin} checkText={'로그인 상태 유지'} />
          <CheckBoxV checkBool={setMemoLogin} checkText={'아이디저장'} />
        </View>
        <View style={styles.singInCategory}>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Register')}
          >
            아이디 찾기
          </Text>
          <Text style={styles.textSpace}>|</Text>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Register')}
          >
            비밀번호 찾기
          </Text>
          <Text style={styles.textSpace}>|</Text>
          <Text
            style={styles.singInCategoryText}
            onPress={() => navigation.navigate('Register')}
          >
            회원가입
          </Text>
        </View>

        <HorizonLine lineText="또는" />

        <SocialButton />

        <Text
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          앱 둘러보기
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    // alignItems: 'center',
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
    marginBottom: 5,
    marginTop: 5,
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
