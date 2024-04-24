// HomeScreenStyles.js

import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: 'hsla(0, 15%, 90%, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)', 
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 130,
    marginLeft:130,
    marginBottom:80,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6b6c6e',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff', 
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop:10,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -150,
    marginBottom:70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  Alogo: {
    marginBottom:100,
    width: 250,
    height: 250,
  },
});
