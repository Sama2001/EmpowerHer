// HomeScreenStyles.js

import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 30,
    margin: 5,
    borderColor: '#a86556',
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 1)',
    borderRadius: 25, // Rounder button shape
    paddingVertical: 15,
    paddingHorizontal: 60,
    width: 300,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  buttonS: {
    borderRadius: 50,
    borderBottomWidth:1,
    borderColor:'rgba(187, 123, 107, 0.79)',
    paddingVertical: 5,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
  },
  buttonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(187, 123, 107, 0.79)', 
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
    marginTop: 50,
    fontSize: 16,
    color: '#6b6c6e',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase', 
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop:10,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: -100,
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
