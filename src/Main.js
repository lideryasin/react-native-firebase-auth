import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Header from './ortak/Header';
import LoginForm from './LoginForm';
import CardSection from './ortak/CardSection';
import Spinner from './ortak/Spinner';
import Button from './ortak/Button';

class Main extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDOCuyWYV_qOzXjkYYTqIYoCTX4fA3u5Pk',
      authDomain: 'deneme-e8424.firebaseapp.com',
      databaseURL: 'https://deneme-e8424.firebaseio.com',
      projectId: 'deneme-e8424',
      storageBucket: 'deneme-e8424.appspot.com',
      messagingSenderId: '518705747661'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={this.clickLogout.bind(this)}> ÇIKIŞ </Button>
          </CardSection>
        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );

    }
  }


  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />
        {this.renderContent()}
      </View>
    );
  }
}

export default Main;
