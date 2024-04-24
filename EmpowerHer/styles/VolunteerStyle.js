import { StyleSheet } from 'react-native';

export const VolunteerFormStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    borderColor: '#a86556',
  },
  title: {
    color:'#a86556',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginLeft:30,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
 
  label: {
    marginRight:250,
    marginTop:20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#6b6c6e',
  },
  button: {
  marginRight:250,

    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },

  Submitbutton: {
    width:150,
    marginTop:70,
    marginLeft:100,
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
