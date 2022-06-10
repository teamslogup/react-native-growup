import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
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
import { SignInParams } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';
import { userState } from '@src/services/recoil';
import { StyledHelpText, StyledSocialView, StyledView } from './styles';

interface SignInState extends SignInParams {
  rememberId: boolean;
  rememberUser: boolean;
}

const SignInScreen: React.FC = function SignInScreen() {
  const setUserState = useSetRecoilState(userState);
  const { navigate } = useScreenNavigation();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const formik = useFormik<SignInState>({
    validationSchema: Yup.object({
      id: Yup.string()
        .matches(
          /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
          '잘못된 이메일 형식입니다.',
        )
        .required('필수입력 항목입니다.'),
      password: Yup.string().required('필수입력 항목입니다.'),
      rememberId: Yup.boolean(),
      rememberUser: Yup.boolean(),
    }),
    initialValues: {
      id: '',
      password: '',
      rememberId: false,
      rememberUser: false,
    },
    isInitialValid: false,
    onSubmit: async ({ id, password }, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      const user = await requestSignIn({ id, password });

      setSubmitting(false);

      if (user) {
        setUserState(user);
        navigate('Home');
      } else {
        resetForm();
        Alert.alert('아이디 혹은 패스워드가 잘못되었습니다.');
      }
    },
  });

  const isIdError = formik.values.id.length > 0 && Boolean(formik.errors.id);
  const isPwError =
    formik.values.password.length > 0 && Boolean(formik.errors.password);

  return (
    <SafeAreaView>
      <StyledView>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image source={images.CARPET_LOGO} style={styles.logo} />
          </View>
          <TextInput
            inputProps={{
              placeholder: '아이디(이메일)',
              value: formik.values.id,
              onChangeText: id => formik.setFieldValue('id', id),
            }}
            error={isIdError}
            helperText={isIdError ? formik.errors.id : undefined}
            style={styles.idField}
          />
          <TextInput
            inputProps={{
              secureTextEntry: !visiblePassword,
              placeholder: '비밀번호',
              value: formik.values.password,
              onChangeText: pw => formik.setFieldValue('password', pw),
            }}
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
            size="large"
            disabled={!formik.isValid || formik.isSubmitting}
            style={styles.signInButton}
          >
            로그인
          </Button>
          <View style={styles.signInOptionsContainer}>
            <CheckBox
              label="로그인 상태 유지"
              value={formik.values.rememberUser}
              onChange={checked =>
                formik.setFieldValue('rememberUser', checked)
              }
            />
            <CheckBox
              label="아이디 저장"
              value={formik.values.rememberId}
              onChange={checked => formik.setFieldValue('rememberId', checked)}
              style={styles.rememberIdCheckBox}
            />
          </View>
        </View>
        <View style={styles.helpMenu}>
          <StyledHelpText>아이디 찾기</StyledHelpText>
          <Divider direction="column" />
          <StyledHelpText>비밀번호 찾기</StyledHelpText>
          <Divider direction="column" />
          <StyledHelpText>회원가입</StyledHelpText>
        </View>
        <Divider
          length="90%"
          color={theme => theme.grey[5]}
          label="또는"
          textColor={theme => theme.grey[3]}
          style={styles.divider}
        />
        <StyledSocialView>
          <Icon
            src={icons.KAKAO_ICON}
            containerBackground={theme => theme.social.KAKAO}
          />
          <Icon
            src={icons.NAVER_ICON}
            containerBackground={theme => theme.social.NAVER}
          />
          <Icon
            src={icons.GOOGLE_ICON}
            containerBackground={theme => theme.social.GOOGLE}
          />
          <Icon
            src={icons.FACEBOOK_ICON}
            containerBackground={theme => theme.social.FACEBOOK}
          />
          <Icon
            src={icons.APPLE_ICON}
            containerBackground={theme => theme.social.APPLE}
          />
        </StyledSocialView>
        <View style={styles.previewTextContainer}>
          <Typography
            onPress={() => navigate('Home')}
            color={theme => theme.grey[1]}
            underline
          >
            앱 둘러보기
          </Typography>
        </View>
      </StyledView>
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
  previewTextContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInScreen;
