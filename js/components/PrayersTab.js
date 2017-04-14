
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
import { openDrawer } from '../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class PrayersTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dailyPrayersDate: moment(),
      jummahDate: moment().isoWeekday(5),
      mosque: 'HOOVER',
      mosqueList: [{'name': '', 'JumuahStart': '00:00'}],
      adhan: {'Fajr': '00:00', 'Sunrise': '00:00', 'Duhr': '00:00', 'Asr': '00:00', 'Magrib': '00:00','Isha': '00:00'},
      iqamah: {'Fajr': '00:00', 'Sunrise': '00:00', 'Duhr': '00:00', 'Asr': '00:00', 'Magrib': '00:00','Isha': '00:00'},
      jummahList: {'':''},
    };
    AsyncStorage.getItem('mosques').then((settingsStr)=>{
      if(settingsStr){
        this.setState({mosque: settingsStr});
      }
    });
  }

  getJummahSchedule(){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetNearestJumuahSchedule_v2/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({jummahList: responseJson[this.state.jummahDate.format('M/D/YYYY')]});
      })
      .done();
  }

  getMosques(){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetMasjidList_v2/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({mosqueList: responseJson});
      })
      .done();
  }

  getAdhan(month,day){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetSalatTimings_v2?id="
          + (month+1) +
          "&day=" + day)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({adhan: responseJson});
      })
      .done();
  }

  getIqamah(mosque,month,day){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetIqamahTimings_v2?id=" + mosque +
          "&month=" + (month+1) +
          "&day=" + day)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({iqamah: responseJson});
      })
      .done();
  }

  componentWillMount() {
    this.getJummahSchedule();
    this.getMosques();
    this.getAdhan(this.state.dailyPrayersDate.month(),this.state.dailyPrayersDate.date());
    this.getIqamah(this.state.mosque,this.state.dailyPrayersDate.month(),this.state.dailyPrayersDate.date());
  }

  getDailyPrayers(increment){
    this.state.dailyPrayersDate = this.state.dailyPrayersDate.add(increment,'days');
    this.getAdhan(this.state.dailyPrayersDate.month(),this.state.dailyPrayersDate.date());
    this.getIqamah(this.state.mosque,this.state.dailyPrayersDate.month(),this.state.dailyPrayersDate.date());
  }

  getMosquePrayer(mosque){
    this.state.mosque = mosque;
    this.getIqamah(this.state.mosque,this.state.dailyPrayersDate.month(),this.state.dailyPrayersDate.date());
  }

  render() {
    return (
        <Content style={{ backgroundColor: '#F5F5F5' }} padder>
          <Card style={styles.mb}>
            <CardItem bordered style={{ backgroundColor: '#7E57C2' }}>
              <Row>
                <Col size={10}>
                  <Icon style={{ color: '#FFF', textAlign: 'left' }} name="arrow-back" onPress={() => this.getDailyPrayers(-1)}/>
                </Col>
                <Col size={80}>
                  <Title style={{ color: '#FFF', textAlign: 'center' }} onPress={() => this.setState({dailyPrayersDate: moment()})}>Daily Prayers</Title>
                  <Subtitle style={{ color: '#FFF', textAlign: 'center' }}>{this.state.dailyPrayersDate.format('dddd, MMMM D, YYYY')}</Subtitle>
                </Col>
                <Col size={10}>
                  <Icon style={{ color: '#FFF', textAlign: 'right' }} name="arrow-forward" onPress={() => this.getDailyPrayers(1)}/>
                </Col>
              </Row>
            </CardItem>
            <Segment>
              <Button active={(this.state.mosque === 'Westside') ? true : false} onPress={() => this.getMosquePrayer('Westside')}><Text active={(this.state.mosque === 'Westside') ? true : false}>Westside</Text></Button>
              <Button active={(this.state.mosque === 'Hoover') ? true : false} onPress={() => this.getMosquePrayer('Hoover')}><Text active={(this.state.mosque === 'Hoover') ? true : false}>Hoover</Text></Button>
              <Button active={(this.state.mosque === 'Homewood') ? true : false} onPress={() => this.getMosquePrayer('Homewood')}><Text active={(this.state.mosque === 'Homewood') ? true : false}>Homewood</Text></Button>
            </Segment>
            <PrayerTimes adhan={this.state.adhan} iqamah={this.state.iqamah}/>
          </Card>
          <Card style={styles.mb}>
            <CardItem bordered style={{ backgroundColor: '#7E57C2' }}>
              <Row>
                <Col size={10}></Col>
                <Col size={80}>
                  <Title style={{ color: '#FFF', textAlign: 'center' }} onPress={() => this.setState({jummahDate: moment().isoWeekday(5)})}>Jummah Prayers</Title>
                  <Subtitle style={{ color: '#FFF', textAlign: 'center' }}>{this.state.jummahDate.format('dddd, MMMM D, YYYY')}</Subtitle>
                </Col>
                <Col size={10}></Col>
              </Row>
            </CardItem>
            <JummahTimes mosques={this.state.mosqueList} khateebs={this.state.jummahList}/>
          </Card>
        </Content>
    );
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

export default connect(mapStateToProps, bindAction)(PrayersTab);
