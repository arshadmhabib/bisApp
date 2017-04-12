
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, View, AsyncStorage, Linking } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, H3, Button, Footer,
         FooterTab, Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PrayerTimes from './PrayerTimes';
import JummahTimes from './JummahTimes';
import { openDrawer } from '../../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Accordion from 'react-native-collapsible/Accordion';
import Bar from 'react-native-bar-collapsible';

import styles from './styles';

const {
  popRoute,
} = actions;

class BusinessTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };
  }

  getBusinessDirectory(){
    fetch("http://aleemstudio.com/MobileDeviceSupport/GetBusinessDirectory/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({businesses: responseJson});
      })
      .done();
  }

  componentWillMount() {
    this.getBusinessDirectory();
  }

  render() {
    var businesses = this.state.businesses;
    if(businesses !== []){
      return (
        <Content style={{ backgroundColor: '#F5F5F5' }} padder>
          <Card>
          {Object.keys(businesses).map(function(key,i) {
            var iconName = "";
            if(key === 'Restaurant'){
              iconName = 'restaurant';
            }
            if(key === 'Grocery'){
              iconName = 'pricetags';
            }
            if(key === 'Medical'){
              iconName = 'medkit';
            }
            if(key === 'Automotive'){
              iconName = 'car';
            }
            var title = (<Icon style={{ color: '#FFF', fontSize: 14  }} name={iconName}><Text style={{ color: '#FFF', fontSize: 18, margin: 10 }}>   {key}</Text></Icon>);
            return(
              <Bar
                title={title}
                collapsible={true}
                showOnStart={false}
                icon='rocket'
                style={{"backgroundColor":"#7E57C2"}}
                iconSize={15}
                key={i}
                >

                {businesses[key].map(function(business,j) {
                  return(
                  <Content  key={j}>
                    <CardItem style={{ backgroundColor: '#9575CD' }}>
                        <Text style={{ color: '#FFF', fontSize: 16 }}> {business.BusinessName}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Grid key={j}>
                        <Row>
                          <Col size={50}>
                              <Text style={{fontSize: 12, textAlign: 'left'}} onPress={() => Linking.openURL("https:\/\/www.google.com/maps/place/"+business.Address+" "+business.City+","+business.State+" "+business.Zip)}>
                                {business.Address}{'\n'}
                                {business.City}, {business.State} {business.Zip}{'\n'}
                              </Text>
                              <Text style={{fontSize: 12, textAlign: 'left', color: '#0000EE'}} onPress={() => Linking.openURL('tel:'+business.Tel)}>{business.Tel}{'\n'}</Text>
                              <Text style={{fontSize: 12, textAlign: 'left', textDecorationLine: 'underline', color: '#0000EE'}} onPress={() => Linking.openURL(business.Website)}>{business.Website}{'\n'}</Text>
                          </Col>
                          <Col size={50}><Text style={{fontSize: 12, textAlign: 'right'}}>{business.OperationHours}</Text></Col>
                        </Row>
                        <Row>
                          <Col>
                            <Text>
                              {business.Description}
                            </Text>
                          </Col>
                        </Row>
                      </Grid>
                    </CardItem>

              </Content>
                  );
                })}
            </Bar>
          );
        })}
        </Card>
        <Card>
            <CardItem>
              <Text>Contact BIS office to list your business here</Text>
            </CardItem>
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

export default connect(mapStateToProps, bindAction)(BusinessTab);
