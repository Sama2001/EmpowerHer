import { StyleSheet } from 'react-native';

export const signupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  icon: {
    position: 'absolute',
    left: 10,
  },
  inputContainer: {
    backgroundColor: '#ffff',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
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
