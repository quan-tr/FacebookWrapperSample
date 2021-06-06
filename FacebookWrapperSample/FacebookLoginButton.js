import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, NativeModules, Button } from 'react-native';

const FacebookUtils  = NativeModules.FacebookUtils;

const globals = { 
    login: 'Login with Facebook',
    logout: 'Logout from Facebook'
};

export default class FacebookLoginButton extends Component {
    constructor (props) {
        super(props);

        console.log("FacebookLoginButton constructor");

        this.onLogin = this.onLogin.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            globals: globals,
            status: false,
            text: globals.login
        };
    }

    onLogin() {
        console.log("FacebookLoginButton onlogin");
        if (this.state.status)
            this.logout()
        else 
            this.login()
    }

    login() {
        console.log("FacebookLoginButton login");
        let permission = [];
        FacebookUtils.login(
            (err, data) => {
                this.handleLogin(err, data)
            }
        );
    }
    
    logout() {
        console.log("FacebookLoginButton logout");
        FacebookUtils.logout((err, data) => {
            this.setState({status:false, text: this.state.globals.login});
            this.handleLogin(err, data); 
        })
    }
    
    handleLogin(e, data) {
        console.log("FacebookLoginButton handlelogin 1");
        const result = e || data;
        if (result.profile) {
            console.log("FacebookLoginButton handlelogin 2");


            try {
                result.profile = JSON.parse(result.profile);
                this.setState({status: true, text: this.state.globals.lougout});
            } catch (e) {
                console.error(err);
            }
        }

        if (result.eventName && this.props.hasOwnProperty(result.eventName)) {
            console.log("FacebookLoginButton handlelogin 3");

            const event = result.eventName;
            delete result.eventName;
            this.props[event](result);
        }
    }

    render() {
        console.log("FacebookLoginButton render");
        const text = this.state.text;
        return (
            <TouchableHighlight onPress={this.onLogin} >
                <View style={[styles.button]}>
                    <Text style={[styles.whiteText]}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
 button: {
 padding: 10,
 alignItems: 'center',
 height: 45,
 backgroundColor: '#3B5998',
 },
 whiteText: {
 color: 'white'
 }
});
