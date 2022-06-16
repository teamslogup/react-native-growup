import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import * as Yup from 'yup';
import { requestSignUp } from '@src/apis';
import { HTTP_STATUS } from '@src/apis/utils';
import { icons } from '@src/assets';
import {
  Button,
  Divider,
  Icon,
  TextInput,
  Typography,
} from '@src/components/atoms';
import { strings } from '@src/constants';
import { useScreenNavigation, useScreenRoute } from '@src/navigations/hooks';
import { carpetAxios } from '@src/network/axios';
import { userState } from '@src/services/recoil';
import { utils } from '@src/utils';
import * as Styled from './styles';

type PersonalInformationFields = {
  id: string;
  password: string;
  passwordConfirm: string;
};

const SignUpPersonalInformationScreen: React.FC =
  function SignUpPersonalInformationScreen() {
    const setUser = useSetRecoilState(userState);
    const { navigate } = useScreenNavigation();
    const { params } = useScreenRoute<'SignUpPersonalInformation'>();

    const formik = useFormik<PersonalInformationFields>({
      validationSchema: Yup.object({
        id: Yup.string()
          .matches(utils.EMAIL_REGEX, strings.WRONG_EMAIL_FORM)
          .required(strings.REQUIRED_FIELD),
        password: Yup.string()
          .matches(utils.PASSWORD_REGEX, strings.WRONG_PASSWORD_FORM)
          .required(strings.REQUIRED_FIELD),
        passwordConfirm: Yup.string()
          .required(strings.REQUIRED_FIELD)
          .oneOf([Yup.ref('password')], strings.PASSWORD_NOT_EQUAL),
      }),
      validateOnMount: true,
      initialValues: {
        id: '',
        password: '',
        passwordConfirm: '',
      },
      onSubmit: async ({ id, password }) => {
        const result = await requestSignUp({
          user_eml_addr: id,
          user_encr_pwd: password,
          impId: params.impCertRes.imp_uid,
          bAcceptsEmailMarketing: params.acceptMarketing,
          bAcceptsPushMarketing: params.acceptMarketing,
          bAcceptsSMSMarketing: params.acceptMarketing,
        });

        if (typeof result === 'string') {
          return Alert.alert(result);
        }

        setUser(result);
        return navigate('SignUpComplete');
      },
    });

    const { data: isIdDuplicated = false } = useSWR(
      ['/user/check-duplicated-email', formik.values.id],
      async (url, email) => {
        try {
          await carpetAxios.get(`${url}/${email}`);

          return false;
        } catch (e) {
          return (e as AxiosError).response?.status === HTTP_STATUS.CONFLICT;
        }
      },
    );

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

    const getIsError = (field: keyof PersonalInformationFields) => {
      if (field === 'id' && isIdDuplicated) {
        return true;
      }

      return formik.values[field].length > 0 && Boolean(formik.errors[field]);
    };

    const getHelper = (field: keyof PersonalInformationFields) => {
      if (!formik.values[field].length) {
        return undefined;
      }

      const helper: Record<typeof field, string> = {
        id: strings.AVAILABLE_ID,
        password: strings.AVAILABLE_PASSWORD,
        passwordConfirm: strings.PASSWORD_EQUAL,
      };

      const isError = getIsError(field);

      const getHelperText = () => {
        if (field === 'id' && isIdDuplicated) {
          return strings.ID_DUPLICATED;
        }

        return isError ? formik.errors[field] : helper[field];
      };

      return (
        <View style={styles.flexDirectionRow}>
          <Icon
            src={isError ? icons.WARNNING : icons.OK}
            containerSize={{ width: 16, height: 16 }}
            iconSize={{ width: 16, height: 16 }}
          />
          <Typography
            fontSize={theme => theme.typography.size.body3}
            color={theme =>
              isError ? theme.palette.state.RED : theme.palette.main.DARK_BLACK
            }
            style={styles.marginLeft5}
          >
            {getHelperText()}
          </Typography>
        </View>
      );
    };

    return (
      <Styled.SafeAreaView>
        <Divider color={theme => theme.palette.grey[5]} length={'100%'} />
        <Styled.Container>
          <View>
            <TextInput
              inputProps={{
                placeholder: `${strings.ID}(${strings.EMAIL})`,
                value: formik.values.id,
                onChangeText: id => formik.setFieldValue('id', id),
              }}
              label={`${strings.ID}(${strings.EMAIL})`}
              error={getIsError('id')}
              helper={getHelper('id')}
              style={styles.marginTop20}
            />
            <TextInput
              inputProps={{
                secureTextEntry: !visiblePassword,
                placeholder: strings.PASSWORD,
                value: formik.values.password,
                onChangeText: pw => formik.setFieldValue('password', pw),
              }}
              label={strings.PASSWORD}
              error={getIsError('password')}
              helper={getHelper('password')}
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
              style={styles.marginTop20}
            />
            <TextInput
              inputProps={{
                secureTextEntry: !visiblePasswordConfirm,
                placeholder: `${strings.PASSWORD} ${strings.RECONFIRM}`,
                value: formik.values.passwordConfirm,
                onChangeText: pwc =>
                  formik.setFieldValue('passwordConfirm', pwc),
              }}
              label={`${strings.PASSWORD} ${strings.RECONFIRM}`}
              error={getIsError('passwordConfirm')}
              helper={getHelper('passwordConfirm')}
              endAdornment={
                <Pressable
                  onPress={() => setVisiblePasswordConfirm(visible => !visible)}
                >
                  {visiblePasswordConfirm ? (
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
              style={styles.marginTop20}
            />
          </View>
          <Button
            onPress={formik.submitForm}
            colorStyle={'light'}
            size={'large'}
            disabled={!formik.isValid || isIdDuplicated}
          >
            {strings.OK}
          </Button>
        </Styled.Container>
      </Styled.SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  marginTop20: {
    marginTop: 20,
  },
  togglePasswordVisible: {
    width: 24,
    height: 24,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  marginLeft5: {
    marginLeft: 5,
  },
});

export default SignUpPersonalInformationScreen;
