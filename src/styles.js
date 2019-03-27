import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'pink',
        justifyContent: "center",
        alignContent: "center"
    },
    toolbar:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: "space-evenly",
        alignContent: "stretch",
        alignItems: "center"
    },
    toolbarImage:{
        width: 30,
        height: 30
    },
    toolbarItem:{
        transform: [{ rotate: '90deg' }],
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    configureModal:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'black',
        justifyContent: "space-evenly",
        alignContent: "stretch",
        alignItems: "center",
        textAlign: 'center'
    },
    modalText:{
        height:30,
        fontSize:20,
        fontWeight: 'bold',
        color:'white'
    },
    chessClockImage:{
        width: 150,
        height: 100
    },
    modalInputView:{
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: 'center',
    },
    modalInputText:{
        fontSize:25,
        fontWeight: 'bold',
        color:'white'
    },
    mainClockContainer: {
        flex: 8,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: "center",
        alignItems: "stretch"
    },
    whiteClockContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    whiteClock: {
        color: 'black',
        textAlignVertical: 'center',
        fontSize: 100,
        transform: [{ rotate: '90deg' }]
    },
    blackClockContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center"
    },
    blackClock: {
        color: 'white',
        textAlignVertical: 'center',
        fontSize: 100,
        transform: [{ rotate: '90deg' }]
    },
})