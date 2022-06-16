import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useScreenNavigation, useScreenRoute } from '@src/navigations/hooks';
import * as Styled from './styles';

const TermsScreen: React.FC = function TermsScreen() {
  const {
    params: { terms },
  } = useScreenRoute<'Terms'>();
  const navigation = useScreenNavigation();

  useEffect(() => {
    navigation.setOptions({ title: terms.clau_nm });
  }, [navigation, terms.clau_nm]);

  const insertMetaViewport = (html: string) => {
    return html.replace(
      '<head>',
      '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">',
    );
  };

  return (
    <Styled.SafeAreaView>
      <WebView source={{ html: insertMetaViewport(terms.clau_ctts) }} />
    </Styled.SafeAreaView>
  );
};

export default TermsScreen;
