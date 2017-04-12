
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer, FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class PrayerTimes extends Component {
  static propTypes = {
    adhan: React.PropTypes.object,
    iqamah: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.adhan.Fajr){
      return (
        <Content>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Prayers
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Adhan
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Iqamah
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Fajr
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Fajr}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.iqamah.Fajr}
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Sunrise
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Sunrise}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  --:--
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Duhr
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Duhr}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.iqamah.Duhr}
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Asr
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Asr}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.iqamah.Asr}
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Maghrib
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Maghrib}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.iqamah.Maghrib}
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  Isha
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.adhan.Isha}
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center'}}>
                  {this.props.iqamah.Isha}
                </Text>
              </Col>
            </Row>
          </CardItem>
        </Content>
      );
    } else {
     return (<Spinner color="blue" />);
    }
  }
}

export default PrayerTimes;
