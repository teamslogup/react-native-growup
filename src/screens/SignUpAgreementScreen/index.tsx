import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import useSWR from 'swr';
import * as Yup from 'yup';
import { Button, CheckBox, Divider, Typography } from '@src/components/atoms';
import { strings } from '@src/constants';
import { Terms } from '@src/data';
import { useScreenNavigation } from '@src/navigations/hooks';
import { carpetAxios } from '@src/network/axios';
import { Rows } from '@src/network/types';
import * as Styled from './styles';

const MARKETING_TERMS_ID = '6125c9fe71d7b2079ce975fa' as const;

const SignUpAgreementScreen: React.FC = function SignUpAgreementScreen() {
  const { navigate } = useScreenNavigation();
  const { data = { rows: [] } } = useSWR<Rows<Terms>>(
    '/user-clau',
    async (key: string) => (await carpetAxios.get<Rows<Terms>>(key)).data,
    { suspense: true },
  );

  const formik = useFormik({
    validationSchema: Yup.object(
      Object.fromEntries(
        data.rows.map(({ _id, esnt_clau_yn }) => [
          _id,
          esnt_clau_yn ? Yup.boolean().required().oneOf([true]) : Yup.boolean(),
        ]),
      ),
    ),
    initialValues: Object.fromEntries(data.rows.map(({ _id }) => [_id, false])),
    validateOnMount: true,
    onSubmit: values =>
      navigate('Certification', {
        acceptMarketing: values[MARKETING_TERMS_ID],
      }),
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
                ),
              )
            }
            style={styles.agreeAll}
          />
          <Divider
            color={theme => theme.palette.grey[5]}
            style={styles.divider}
          />
          {data.rows.map(terms => (
            <View key={terms._id} style={styles.checkBoxContainer}>
              <CheckBox
                variant={'checkonly'}
                value={formik.values[terms._id]}
                onChange={value => formik.setFieldValue(terms._id, value)}
                style={styles.marginRight10}
              />
              <Typography style={styles.marginRight10}>
                {terms.esnt_clau_yn
                  ? `(${strings.REQUIRED})`
                  : `(${strings.OPTIONAL})`}
              </Typography>
              <Typography
                color={theme => theme.palette.grey[1]}
                onPress={
                  terms._id !== MARKETING_TERMS_ID
                    ? () => navigate('Terms', { terms })
                    : undefined
                }
                underline={terms.esnt_clau_yn}
                style={styles.marginRight10}
              >
                {terms.clau_nm}
              </Typography>
            </View>
          ))}
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
