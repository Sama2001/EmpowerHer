import { StyleSheet } from 'react-native';

export const signupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 30,
    margin: 5,
    borderColor: '#a86556',
  },
  eyeIcon: {
    position: 'absolute',
    right: 13,
    top: 10,
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 1)',
    borderRadius: 25, // Rounder button shape
    paddingVertical: 10,
    paddingHorizontal: 60,
    width: '70%',
    marginTop: 35,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8, // Add border radius
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 40,
  },
  title: {
    color: '#6b6c6e',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -60,
    marginBottom: 50,
  },
});
