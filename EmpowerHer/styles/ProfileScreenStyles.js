import { StyleSheet } from 'react-native';

export const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intbutton:{

    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    marginBottom:15,
    marginRight:120,
    width: 220,
    alignItems: 'center',
    color:'black',
  },
  intbuttonText:{
    fontSize: 16,
    fontWeight: '500',
    color: 'black',

  },

  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 50,
    top: 480,
  },
  eyeIcon1: {
    position: 'absolute',
    right: 50,
    top: 540,
  },
  
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 10,
    padding: 12,
    marginTop: 50,
    width: 210,
    alignItems: 'center',
    borderRadius: 50,
    color:'black',
  },
  button2: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    width: 210,
    alignItems: 'center',
    borderRadius: 50,
    color:'black',
  },

  button1: {
    backgroundColor: 'rgba(187, 123, 107, 0.5)',
    padding: 12,
    marginTop: 5,
    marginBottom:20,
    marginRight:145,
    width: 180,
    alignItems: 'center',
    borderRadius: 5,

  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
  buttonText1: {
    fontSize: 15,
    color: 'black',

  },
  text: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
    marginRight:160,
    marginBottom:10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    marginTop:-45,
  },
});
