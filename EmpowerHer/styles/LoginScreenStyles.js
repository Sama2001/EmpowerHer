import { StyleSheet } from 'react-native';

export const loginScreenStyles = StyleSheet.create({
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
  title: {
    fontFamily: 'Arial', // Change font family
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginBottom: 40,
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
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }], // Center vertically
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
    color: '#fff',
    textTransform: 'uppercase', // Uppercase button text
  },
});
