import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, Picker, Image, Item, TextInput, Modal, Text, View, Button } from 'react-native';
import Styles from './styles.js';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = { inputMinutes: 10, inputSeconds: 0, incrementTime: 0, configureModalVisible: false, isBlackRunning: false, isWhiteRunning: false, isStarted: false, blackSeconds: 600, whiteSeconds: 600 };

        this.setConfig = () => {
            this.state.inputMinutes = parseInt(this.state.inputMinutes, 10);
            this.state.inputSeconds = parseInt(this.state.inputSeconds, 10);
            time = this.state.inputMinutes * 60 + this.state.inputSeconds
            if(!isNaN(this.state.inputMinutes) && !isNaN(this.state.inputSeconds) && !isNaN(this.state.incrementTime)){
            this.setState({
                configureModalVisible: false,
                isStarted: false,
                isBlackRunning: false,
                isWhiteRunning: false,
                blackSeconds: time,
                whiteSeconds: time,
                incrementTime: this.state.incrementTime
            })
        }
        };

        this.openModal = () => {
            this.setState({
                configureModalVisible: true,
                inputMinutes: 0,
                inputSeconds: 0
            })
        };

        this.closeModal = () => {
            this.setState({
                configureModalVisible: false,
            })
        }

        this.restart = () => {
            this.state.inputMinutes = parseInt(this.state.inputMinutes, 10);
            this.state.inputSeconds = parseInt(this.state.inputSeconds, 10);
            time = this.state.inputMinutes * 60 + this.state.inputSeconds
            this.setState({
                isStarted: false,
                isBlackRunning: false,
                isWhiteRunning: false,
                blackSeconds: time,
                whiteSeconds: time
            })
        };

        this.pause = () => {
            this.setState({
                isStarted: false
            })
        }

        this.change = () => {
            this.state.incrementTime = parseInt(this.state.incrementTime, 10)
            if (!this.state.isStarted && this.state.isWhiteRunning) {
                this.setState({
                    isStarted: true,
                    isBlackRunning: false,
                    isWhiteRunning: true,
                })
            }
            else if (!this.state.isStarted && !this.state.isWhiteRunning) {
                this.setState({
                    isStarted: true,
                    isBlackRunning: true,
                    isWhiteRunning: false
                })
            }
            else if (this.state.isBlackRunning && this.state.blackSeconds > 0) {
                this.setState({
                    isBlackRunning: false,
                    blackSeconds: this.state.blackSeconds + this.state.incrementTime,
                    isWhiteRunning: true
                })
            }
            else if (this.state.isWhiteRunning && this.state.whiteSeconds > 0) {
                this.setState({
                    isBlackRunning: true,
                    isWhiteRunning: false,
                    whiteSeconds: this.state.whiteSeconds + this.state.incrementTime
                })
            }
            else {
                this.setState({
                    isBlackRunning: false,
                    isWhiteRunning: false
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
    render() {
        this.whiteSeconds = this.state.whiteSeconds;
        this.blackSeconds = this.state.blackSeconds;
        if (this.state.configureModalVisible) {
            return (
                <View style={Styles.mainContainer}>
                    <Modal onRequestClose={() => { this.closeModal() }}>
                        <View style={Styles.configureModal}>
                            <Image style={Styles.chessClockImage} source={require('./../assets/chess-clock-white.png')} />
                            <Text style={Styles.modalText}> Enter time for chess clock: </Text>
                            <View style={Styles.modalInputView}>

                                <TextInput style={Styles.modalInputText}
                                    placeholder="00"
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={(inputMinutes) => this.setState({ inputMinutes })} />

                                <Text style={Styles.modalInputText}> : </Text>

                                <TextInput style={Styles.modalInputText}
                                    placeholder="00"
                                    keyboardType="numeric"
                                    maxLength={2}
                                    onChangeText={(inputSeconds) => this.setState({ inputSeconds })} />

                            </View>
                            <Text style={Styles.modalText}>Increment time:</Text>
                            <View stle={Styles.modalInputView}>
                                <TextInput style={Styles.modalInputText}
                                    placeholder='0 seconds'
                                    keyboardType='numeric'
                                    maxLength={3}
                                    onChangeText={(incrementTime) => this.setState({ incrementTime })} />
                            </View>
                            <Button type='outline' color="grey" onPress={() => { this.setConfig() }} title='Set time'> </Button>
                        </View>
                    </Modal>
                </View>
            )
        }
        if (!this.state.isStarted) {
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);

        }
        else if (this.state.isStarted && this.state.isWhiteRunning && this.state.whiteSeconds > 0.1) {
            this.state.whiteSeconds = this.state.whiteSeconds - 0.1;
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);
        }
        else if (this.state.isStarted && this.state.isStarted && this.state.isBlackRunning && this.state.blackSeconds > 0.1) {
            this.state.blackSeconds = this.state.blackSeconds - 0.1;
            this.whiteTime = this.formatTimeToHumanFriendly(this.state.whiteSeconds);
            this.blackTime = this.formatTimeToHumanFriendly(this.state.blackSeconds);
        }
        return (
            <View style={Styles.mainContainer}>
                <View style={Styles.toolbar}>
                    <TouchableHighlight activeOpacity={1} onPress={() => { this.restart() }}>
                        <Image style={Styles.toolbarImage} source={require('./../assets/restart.png')}>
                        </Image>
                    </TouchableHighlight>

                    <TouchableHighlight activeOpacity={1} onPress={() => { this.pause() }}>
                        <Image style={Styles.toolbarImage} source={require('./../assets/pause.png')}>
                        </Image>
                    </TouchableHighlight>

                    <TouchableHighlight activeOpacity={1} onPress={() => { this.openModal() }}>
                        <Image style={Styles.toolbarImage} source={require('./../assets/configure.png')}>
                        </Image>
                    </TouchableHighlight>

                </View>
                <TouchableHighlight activeOpacity={1} onPress={() => { this.change() }}>
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
                </TouchableHighlight>


            </View>
        )

    }
}
export default class BlackClock extends Component {
    render() {
        return (
            <Countdown />
        );
    }

}