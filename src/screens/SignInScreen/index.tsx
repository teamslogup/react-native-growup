import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import { useSetRecoilState } from 'recoil';
import * as Yup from 'yup';
import { requestSignIn } from '@src/apis';
import { icons, images } from '@src/assets';
import {
  Button,
  CheckBox,
  Divider,
  Icon,
  TextInput,
  Typography,
} from '@src/components/atoms';
import { strings } from '@src/constants';
import { SignInParams } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';
import { userState } from '@src/services/recoil';
import { utils } from '@src/utils';
import * as Styled from './styles';

interface SignInState extends SignInParams {
  rememberId: boolean;
  rememberUser: boolean;
}

const SignInScreen: React.FC = function SignInScreen() {
  const setUserState = useSetRecoilState(userState);
  const { navigate } = useScreenNavigation();

  const passwordRef = useRef<RNTextInput>(null!);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const formik = useFormik<SignInState>({
    validationSchema: Yup.object({
      id: Yup.string()
        .matches(utils.EMAIL_REGEX, strings.WRONG_EMAIL_FORM)
        .required(strings.REQUIRED_FIELD),
      password: Yup.string().required(strings.REQUIRED_FIELD),
      rememberId: Yup.boolean(),
      rememberUser: Yup.boolean(),
    }),
    initialValues: {
      id: '',
      password: '',
      rememberId: false,
      rememberUser: false,
    },
    validateOnMount: true,
    onSubmit: async (
      { id, password, rememberId, rememberUser },
      { setSubmitting, resetForm, setFieldValue },
    ) => {
      setSubmitting(true);

      const user = await requestSignIn({ id, password });

      setSubmitting(false);

      if (rememberId) AsyncStorage.setItem('userID', id).catch(() => {});
      else AsyncStorage.removeItem('userID').catch(() => {});

      if (user) {
        setUserState(user);
        navigate('Home');
      } else {
        Alert.alert(strings.WRONG_ID_OR_PASSWORD);
      }

      resetForm();

      if (rememberId) {
        setFieldValue('id', id);
        setFieldValue('rememberId', true);
      }

      if (rememberUser) setFieldValue('rememberUser', true);

      if (user && rememberUser) {
        AsyncStorage.setItem('user', JSON.stringify(user)).catch(() => {});
      }
    },
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('userID');

      if (!id) return;

      setFieldValue('id', id).catch(() => {});
      setFieldValue('rememberId', true).catch(() => {});
    })().catch(() => Alert.alert('AsyncStorage Error'));
  }, [setFieldValue]);

  const isIdError = formik.values.id.length > 0 && Boolean(formik.errors.id);
  const isPwError =
    formik.values.password.length > 0 && Boolean(formik.errors.password);

  return (
    <SafeAreaView>
      <Styled.Container>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image source={images.CARPET_LOGO} style={styles.logo} />
          </View>
          <TextInput
            inputProps={{
              placeholder: `${strings.ID}(${strings.EMAIL})`,
              value: formik.values.id,
              onChangeText: id => formik.setFieldValue('id', id),
              onSubmitEditing: () => passwordRef.current.focus(),
            }}
            label={`${strings.ID}(${strings.EMAIL})`}
            error={isIdError}
            helperText={isIdError ? formik.errors.id : undefined}
            style={styles.idField}
          />
          <TextInput
            inputRef={passwordRef}
            inputProps={{
              secureTextEntry: !visiblePassword,
              placeholder: strings.PASSWORD,
              value: formik.values.password,
              onChangeText: pw => formik.setFieldValue('password', pw),
            }}
            label={strings.PASSWORD}
            error={isPwError}
            helperText={isPwError ? formik.errors.password : undefined}
            endAdornment={
              <Pressable
                onPress={() => setVisiblePassword(visible => !visible)}
              >
                {visiblePassword ? (
                  <Image
                    source={icons.VISIBLE_ICON}
                    style={styles.togglePasswordVisible}
                  />
                ) : (
                  <Image
                    source={icons.INVISIBLE_ICON}
                    style={styles.togglePasswordVisible}
                  />
                )}
              </Pressable>
            }
            onSubmit={formik.submitForm}
            style={styles.pwField}
          />
          <Button
            onPress={formik.handleSubmit}
            colorStyle={'light'}
            size={'large'}
            disabled={!formik.isValid || formik.isSubmitting}
            style={styles.signInButton}
          >
            {strings.SIGNIN}
          </Button>
          <View style={styles.signInOptionsContainer}>
            <CheckBox
              label={strings.REMEMBER_USER}
              value={formik.values.rememberUser}
              onChange={checked =>
                formik.setFieldValue('rememberUser', checked)
              }
            />
            <CheckBox
              label={strings.REMEMBER_ID}
              value={formik.values.rememberId}
              onChange={checked => formik.setFieldValue('rememberId', checked)}
              style={styles.rememberIdCheckBox}
            />
          </View>
        </View>
        <View style={styles.helpMenu}>
          <Styled.HelpText>{strings.FIND_ID}</Styled.HelpText>
          <Divider direction={'column'} />
          <Styled.HelpText>{strings.FIND_PASSWORD}</Styled.HelpText>
          <Divider direction={'column'} />
          <Styled.HelpText onPress={() => navigate('SignUpAgreement')}>
            {strings.SIGNUP}
          </Styled.HelpText>
        </View>
        <Divider
          length={'90%'}
          color={theme => theme.palette.grey[5]}
          label={strings.OR}
          textColor={theme => theme.palette.grey[3]}
          style={styles.divider}
        />
        <Styled.Socials>
          <Icon
            src={icons.KAKAO_ICON}
            containerBackground={theme => theme.palette.social.KAKAO}
          />
          <Icon
            src={icons.NAVER_ICON}
            containerBackground={theme => theme.palette.social.NAVER}
          />
          <Icon
            src={icons.GOOGLE_ICON}
            containerBackground={theme => theme.palette.social.GOOGLE}
          />
          <Icon
            src={icons.FACEBOOK_ICON}
            containerBackground={theme => theme.palette.social.FACEBOOK}
          />
          <Icon
            src={icons.APPLE_ICON}
            containerBackground={theme => theme.palette.social.APPLE}
          />
        </Styled.Socials>
        <View style={styles.browseAppContainer}>
          <Typography
            onPress={() => navigate('Home')}
            color={theme => theme.palette.grey[1]}
            underline
          >
            {strings.BROWSE_APP}
          </Typography>
        </View>
      </Styled.Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
  },
  idField: {
    marginTop: 45,
  },
  pwField: {
    marginTop: 30,
  },
  signInButton: {
    marginTop: 15,
  },
  signInOptionsContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  rememberIdCheckBox: {
    marginLeft: 10,
  },
  togglePasswordVisible: {
    width: 24,
    height: 24,
  },
  helpMenu: {
    width: '60%',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 50,
  },
  browseAppContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInScreen;
