
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');
import { actions } from 'react-native-navigation-redux-helpers';
import { Image, WebView, AsyncStorage } from 'react-native';
import { Container, Header, Subtitle, Title, Content, H2, Button, Footer,
         FooterTab,Card, CardItem, Text, Body, Left, Right, Icon, Segment,
         Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PrayersTab from './PrayersTab';
import NewsTab from './NewsTab';
import BusinessTab from './BusinessTab';
import PrayerTimes from './PrayerTimes';
import JummahTimes from './JummahTimes';
import ClinicTab from './ClinicTab';
import ContactTab from './ContactTab';
import { openDrawer } from '../../actions/drawer';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from './styles';

const {
  popRoute,
} = actions;

class IconText extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: props.navigationState.name,
      tabOrder: [{'name':'Prayers','icon':'moon'},
        {'name':'News','icon':'megaphone'},
        {'name':'Business','icon':'cash'},
        {'name':'Clinic','icon':'medkit'},
        {'name':'Contact','icon':'contact'}],
      data: [],
    };
  }

  chooseTab(currentTab, tabName) {
    this.setState({
      tab: currentTab,
      title: tabName,
    });
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#7E57C2' }} androidStatusBarColor="#673AB7" iosBarStyle="light-content">
          <Left>
            <Image source={require('./../../../img/bis.png')} style={{width: 40, height: 40}} />
          </Left>
          <Body>
            <Title>{this.state.tabOrder[this.state.tab].name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" style={{ color: '#FFF' }}/>
            </Button>
          </Right>
        </Header>
        {(this.state.tabOrder[this.state.tab].name === 'Prayers')  ?
            <PrayersTab /> :
            ((this.state.tabOrder[this.state.tab].name === 'News') ?
              <NewsTab /> :
              ((this.state.tabOrder[this.state.tab].name === 'Business') ?
                <BusinessTab /> :
                ((this.state.tabOrder[this.state.tab].name === 'Clinic') ?
                  <ClinicTab /> :
                  ((this.state.tabOrder[this.state.tab].name === 'Contact') ?
                    <ContactTab /> :
                    <Content style={{ backgroundColor: '#F5F5F5' }} padder></Content>
                  )
                )
              )
            )
        }
        <Footer>
          <FooterTab style={{ backgroundColor: '#7E57C2' }}>
            <Button active={(this.state.tab === '0') ? true : false} onPress={() => this.chooseTab(0,this.state.tabOrder[0].name)} >
              <Icon active={(this.state.tab === '0') ? true : false} style={{ color: '#FFF' }} name={this.state.tabOrder[0].icon} />
              <Text style={{ color: '#FFF' }} >{this.state.tabOrder[0].name}</Text>
            </Button>
            <Button active={(this.state.tab === '1') ? true : false} onPress={() => this.chooseTab(1,this.state.tabOrder[1].name)} >
              <Icon active={(this.state.tab === '1') ? true : false} style={{ color: '#FFF' }} name={this.state.tabOrder[1].icon} />
              <Text style={{ color: '#FFF' }} >{this.state.tabOrder[1].name}</Text>
            </Button>
            <Button active={(this.state.tab === '2') ? true : false} onPress={() => this.chooseTab(2,this.state.tabOrder[2].name)} >
              <Icon active={(this.state.tab === '2') ? true : false} style={{ color: '#FFF' }} name={this.state.tabOrder[2].icon} />
              <Text style={{ color: '#FFF' }}>{this.state.tabOrder[2].name}</Text>
            </Button>
            <Button active={(this.state.tab === '3') ? true : false} onPress={() => this.chooseTab(3,this.state.tabOrder[3].name)} >
              <Icon active={(this.state.tab === '3') ? true : false} style={{ color: '#FFF' }} name={this.state.tabOrder[3].icon} />
              <Text style={{ color: '#FFF' }}>{this.state.tabOrder[3].name}</Text>
            </Button>
            <Button active={(this.state.tab === '4') ? true : false} onPress={() => this.chooseTab(4,this.state.tabOrder[4].name)} >
              <Icon active={(this.state.tab === '4') ? true : false} style={{ color: '#FFF' }} name={this.state.tabOrder[4].icon} />
              <Text style={{ color: '#FFF' }}>{this.state.tabOrder[4].name}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, bindAction)(IconText);
