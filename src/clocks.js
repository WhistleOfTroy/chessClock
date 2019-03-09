import React, { Component } from 'react';
import { AppRegistry,TouchableHighlight, TextInput, Button, Modal, Text, View } from 'react-native';

const Styles = {
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
    toolbarItem:{
        transform: [{ rotate: '90deg' }],
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    mainClockContainer: {
        flex: 6,
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
}
class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = { minutes: 10, configureModalVisible: false, isBlackRunning:false,isWhiteRunning:false,isStarted:false, blackSeconds: 600,whiteSeconds: 600 };
        
        this.setConfig = () => {
            this.setState({
                configureModalVisible: false,
                isStarted: false,
                isBlackRunning: false,
                isWhiteRunning:false,
                blackSeconds: this.state.minutes*60,
                whiteSeconds: this.state.minutes*60
            })
        };

        this.openModal = () => {
            this.setState({
                configureModalVisible: true,
            })
        };

        this.closeModal = () => {
            this.setState({
                configureModalVisible: false,
            })
        }

        this.restart = () => {
            this.setState({
                isStarted: false,
                isBlackRunning: false,
                isWhiteRunning:false,
                blackSeconds: this.state.minutes*60,
                whiteSeconds: this.state.minutes*60
            })
        };

        this.pause = () => {
            this.setState({
                isStarted: false
            })
        }
        
        this.change = () => {
            if(!this.state.isStarted && this.state.isWhiteRunning){
                this.setState({
                    isStarted: true,
                    isBlackRunning: false,
                    isWhiteRunning:true
                })
            }
            else if(!this.state.isStarted && !this.state.isWhiteRunning) {
                this.setState({
                    isStarted: true,
                    isBlackRunning: true,
                    isWhiteRunning:false
                })
            }
            else if(this.state.isBlackRunning && this.state.blackSeconds != 0) {
                this.setState({
                    isBlackRunning: false,
                    isWhiteRunning:true
                })
            }
            else if (this.state.isWhiteRunning && this.state.whiteSeconds != 0){
                this.setState({
                    isBlackRunning: true,
                    isWhiteRunning:false
                }) 
            }
            else {
                this.setState({
                    isBlackRunning: false,
                    isWhiteRunning:false
                })
            }
        }
        this.formatTimeToHumanFriendly = function (time) {
            minutes = Math.floor(time / 60, 1);
            if (minutes < 10) { minutes = '0' + minutes }
            seconds = Math.floor(time % 60, 1);
            if (seconds < 10) { seconds = '0' + seconds }
            return (minutes + ':' + seconds)
        }
        // Toggle the state every second
        setInterval(() => (
            this.setState(previousState => (
                { isStarted: previousState.isStarted, }
            ))
        ), 100);
    }
    render(){
        this.whiteSeconds = this.state.whiteSeconds;
        this.blackSeconds = this.state.blackSeconds;
        if(this.state.configureModalVisible) {
            return (
                <View style={Styles.mainContainer}>
                <Modal onRequestClose={() => { this.closeModal() }}>
                    <Text> Enter time for chess clock: </Text>
                    <TextInput style={{height: 40}}
                    placeholder="Minutes"
                    keyboardType="numeric"
                    onChangeText={(minutes) => this.setState({minutes})}/>
                    <Button onPress={()=> {this.setConfig()}} title='Set time'> </Button>
                </Modal>
                </View>
            )
        }
        if(!this.state.isStarted) {
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);
        }
        else if(this.state.isStarted && this.state.isWhiteRunning && this.state.whiteSeconds != 0) {
            this.state.whiteSeconds = this.state.whiteSeconds - 1;
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);
        }
        else if(this.state.isStarted && this.state.isStarted && this.state.isBlackRunning && this.state.blackSeconds != 0) {
            this.state.blackSeconds = this.state.blackSeconds - 1;
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);
        }
        return (
        <View style={Styles.mainContainer}>
        <View style={Styles.toolbar}>
        <Text style={Styles.toolbarItem} onPress={() => { this.restart() }}>RESTART</Text>
        <Text style={Styles.toolbarItem} onPress={() => { this.pause() }}>PAUSE</Text>
        <Text style={Styles.toolbarItem} onPress={() => { this.openModal() }}>CONFIGURE</Text>
        </View>
            <View style={Styles.mainClockContainer} >
                <View style={Styles.whiteClockContainer}>
                    <Text onPress={() => { this.change() }} style={Styles.whiteClock}>  {this.whiteTime}</Text>
                </View>
                <View style={Styles.blackClockContainer}>
                    <Text onPress={() => { this.change() }} style={Styles.blackClock}>
                   {this.blackTime}
                    </Text>
                </View>
            </View>

        </View>
        )
       
    }
}
export default class BlackClock extends Component {
    render() {
        return (
        <Countdown/>
        );
    }

}