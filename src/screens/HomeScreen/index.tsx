import { Button, Text, View } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState } from '../../reducer';
import { UserData } from '../../action/type';
import { logoutUser } from '../../action/userAction';
import { useScreenNavigation } from '../../navigations/hooks';

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    AsyncStorage.getItem('userId');
    if (userData) {
      setUserId(userData.email);
    }
  }, [userData]);

  const onLogOutHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    AsyncStorage.removeItem('userId');
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  const onLogInhandler = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <Text>HomePage</Text>
      {userData ? (
        <View>
          <Text>ID: {userId} </Text>
          <Button title="LogOut" onPress={onLogOutHandler} />
        </View>
      ) : (
        <View>
          <Text>앱 둘러보기</Text>
          <Button title="LogIn" onPress={onLogInhandler} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({

// });
