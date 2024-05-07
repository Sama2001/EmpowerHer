// ManagerScreen.styles.js

import { StyleSheet } from 'react-native';

export const Manager = StyleSheet.create({

  container:{
    flexGrow: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  formContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: 250,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  opportunityContainer: {
    marginTop:10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or any other alignment you prefer
    marginBottom: 20, // optional: adjust as needed
  },
  button: {
    height:50,
    width:250,
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:50,
    paddingTop:12,

  },

  Taskbutton: {
    height:30,
    width:100,
    backgroundColor: 'rgba(187, 129, 107, 0.79)',
    borderRadius: 2,
    alignItems: 'center',
    marginTop:20,
    paddingTop:7,

  },

  showButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  hideButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  button1: {
    height:50,
    width:250,
    backgroundColor: 'grey',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:15,
    paddingTop:8,
  },
  text:{
margin:7,
  },
  title:{
    fontWeight:'bold'

  },
  link:{
    margin:7,
color:'blue',
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logout:{
    width:150,
    flexDirection:'row',
   marginTop:50, 
   borderRadius:9,
   borderColor:'black',
   borderStyle:'solid',
   borderWidth:1,
   paddingLeft:20,
paddingVertical:8,
  },
  
  logoutText:{
    marginTop:7,
    marginRight:20, 
    paddingLeft:10,

  },
  buttonText:{
    paddingTop:5,
fontWeight:'bold',
  },
});
