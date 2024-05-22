// ManagerScreen.styles.js

import { StyleSheet ,Dimensions} from 'react-native';

export const Manager = StyleSheet.create({

  modalMemberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Closebutton:{
    position: 'absolute',
    top: 80,
    right: -85,
    padding: 5,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },

  CloseButton:{
    position: 'absolute',
    top: 60,
    right: -5,
    padding: 5,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },
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
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: 350, // Ensure enough width to fit buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between buttons
    marginTop: 10, // Optional: add margin at the top
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

  Approve: {
    height:40,
    width:100,
    backgroundColor: 'rgba(187, 129, 107, 0.79)',
    borderRadius: 2,
    alignItems: 'center',
   // marginTop:20,
    paddingTop:7,

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

  
  Reject: {
    height:40,
    width:100,
    backgroundColor: 'grey',
    borderRadius: 2,
    alignItems: 'center',
   // marginTop:60,
    paddingTop:7,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  noTasksText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  }, 
  buttonText:{
    paddingTop:5,
fontWeight:'bold',
  },
});
