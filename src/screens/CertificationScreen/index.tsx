import React from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import IMP, { IMPData } from 'iamport-react-native';
import { strings } from '@src/constants';
import { IMPCertificationResponse } from '@src/data';
import { useScreenNavigation, useScreenRoute } from '@src/navigations/hooks';

const CertificationScreen: React.FC = function CertificationScreen() {
  const navigation = useScreenNavigation();
  const { params } = useScreenRoute<'Certification'>();

  const onCertificationEnd = (response: IMPCertificationResponse) => {
    if (response.success !== 'true') {
      Alert.alert(strings.FAIL_CERT);
      return navigation.goBack();
    }

    return navigation.navigate('SignUpPersonalInformation', {
      impCertRes: response,
      acceptMarketing: params.acceptMarketing,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <IMP.Certification
        userCode={'imp82481355'}
        data={
          {
            merchant_uid: `mid_${new Date().getTime()}`,
            company: 'SK네트웍스(주)워커힐',
            min_age: '',
          } as IMPData.CertificationData
        }
        loading={<View />}
        callback={onCertificationEnd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CertificationScreen;
