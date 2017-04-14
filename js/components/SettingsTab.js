
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Platform, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Separator, Text,Right,Body,Left,Picker, ListItem } from 'native-base';

import { openDrawer } from '../actions/drawer';
import styles from './styles';

const Item = Picker.Item;

class SettingsTab extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      mosques: 'Hoover',
    };

    //get stored value
    AsyncStorage.getItem('mosques').then((settingsStr)=>{
      if(settingsStr){
        this.setState({mosques: settingsStr});
      }else{
        AsyncStorage.setItem('mosques', this.state.mosques);
      }
    });
  }

  //Save current change
  onValueChange(key, value) {
    var obj = {};
  	obj[key] = value;
  	this.setState(obj);
    AsyncStorage.setItem(key, value);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#7E57C2' }} androidStatusBarColor="#673AB7" iosBarStyle="light-content">
          <Left>
            <Image source={require('./../../img/bis.png')} style={{width: 40, height: 40}} />
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" style={{ color: '#FFF' }}/>
            </Button>
          </Right>
        </Header>

        <Content>
        	<Separator bordered noTopBorder>
            <Text style={{fontSize: 14}}>Default Values</Text>
          </Separator>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="locate" />
              </Button>
            </Left>
            <Body>
              <Text>Prayer Times Mosque</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.mosques}
                onValueChange={this.onValueChange.bind(this,'mosques')}>
                <Item label="Hoover" value="Hoover" />
                <Item label="Homewood" value="Homewood" />
                <Item label="Westside" value="Westside" />
              </Picker>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SettingsTab);
