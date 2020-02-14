import React from 'react';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Repository({ route, navigation }) {
  const { repository } = route.params;

  return <WebView style={{ flex: 1 }} source={{ uri: repository.html_url }} />;
}
