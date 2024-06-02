import { StyleSheet } from 'react-native';

export const Membership = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    borderColor: '#a86556',
    //height:2000,

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#a86556',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#6b6c6e',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 120,
  },
  button: {
    backgroundColor: 'rgba(187, 123, 107, 0.79)',
    borderRadius: 8,
    padding: 12,
    marginBottom:10,
    alignItems: 'center',
  },
  button1: {
    height:35,
    width:130,
    marginBottom:10,
    backgroundColor: 'grey',
    borderRadius: 8,
    paddingLeft:17,
    paddingTop:10,
  },
  buttonText1: {
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  input1: {
    flexDirection: 'row', // Aligns items in a row
    alignItems: 'center', // Aligns items along the cross axis (vertical)
    justifyContent: 'center', // Aligns items along the main axis (horizontal)
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
},
  categoryText: {
    color: 'black', 
    marginRight: 'auto',
},
defaultCategoryText: {
    color: 'gray', 
},
  arrowIcon: {
    marginLeft: 217, // Adjust this value as needed for spacing between text and icon
},
  dropdown: {
    top: -1, // Adjust this value to position the dropdown list below the button
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: 90, // Set the maximum height for the dropdown
    borderRadius: 5,
    elevation: 5,
},
dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    width: '100%',
    marginLeft:5,
},

});

