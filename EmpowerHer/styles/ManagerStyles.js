// ManagerScreen.styles.js

import { StyleSheet ,Dimensions} from 'react-native';

export const Manager = StyleSheet.create({
  container:{
     flex: 1,
     backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth: 3,
     borderRadius: 30,
     margin: 5,
     borderColor: '#a86556',
     height:800,
   },
  modalMemberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  
  Closebutton:{
   
    padding: 5,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },
  closeButtonContainer: {
    position: 'absolute',
    top: 60, // Adjust as needed
    left: 350, // Adjust as needed
  },
  closeButtonContainer1: {
    position: 'absolute',
    top: 60,
    right:25,
  },
  closeButtonContainer2: {
    position: 'absolute',
    top:50,
    right:25,
  },
  CloseButton:{
    
    padding: 3,
    borderRadius:10,
    backgroundColor: 'rgba(187, 123, 107, 0.6)',

  },

  MemeberformContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: 350,
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
    width:350,
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 10,
    alignItems: 'center',
    marginTop:35,
    paddingTop:12,

  },

  Picbutton: {
    height:50,
    width:250,
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:10,
    marginBottom:20,
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

 

  button1: {
    height:50,
    width:250,
    backgroundColor: 'grey',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:15,
    paddingTop:8,
  },

  Approve1: {
    height:40,
    width:100,
    backgroundColor: 'rgba(187, 129, 107, 0.79)',
    borderRadius: 2,
    alignItems: 'center',
    paddingTop:7,
    //marginLeft:-1,
    marginRight:-70,

  },

   Reject1: {
    height:40,
    width:100,
    backgroundColor: 'grey',
    borderRadius: 2,
    alignItems: 'center',
    marginRight:10,

   // marginTop:60,
    paddingTop:7,
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
    fontWeight:'bold',

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
   marginTop:30, 
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
fontWeight:'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 500,
    height: '100%',
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
    paddingTop:3,
fontWeight:'bold',
fontSize:17,
color:'white',
  },
  membersTitle:{ 
    fontWeight:'bold',
    fontSize: 25,
    color: '#a86556',
    paddingTop:50,
    textAlign: 'center',

   
  backgroundColor:'white',
  
  },
  oppTitle:{ 
    fontWeight:'bold',
    fontSize: 25,
    color: '#a86556',
    paddingTop:60,
    textAlign: 'center',

   
  backgroundColor:'white',
  
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginBottom:10,
  },
  address: {
    fontSize: 16,
    color: 'black',
    marginBottom:10,

  },
  mobileNumber: {
    fontSize: 16,
    color: 'black',
marginBottom:10,
  },
});
