import { StyleSheet } from 'react-native';

export const StoreScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
        //alignItems: 'center',
        //justifyContent: 'center',
       // paddingHorizontal: 20,
        borderWidth: 4,
        borderRadius: 30,
        margin: 5,
        borderColor: '#a86556',
      },
      editButtonContainer: {
        position: 'absolute',
        //top: 0,
        right: 2,
        zIndex: 1, // Ensure the dropdown is above other content
      },
      editButton: {
        position: 'absolute',
        top: -35,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
      },
      editButtonText: {
        fontSize: 30,
      },
    
      dropdown: {
        //position: 'absolute',
        top: '5%',
        right: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        zIndex: 1,
      },
      dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      
      Button: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        borderTopLeftRadius:45,
        padding: 10,
        marginTop:-1,
        marginLeft:-3,
        //marginRight:100,
        borderLeftWidth:2,
        width: 150,
        alignItems: 'center',
        borderColor:'rgba(187, 123, 107, 0.79)',
        borderWidth:1,
        //borderRadius: 50,
      },
      ButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgba(187, 123, 107, 1)',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    
      },
    
      columnWrapper: {
        justifyContent: 'space-between', // This adds space between the columns
    },
    
    productContainer: {
        flex: 1,
        margin: 5, // Add margin to ensure space between items
        marginTop:10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    soldOutLabel: {
      color: 'red',
      fontWeight: 'bold',
      position: 'absolute', // Ensure the label is positioned correctly
      top: 10,
      left: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add some background to make it stand out
      padding: 5,
      borderRadius: 5,

  },
});
