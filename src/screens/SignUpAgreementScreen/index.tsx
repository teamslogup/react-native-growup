import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, CheckBox, Divider, Typography } from '@src/components/atoms';
import { strings } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
import * as Styled from './styles';

type Agreement = {
  service: boolean;
  personalInformation: boolean;
  personalInformationAgree: boolean;
  marketing: boolean;
};

const SignUpAgreementScreen: React.FC = function SignUpAgreementScreen() {
  const { navigate } = useScreenNavigation();

  const formik = useFormik<Agreement>({
    validationSchema: Yup.object({
      service: Yup.boolean().required().oneOf([true]),
      personalInformation: Yup.boolean().required().oneOf([true]),
      personalInformationAgree: Yup.boolean().required().oneOf([true]),
      marketing: Yup.boolean(),
    }),
    initialValues: {
      service: false,
      personalInformation: false,
      personalInformationAgree: false,
      marketing: false,
    },
    validateOnMount: true,
    onSubmit: () => navigate('SignUpPersonalInformation'),
  });

  const agreeAll = Object.values(formik.values).every(value => value);

  return (
    <Styled.SafeAreaView>
      <Divider color={theme => theme.palette.grey[5]} length={'100%'} />
      <Styled.Container>
        <View>
          <CheckBox
            variant={'borderless'}
            label={strings.SIGNUP_AGREE_ALL}
            labelStyle={theme => ({
              fontSize: theme.typography.size.heading1,
              fontWeight: 'bold',
              color: theme.palette.main.DARK_BLACK,
            })}
            value={agreeAll}
            onChange={value =>
              formik.setValues(
                Object.fromEntries(
                  Object.keys(formik.values).map(key => [key, value]),
                ) as Agreement,
              )
            }
            style={styles.agreeAll}
          />
          <Divider
            color={theme => theme.palette.grey[5]}
            style={styles.divider}
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              variant={'checkonly'}
              value={formik.values.service}
              onChange={value => formik.setFieldValue('service', value)}
              style={styles.marginRight10}
            />
            <Typography
              style={styles.marginRight10}
            >{`(${strings.REQUIRED})`}</Typography>
            <Typography
              color={theme => theme.palette.grey[1]}
              style={styles.marginRight10}
              underline
            >
              {strings.SIGNUP_SERVICE_TERMS}
            </Typography>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              variant={'checkonly'}
              value={formik.values.personalInformation}
              onChange={value =>
                formik.setFieldValue('personalInformation', value)
              }
              style={styles.marginRight10}
            />
            <Typography
              style={styles.marginRight10}
            >{`(${strings.REQUIRED})`}</Typography>
            <Typography
              color={theme => theme.palette.grey[1]}
              style={styles.marginRight10}
              underline
            >
              {strings.SIGNUP_PRIVACY_POLICY}
            </Typography>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              variant={'checkonly'}
              value={formik.values.personalInformationAgree}
              onChange={value =>
                formik.setFieldValue('personalInformationAgree', value)
              }
              style={styles.marginRight10}
            />
            <Typography
              style={styles.marginRight10}
            >{`(${strings.REQUIRED})`}</Typography>
            <Typography
              color={theme => theme.palette.grey[1]}
              style={styles.marginRight10}
              underline
            >
              {strings.SIGNUP_PRIVACY_POLICY_AGREE}
            </Typography>
          </View>
          <View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                variant={'checkonly'}
                value={formik.values.marketing}
                onChange={value => formik.setFieldValue('marketing', value)}
                style={styles.marginRight10}
              />
              <Typography
                style={styles.marginRight10}
              >{`(${strings.OPTIONAL})`}</Typography>
              <Typography
                color={theme => theme.palette.grey[1]}
                style={styles.marginRight10}
                underline
              >
                {strings.SIGNUP_MARKETING_AGREE}
              </Typography>
            </View>
            <Typography
              color={theme => theme.palette.grey[3]}
              fontSize={theme => theme.typography.size.body3}
              style={styles.marginTop10}
            >
              {strings.SIGNUP_MARKETING_HELP}
            </Typography>
          </View>
        </View>
        <Button
          colorStyle={'light'}
          onPress={formik.submitForm}
          size={'large'}
          disabled={!formik.isValid}
        >
          {strings.OK}
        </Button>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

const styles = StyleSheet.create({
  agreeAll: {
    marginTop: 20,
    borderWidth: 0,
  },
  divider: {
    marginTop: 20,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  marginRight10: {
    marginRight: 10,
  },
  marginTop10: {
    marginTop: 10,
  },
});

export default SignUpAgreementScreen;
