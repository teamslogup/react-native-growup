import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useScreenNavigation } from '@src/navigations/hooks';
import { logoutUser, RootState, UserData } from '@src/services';
import { strings } from '../../constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HomeScreen: FunctionComponent<Props> = function HomeScreen() {
  const navigation = useScreenNavigation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string>('');

  const userData = useSelector<RootState, UserData | null>(
    state => state.user.userData,
  );

  useEffect(() => {
    if (userData) {
      setUserId(userData.email);
    }
  }, [userData]);

  const onLogOutHandler = () => {
    AsyncStorage.removeItem('user').catch(() => {});
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  const onLogInhandler = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <Text>{strings.HOME}</Text>
      {userData ? (
        <View>
          <Text>{`${strings.ID_EMAIL}: ${userId} `}</Text>
          <Button title={strings.LOGOUT} onPress={onLogOutHandler} />
        </View>
      ) : (
        <View>
          <Text>{strings.APP_SEE}</Text>
          <Button title={strings.LOGIN} onPress={onLogInhandler} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({

// });
