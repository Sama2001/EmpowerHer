import { StyleSheet } from 'react-native';

export const CartScreenStyles = StyleSheet.create({
    container: {
        padding: 16,
        height:1000,
        backgroundColor: '#fff',
        alignItems: 'center', // Center align the content
        height:1300,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color:'#a86556',
    },
    itemContainer: {
     
        borderWidth:2,
        marginBottom: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        width: '100%', // Make sure item containers take full width
        alignItems: 'center',
        borderColor: '#a86556',

    },
    itemDetails: {
        flexDirection: 'column',
        alignItems: 'flex-start', // Ensure alignment to the start

      },
    image: {
        width: 230,
        height: 230,
        marginBottom: 10,
        borderRadius: 8,
    },
  
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Ensure the buttons take full width
        paddingHorizontal: 50, // Add padding to evenly space the buttons
        marginTop: 10,
    },
    navButtonContainer: {
        flex: 1, // Each button container takes half of the space
        alignItems: 'flex-start', // Align the "Previous" button to the start
        bottom:130,
    },
    navButtonContainer1: {
        flex: 1, // Each button container takes half of the space
        alignItems: 'flex-end', // Align the "Previous" button to the start
        bottom:130,

    },
    navButton: {
        padding: 10,
    },
    
    itemText: {
        fontSize: 16,
        marginBottom: 10,
    },
    itemNameText: {
        fontWeight:'bold',
        fontSize: 16,
        marginBottom: 7,
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
    },
    emptyCartContainer: {
        height:750,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCartImage: {
        width: 270,
        height: 270,
        marginBottom:290,
        marginTop:-70,
        resizeMode: 'contain',
    },
    emptyCartText: {
        fontSize: 20,
        marginTop: -250,
    },
    Button: {
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        //marginRight:100,
        width: 100,
        alignItems: 'center',
        borderColor:'rgba(187, 123, 107, 0.79)',
        borderWidth:1,
        //borderRadius: 50,
      },

      Button1: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom:10,
        width: 270,
        marginLeft:80,

        alignItems: 'center',
        borderColor:'rgba(187, 123, 107, 0.79)',
        borderWidth:1,
        //borderRadius: 50,
      },
      quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      quantityButton: {
        padding: 8,
      },
      quantityText: {
        fontSize:18,
        //marginHorizontal: 8,
        marginBottom:10,
      },
    
    quantityButton: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 2,
        paddingVertical: 3,
        marginHorizontal: 10,
        marginBottom:10,
    },
      ButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
      },

      container1:{
        backgroundColor: 'rgba(187, 123, 107, 0.79)',
         width:420,
         borderTopLeftRadius:20,
         borderTopRightRadius:20,

      },
});
