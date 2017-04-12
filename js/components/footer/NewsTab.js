
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView, AsyncStorage } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer,
         FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PrayerTimes from './PrayerTimes';
import JummahTimes from './JummahTimes';
import { openDrawer } from '../../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class NewsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
    };
  }

  getAnnouncement(){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetLastAnnouncementJSONList/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({announcements: responseJson});
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
    if(this.state.announcements !== []){
      return (
          <Content style={{ backgroundColor: '#F5F5F5' }} padder>
            <Card style={styles.mb}>
              <CardItem bordered style={{ backgroundColor: '#7E57C2' }}>
                <Row>
                  <Col size={10}></Col>
                  <Col size={80}>
                    <Title style={{ color: '#FFF', textAlign: 'center' }}>News & Announcements</Title>
                 </Col>
                  <Col size={10}></Col>
                </Row>
              </CardItem>
              {this.state.announcements.map(function(announcement, i){
                return(
                  <CardItem bordered key={i}>
                    <Text>
                      {cleanString(announcement.text)}
                    </Text>
                  </CardItem>);
              })}
            </Card>
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

export default connect(mapStateToProps, bindAction)(NewsTab);
