import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { requestSignOut } from '@src/apis';
import { Button } from '@src/components/atoms';
import { strings } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
import { userState } from '@src/services/recoil';

const HomeScreen: React.FC = function HomeScreen() {
  const [user, setUser] = useRecoilState(userState);
  const { navigate } = useScreenNavigation();

  const signOut = () => {
    requestSignOut().catch(() => {});
    setUser(null);
    navigate('SignIn');
    AsyncStorage.removeItem('user').catch(() => {});
  };

  const goSignIn = () => navigate('SignIn');

  return (
    <SafeAreaView>
      <Text>{user ? user.user_eml_addr : strings.BROWSE_APP}</Text>
      <Button onPress={user ? signOut : goSignIn}>
        {user ? strings.SIGNOUT : strings.SIGNIN}
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
