import { StyleSheet } from 'react-native';

export const TaskForm = StyleSheet.create({
   /* container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginTop:32,
        marginLeft:10,
        marginRight:10,
        borderColor: '#a86556',
        borderCurve:'circular',
      },*/
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
      selectDate:{
        marginTop:20,
        marginBottom:20,
        borderStyle:'solid',
        borderBottomWidth:1,
        borderColor:'gray',
        borderRadius:5,
      },

      buttonText:{
        color:'rgba(187, 123, 107, 1)',
        fontSize: 16,
        fontWeight:'bold',
        
      },
      input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        marginTop:40,
        paddingHorizontal: 10,
      },
      memberInfo: {
       marginTop:-70,
        color:'black',
      },
      memberInfoTitle: {
        
        fontSize: 16,
        fontWeight: 'bold',
        marginRight:190,
        color:'black',
      },
      CloseButton:{
        position: 'absolute',
        top: 80,
        right:15,
        padding: 5,
        borderRadius:10,
        backgroundColor: 'rgba(187, 123, 107, 0.6)',
    
      },
});
