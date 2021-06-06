import React from 'react';
import {View, Text} from 'react-native';
import FacebookLoginButton from './FacebookLoginButton'


const App = () => {
  return (
    <View 
      style = {{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
      
      <FacebookLoginButton
        onLogin={
          (result) => {
            if (result.message) {
              alert('error: ' + result.message);
            } else if (result.isCancelled) {
              alert("Login cancelled");
            } else {
              alert("Login successfully " + result.profile.name + '- ' + result.profile.email)
            }
          }
        }
        onLogout={ () => alert("Logged out")}
      />
    </View>
  );
}

export default App;
