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
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a86556',
    marginBottom: 80,
    marginTop: -100,
  },
  inputContainer: {
    backgroundColor: '#ffff',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 40,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
});
