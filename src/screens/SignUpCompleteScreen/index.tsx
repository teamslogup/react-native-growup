import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '@src/assets';
import { Button, Typography } from '@src/components/atoms';
import { strings } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
import * as Styled from './styles';

const SignUpCompleteScreen: React.FC = function SignUpCompleteScreen() {
  const { navigate } = useScreenNavigation();

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFFF']}
            style={styles.gradientConatiner}
          />
          <Image source={images.SIGNUP_COMPLETE} style={styles.completeImage} />
        </View>
        <View style={styles.textContainer}>
          <Typography
            color={theme => theme.palette.main.CARPET_BLACK}
            fontSize={theme => theme.typography.size.heading2}
            align={'center'}
            fontWeight={'bold'}
          >
            {strings.SIGNUP_COMPLETE_REGIST}
          </Typography>
          <Typography
            color={theme => theme.palette.main.CARPET_BLACK}
            fontSize={theme => theme.typography.size.heading2}
            align={'center'}
            fontWeight={'bold'}
            style={styles.marginTop5}
          >
            {strings.SIGNUP_COMPLETE_CONGRATULATIONS}
          </Typography>
          <Typography
            color={theme => theme.palette.grey[2]}
            fontSize={theme => theme.typography.size.body2}
            align={'center'}
            style={styles.marginTop15}
          >
            {strings.SIGNUP_COMPLETE_REGIST_CAR}
          </Typography>
          <Typography
            color={theme => theme.palette.grey[2]}
            fontSize={theme => theme.typography.size.body2}
            align={'center'}
            style={styles.lastText}
          >
            {strings.SIGNUP_COMPLETE_START_WITH_CARPET}
          </Typography>
        </View>
        <View style={styles.buttons}>
          <Button
            variant={'inverted'}
            onPress={() => navigate('Home')}
            style={styles.homeButton}
          >
            {strings.GO_HOME}
          </Button>
          <Button
            colorStyle={'light'}
            onPress={() => Alert.alert('미구현')}
            style={styles.registCarButton}
          >
            {strings.REGIST_CAR}
          </Button>
        </View>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientConatiner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  completeImage: {
    width: '70%',
    height: '70%',
  },
  buttons: {
    flexDirection: 'row',
  },
  homeButton: {
    flex: 1,
  },
  registCarButton: {
    marginLeft: 5,
    flex: 1.5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  marginTop15: {
    marginTop: 15,
  },
  marginTop5: {
    marginTop: 5,
  },
  lastText: {
    marginTop: 5,
    marginBottom: 80,
  },
});

export default SignUpCompleteScreen;
