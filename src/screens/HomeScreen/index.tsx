import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { Button } from '@src/components/atoms';
import { strings } from '@src/constants';
import { useScreenNavigation } from '@src/navigations/hooks';
import { userState } from '@src/services/recoil';

const HomeScreen: React.FC = function HomeScreen() {
  const [user, setUser] = useRecoilState(userState);
  const { navigate } = useScreenNavigation();

  const signOut = () => {
    setUser(null);
    navigate('SignIn');
  };

  return (
    <SafeAreaView>
      <Text>{user ? user.id : strings.BROWSE_APP}</Text>
      {user && <Button onPress={signOut}>로그아웃</Button>}
    </SafeAreaView>
  );
};

export default HomeScreen;
