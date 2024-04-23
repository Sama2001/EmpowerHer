// GoogleSignIn.js
import React from 'react';
import { Button } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

export default function GoogleSignIn() {
    const [firstName , setFirstName]=React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: '55269184028-f6oopb7bk04spr4p7ns05at5arfadl6t.apps.googleusercontent.com',
     /* scopes: ['openid', 'profile', 'email'],
      redirectUri: 'http://localhost:8081',*/
    },
    Google
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
      // You can handle the authentication response here
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Sign in with Google"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
