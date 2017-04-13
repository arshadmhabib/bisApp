
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView, AsyncStorage, Linking } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer,
         FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner, Separator, List, ListItem, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PrayerTimes from './PrayerTimes';
import JummahTimes from './JummahTimes';
import { openDrawer } from '../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class ClinicTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: {},
    };
  }

  getAnnouncement(){
    fetch("http://rcca.aleemstudio.com/MobileSupport/Get6MonthSchedule")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({schedule: responseJson});
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

    var sche = this.state.schedule;
    if(sche !== {}){
      return (
          <Content style={{ backgroundColor: '#F5F5F5' }} >
          <CardItem style={{ backgroundColor: '#9575CD' }}>
              <Text style={{ color: '#FFF', fontSize: 16 }}>For appointments call </Text>
              <Text style={{ color: '#FFF', fontSize: 16, textDecorationLine: 'underline'}} onPress={() => Linking.openURL('tel:2058794247')}>(205) 879 - 4247</Text>
              <Text style={{ color: '#FFF', fontSize: 16 }}> option 4</Text>
          </CardItem>
            {Object.keys(sche).map(function(key,i) {
              return(
                <Content key={i}>
                  {((sche[key].doc1 !== null)||(sche[key].nur1 !== null)|| (sche[key].doc1 !== null))&&(moment(key)>=moment()) ?
                    <Content>
                      <Separator bordered noTopBorder>
                        <Text style={{fontSize: 14}}>{moment(key).format('MMMM D, YYYY')}</Text>
                      </Separator>
                      <ListItem>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Doctor{sche[key].doc2 !== null ? '(s)' : ''}:</Text>
                        <Text style={{fontSize: 15}}> {sche[key].doc1}{sche[key].doc2 !== null ? ',' : ''} {sche[key].doc2}</Text>
                      </ListItem>
                      <ListItem>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Nurse{sche[key].nur2 !== null ? '(s)' : ''}:</Text>
                        <Text style={{fontSize: 15}}> {sche[key].nur1}{sche[key].nur2 !== null ? ',' : ''} {sche[key].nur2}</Text>
                      </ListItem>
                      <ListItem>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Volunteer{sche[key].vol2 !== null ? '(s)' : ''}:</Text>
                        <Text style={{fontSize: 15}}> {sche[key].vol1}{sche[key].vol2 !== null ? ',' : ''} {sche[key].vol2}</Text>
                      </ListItem>
                    </Content>
                : <Content></Content>}
              </Content>
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

export default connect(mapStateToProps, bindAction)(ClinicTab);
