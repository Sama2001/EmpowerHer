import { StyleSheet } from 'react-native';

export const AddCartScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
