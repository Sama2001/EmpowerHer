import { StyleSheet } from 'react-native';

export const firstPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',

  },
  scrollViewContent: {
   flexGrow: 1,

  },
  scrollView: {
   flex: 1, // Make the ScrollView take up the entire available space

  },
  aboutSection: {
    margin: 20,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  aboutIcon: {
    marginRight: 10,
  },
  aboutText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  container1: {
    marginTop:50,
    marginHorizontal:10,
    height:200,
    backgroundColor: '#fff',
    borderWidth:1,
    borderRadius:20,
  },
  contentContainer: {
    marginBottom: 20, // Add some bottom margin for spacing
  },
  section: {

    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: '#a86556',
    width: 150,
    zIndex: 2,
  },
  MemberButton: {
    
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#a86556',
    width: 150,
    marginTop:120,
    zIndex: 2,
  },
  OpButton: {
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#a86556',
    width: 150,
    marginTop:220,
    zIndex: 2,
  },
  TasksButton: {
    flexDirection: 'row',
    top: -310,
    left: -20,
    padding: 10,
    borderRadius: 10,
   // borderBottomWidth: 1,
    borderColor: '#a86556',
    //width: 150,
    marginTop:75,
    zIndex: 2,
  },

  StoreButton: {
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#a86556',
    width: 150,
    marginTop:320,
    zIndex: 2,
  },
  logout: {
    position: 'absolute',
    top: 70,
    left: 5,
    padding: 10,
    borderColor: '#a86556',
    width: 150,
    marginTop:500,
    zIndex: 2,
  },

  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 15,
    marginLeft: -1,
    marginRight: 6,

  },
 
  menuIconContainer: {
    position: 'absolute',
    top: 8,
    left: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 18,
  },
  iconContainer: {
    position: 'relative',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  cartIconContainer: {
    alignItems: 'flex-end',
    top: 20,
    right:50,

  },
  ChaticonContainer:{
    alignItems: 'flex-end',
    
    top: 20,
    right:30,
  },

  NotiiconContainer:{
    top: 20,
    right:10,
  },
  notification: {
    position: 'absolute',
    top: -8, // Adjust this value to position the notification correctly
    right: -8, // Adjust this value to position the notification correctly
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
notificationText: {
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
},
additionalContainer: {
  borderRadius:100,
  height:250,
  //width:420,
  padding: 20,
  //backgroundColor: '#f0f0f0',
  backgroundColor: 'rgba(187, 123, 107, 0.25)',

  borderRadius: 10,
  marginBottom: 20,
  marginTop:20,
  marginHorizontal:1,
},
additionalText: {
  fontSize: 16,
  lineHeight: 24,
  marginBottom: 20,
},


membershipButton: {
  backgroundColor: '#a86556',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
},
membershipButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

contentSection: {
  //marginTop:50,
    marginHorizontal:10,
    height:220,
    backgroundColor: '#fff',
    borderWidth:1,
    marginBottom:70,
    //borderRadius:20,
},
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  marginLeft:10,
  marginTop:5,
},
sectionText: {
  marginLeft:10,
  fontSize: 16,
  marginBottom: 20,
},
button: {
  backgroundColor: '#a86556',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginLeft:5,
  marginRight:5,
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

empowerHerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:-25,
  marginTop:20,
},
empowerHerText: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#a86556',
  //textTransform: 'uppercase',
  letterSpacing: 1,
  // Add any other styles you want to customize
},
  menuContainer: {
    height:820,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth:2,
    borderColor:'lightgrey',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    //zIndex: 0,
  },
  menuItemText: {
    fontSize: 17,
    // Other styles for menu item text
  },
  PmenuItemText: {
    fontSize: 17,
    fontWeight:'bold',
    // Other styles for menu item text
  },
 
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginVertical: 10,
    paddingHorizontal: 15,
    marginBottom:3,
    //marginLeft:10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    //width:200,
  },
  greetingText: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  toggleEventsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  eventList: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  eventContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  eventDescription: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventMaxAttendance: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  toggleEventsButton: {
    backgroundColor: '#a86556',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -50,
    marginBottom:100,
    marginLeft:15,
    width:380,
  },
  toggleEventsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
  },
  modalContainer: {
    marginTop:70,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
   modalImageList: {
    width: '100%',
  },
  modalImageItem: {
    width: 200,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  attendButton: {
    backgroundColor: '#a86556',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop:50,
    width:120,
  },
  attendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
