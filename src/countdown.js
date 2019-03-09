import React from 'react'
import {
    View,
    Image,
    Animated,
    TouchableOpacity,
    Button,
    Platform,
    ScrollView,
    Text,
    TextInput,
    Dimensions
} from 'react-native'

const Styles = {
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'space-around'
    },
    container: {
        flex: 1,
        borderWidth: 0
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        borderWidth: 0
    },
    countdown: {
        fontSize: 20
    },
    errorMessage: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
    timeInput: {
        flex: 0.8,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'stretch',
        borderWidth: 1
    }
};

export default class CountdownTimer extends React.Component {
    static get defaultProps() {
        return{
            invalidTimeError: 'Please set a time to begin a countdown',
            countdownCompleteMessage: 'Times up!',
            vibrateOnComplete: true,
            startButtonTitle: 'Start',
            startButtonColor: '#25b31d',
            startButtonLabel: 'Press to start',
            pauseButtonTitle: 'Pause',
            pauseButtonColor: '#ada2a2',
            pauseButtonLabel: 'Press to pause',
            resetButtonTitle: 'Reset',
            resetButtonColor: '#ff0101',
            resetButtonLabel: 'Press to reset'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            seconds: '',
            timer: null,
            startButton: true,
            pauseButton: false,
            resetButton: true
        };
        this.renderCountdown = this.renderCountdown.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
    }

    start() {
        this.log('render countdown');
        let _this = this;
        if (this.state.seconds <= '0' || !this.state.seconds) {
            this.setState({
                errorMessage: this.props.invalidTimeError
            });
        } else {
            this.setState({
                pauseButton: true
            }, () => {
                _this.renderCountdown();
            });
        }
    }

    pause() {
        this.log('pause');
        let _this = this;
        this.setState({
            pauseButton: false
        }, () => {
            clearInterval(_this.state.timer);
        });
    }

    reset() {
        this.log('reset');
        let _this = this;
        this.setState({
            seconds: '',
            pauseButton: false
        }, () => {
            clearInterval(_this.state.timer);
        });

    }

    /**
     * Renders button into view if state condition is true
     * @param title
     * @param color
     * @param label
     * @param callback
     * @param state
     * @returns {*}
     */
    renderButton(title, color, label, callback, state) {
        return (
            <Button
                onPress={() => callback()}
                title={title}
                color={color}
                accessibilityLabel={label}
                disabled={!state}
            />
        )
    }

    renderCountdown() {
        this.log('render countdown');
        this.log('seconds: ' + this.state.seconds);
        let interval = 1000,
            duration = this.state.seconds * interval,
            _this = this;
        let timer = setInterval(() => {
            duration = duration - interval;
            _this.setState({
                seconds: ''+duration / 1000+'',
                timer: timer
            });
            if (duration <= 1) {
                _this.setState({
                    seconds: '',
                    timer: null
                }, () => {
                    clearInterval(timer);
                });
            }
        }, interval);
    }

    renderError() {
        let errorMessage = this.state.errorMessage;
        if (!errorMessage) {
            return null;
        }

        return (
            <Text style={Styles.errorMessage}>
                {errorMessage}
            </Text>
        )
    }

    log(log) {
        if (__DEV__) {
            console.log(log);
        }
    }

    render () {
        return (
            <View style={Styles.mainContainer}>
                <ScrollView
                    style={Styles.container}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps="always">
                    <View style={Styles.container}>
                        {this.renderError()}
                    </View>
                    <View style={Styles.rowContainer}>
                        <TextInput
                            style={Styles.timeInput}
                            keyboardType='numeric'
                            placeholder='0'
                            maxLength={5}
                            value={this.state.seconds}
                            onChangeText={(seconds) => {
                                let errorMessage = (seconds) ? '' : this.state.errorMessage;
                                this.setState({
                                    seconds: seconds,
                                    errorMessage: errorMessage
                                })
                            }}
                        />
                    </View>
                    <View style={Styles.rowContainer}>
                        {this.renderButton(
                            this.props.startButtonTitle,
                            this.props.startButtonColor,
                            this.props.startButtonLabel,
                            this.start,
                            this.state.startButton
                        )}
                        {this.renderButton(
                            this.props.pauseButtonTitle,
                            this.props.pauseButtonColor,
                            this.props.pauseButtonLabel,
                            this.pause,
                            this.state.pauseButton
                        )}
                        {this.renderButton(
                            this.props.resetButtonTitle,
                            this.props.resetButtonColor,
                            this.props.resetButtonLabel,
                            this.reset,
                            this.state.resetButton
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}