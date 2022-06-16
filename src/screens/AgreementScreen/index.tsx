import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@src/assets';
import { RoundCheckBox } from '@src/components/atoms';
import { HorizonLine } from '@src/components/molecules';
import { useScreenNavigation } from '@src/navigations/hooks';
import { colors, strings } from '../../constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const AgreementScreen: FunctionComponent<Props> = function AgreementScreen() {
  const navigation = useScreenNavigation();
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isServiceChecked, setIsServiceChecked] = useState<boolean>(false);
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] =
    useState<boolean>(false);
  const [isPrivacyAgreeChecked, setIsPrivacyAgreeChecked] =
    useState<boolean>(false);
  const [isMarcketChecked, setIsMarcketChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isAllChecked) {
      setIsServiceChecked(true);
      setIsPrivacyPolicyChecked(true);
      setIsPrivacyAgreeChecked(true);
      setIsMarcketChecked(true);
    } else {
      setIsServiceChecked(false);
      setIsPrivacyPolicyChecked(false);
      setIsPrivacyAgreeChecked(false);
      setIsMarcketChecked(false);
    }
  }, [isAllChecked]);

  const onOkButtonPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.bottomButton}>
        {isServiceChecked && isPrivacyPolicyChecked && isPrivacyAgreeChecked ? (
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
      <View style={styles.rowView}>
        <RoundCheckBox
          checkBool={isAllChecked}
          checkSetBool={setIsAllChecked}
          checkButtonImage={icons.CHECK_BUTTON}
          uncheckButtonImage={icons.UNROUND_CHECK_BUTTON}
        />
        <Text style={styles.agreeAllTerms}>{strings.AGREE_ALL_TERMS}</Text>
      </View>
      <HorizonLine />
      <View style={styles.rowView}>
        <RoundCheckBox
          checkBool={isServiceChecked}
          checkSetBool={setIsServiceChecked}
          checkButtonImage={icons.UNEMPTY_CHECK_BUTTON}
          uncheckButtonImage={icons.EMPTY_CHECK_BUTTON}
        />
        <Text style={styles.essentialText}>{`(${strings.ESSENTIAL})`}</Text>
        <Text style={styles.infoBorderText}>{strings.TERMS_OF_SERVICE}</Text>
      </View>
      <View style={styles.rowView}>
        <RoundCheckBox
          checkBool={isPrivacyPolicyChecked}
          checkSetBool={setIsPrivacyPolicyChecked}
          checkButtonImage={icons.UNEMPTY_CHECK_BUTTON}
          uncheckButtonImage={icons.EMPTY_CHECK_BUTTON}
        />
        <Text style={styles.essentialText}>{`(${strings.ESSENTIAL})`}</Text>
        <Text style={styles.infoBorderText}>{strings.PRIVACY_POLICY}</Text>
      </View>
      <View style={styles.rowView}>
        <RoundCheckBox
          checkBool={isPrivacyAgreeChecked}
          checkSetBool={setIsPrivacyAgreeChecked}
          checkButtonImage={icons.UNEMPTY_CHECK_BUTTON}
          uncheckButtonImage={icons.EMPTY_CHECK_BUTTON}
        />
        <Text style={styles.essentialText}>{`(${strings.ESSENTIAL})`}</Text>
        <Text style={styles.infoBorderText}>{strings.PRIVACY_AGREE}</Text>
      </View>
      <View style={styles.rowLastView}>
        <RoundCheckBox
          checkBool={isMarcketChecked}
          checkSetBool={setIsMarcketChecked}
          checkButtonImage={icons.UNEMPTY_CHECK_BUTTON}
          uncheckButtonImage={icons.EMPTY_CHECK_BUTTON}
        />
        <Text style={styles.essentialText}>{`(${strings.OPTIONAL})`}</Text>
        <Text style={styles.infoText}>{strings.MARCKETING_AGREE}</Text>
      </View>
      <Text style={styles.agreeTermsInfo}>{strings.AGREE_TERMS_INFO}</Text>
    </SafeAreaView>
  );
};

export default AgreementScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.WHITE,
    margin: 20,
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
    marginBottom: 24,
  },
  rowLastView: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  agreeAllTerms: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.GRAY1,
  },
  essentialText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY1,
    marginLeft: 4,
    marginRight: 4,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.GRAY1,
  },
  infoBorderText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.GRAY1,
    textDecorationLine: 'underline',
  },
  agreeTermsInfo: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.GRAY3,
    paddingLeft: 43,
  },
  bottomButton: {
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 0,
  },
});
