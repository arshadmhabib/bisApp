
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer,
         FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner } from 'native-base';import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class JummahTimes extends Component {
  static propTypes = {
    mosques: React.PropTypes.array,
    khateebs: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    for(var i = 0; i<this.props.mosques.length; i++){
      this.props.mosques[i].khateebs = this.props.khateebs[this.props.mosques[i].name];
    }

    if(this.props.mosques[0].khateebs){
      return (
        <Content>
          <CardItem bordered>
            <Row>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Location
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Time
                </Text>
              </Col>
              <Col>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>
                  Khateeb
                </Text>
              </Col>
            </Row>
          </CardItem>
          {this.props.mosques.map(function(masjids, i){
            return(
              <CardItem bordered key={i}>
                <Row>
                  <Col>
                    <Text style={{textAlign: 'center'}}>
                      {masjids.name}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{textAlign: 'center'}}>
                      {masjids.JumuahStart}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{textAlign: 'center'}}>
                      {masjids.khateebs}
                    </Text>
                  </Col>
                </Row>
              </CardItem>
            );
           })}
        </Content>
      );
    } else {
      return (<Spinner color="blue" />);
    }
  }
}

export default JummahTimes;
