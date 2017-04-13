
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView, AsyncStorage, Linking } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer,
         FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PrayerTimes from './PrayerTimes';
import JummahTimes from './JummahTimes';
import { openDrawer } from '../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class ContactTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  getAnnouncement(){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetBISFacilities_v2/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({contacts: responseJson});
      })
      .done();
  }

  componentWillMount() {
    this.getAnnouncement();
  }



  render() {
    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }
    function cleanString(javaString){
      let output;
      output = replaceAll(javaString, "\r\n", '');
      output = replaceAll(output, "\n", '');
      output = replaceAll(output, "\r", '');
      output = replaceAll(output, "&nbsp;", ' ');
      return output;
    }
    if(this.state.contacts !== []){
      return (
          <Content style={{ backgroundColor: '#F5F5F5' }} padder>

              {this.state.contacts.map(function(contact, i){

                return(
            <Card key={i}>
              <CardItem bordered style={{ backgroundColor: '#7E57C2' }}>
                <Title style={{ color: '#FFF', textAlign: 'center' }}>{contact.Name}</Title>
              </CardItem>
                  <CardItem bordered>
                    <Text style={{fontSize: 12, textAlign: 'left'}}
                      onPress={() => Linking.openURL("https:\/\/www.google.com/maps/place/"+contact.Address1+" "+contact.City+","+contact.State+" "+contact.Zip)}>
                      {contact.Address1}{'\n'}
                      {contact.City}, {contact.State} {contact.Zip}{'\n'}
                    <Text style={{fontSize: 12, textAlign: 'left', color: '#0000EE'}}
                      onPress={() => Linking.openURL('tel:'+contact.Phone1)}>
                        {contact.Phone1 !== 'NA' ? contact.Phone1 : ''}{'\n'}
                    </Text>
                    <Text style={{fontSize: 12, textAlign: 'left', textDecorationLine: 'underline', color: '#0000EE'}}
                      onPress={() => Linking.openURL(contact.website)}>
                        {contact.website}
                    </Text>
                    </Text>
                    </CardItem>
            </Card>
);
              })}
          </Content>
      );
    } else {
      return (<Spinner color="blue" />);
    }
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(ContactTab);
