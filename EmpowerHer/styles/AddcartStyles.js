import { StyleSheet } from 'react-native';

export const AddCartScreenStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'hsla(0, 15%, 100%, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderWidth: 4,
        borderRadius: 30,
        borderColor: '#a86556',

        margin: 5,
        height:700,
    },
    iconButton: {
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a86556',
       marginBottom:35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText1: {
        color: 'grey',
        fontWeight:'bold',
        fontSize: 16,
        marginRight:15,
    },
    plusIcon: {
        position: 'absolute',
        top: 5,
        right:2,
        fontSize: 16,
    },

    title: {
        fontSize: 24,
       // marginBottom: 10,
        marginTop:-50,
    },
    productImage: {
        borderTopRightRadius:10,
        borderTopLeftRadius:12,

        width: 320,
        height: 320,
        resizeMode: 'contain',
    },
    leftButton: {
        left: -20,
        top:170,

    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft:-100,
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius:20,
    },
    rightButton: {
        right: -20,
        top:170,
    },
    productImage: {
        width: 320,
        height: 320,
        marginBottom: 100,
    },
    buyButton: {
        backgroundColor: '#a86556',
        padding: 12,
        borderRadius: 5,
       marginTop:-20,
         width:300,
        marginBottom:50,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buyText:
    {
        fontSize:16,
        fontWeight:'bold',
        color:'white',
    },

    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,    
    },

    quantity: {
        fontSize: 16,
        marginBottom: 10,
        marginTop:-30,
    },
    quantityContainer: {
        flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
});
