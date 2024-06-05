import { StyleSheet } from 'react-native';

export const AddProductScreenStyles = StyleSheet.create({
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
          marginBottom: 10,
          borderRadius: 5,
          width: '100%',
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
    
      imagePreview: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: 10,
      },
      image: {
          width: 100,
          height: 100,
          margin: 5,
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
      Button: {
        backgroundColor: '#ffff',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        //marginRight:100,
        width: 250,
        alignItems: 'center',
        borderColor:'rgba(187, 123, 107, 0.79)',
        borderWidth:1,
        //borderRadius: 50,
      },
      ButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgba(187, 123, 107, 0.79)',
      },
});
