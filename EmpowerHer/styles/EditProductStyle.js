import { StyleSheet } from 'react-native';

export const EditProductScreenStyles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 4,
    borderRadius: 30,
    margin: 5,
    borderColor: '#a86556',
  },

  title: {
    fontSize: 24,
    marginTop:-50,
    marginBottom: 70,
    color:'black',
},

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '90%',
  },
 
  label:{
width:200,
fontSize:16,
   marginRight: 115,
   color:'#a86556',
   fontWeight:'bold',
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 8,
    padding: 12,
    marginTop: 60,
    width: 250,
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
  currency: {
    fontSize: 16, // Adjust size as needed
    
  },
  });