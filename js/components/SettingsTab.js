
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Platform } from 'react-native';
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
      prayers: 'Tab1',
      news: 'Tab2',
      business: 'Tab3',
      clinic: 'Tab4',
      contact: 'Tab5',
    };
  }

  onValueChange(key, value) {
    var obj = {};
  	obj[key] = value;
  	var settingsStates = this.state;
  	var obj2 = {};
  	Object.keys(settingsStates).map(function(currentState,i) {
  		if(settingsStates[currentState] === value){
  			obj2[currentState] = '';
  		}
  	})
  	this.setState(obj2);
  	this.setState(obj);
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
        	<Separator bordered noTopBorder>
                <Text style={{fontSize: 14}}>Tab Order</Text>
            </Separator>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Prayers</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.prayers}
                onValueChange={this.onValueChange.bind(this,'prayers')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>News</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.news}
                onValueChange={this.onValueChange.bind(this,'news')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Business</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.business}
                onValueChange={this.onValueChange.bind(this,'business')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Clinic</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.clinic}
                onValueChange={this.onValueChange.bind(this,'clinic')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
              </Picker>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button light>
                <Icon name="list" />
              </Button>
            </Left>
            <Body>
              <Text>Contact</Text>
            </Body>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                style={{ width:(Platform.OS === 'ios') ? undefined : 120 }}
                selectedValue={this.state.contact}
                onValueChange={this.onValueChange.bind(this,'contact')}>
                <Item label="None" value="None" />
                <Item label="Tab 1" value="Tab1" />
                <Item label="Tab 2" value="Tab2" />
                <Item label="Tab 3" value="Tab3" />
                <Item label="Tab 4" value="Tab4" />
                <Item label="Tab 5" value="Tab5" />
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

/*    const SETTINGS_KEY = 'Settings'
const settingsObj = [
        {'name':'Business','icon':'cash'},
        {'name':'Clinic','icon':'medkit'},{'name':'Prayers','icon':'moon'},
        {'name':'News','icon':'megaphone'},
        {'name':'Contact','icon':'contact'}];
AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj))

    const SETTINGS_KEY = 'Settings';
    AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
      this.setState({"tabOrder": JSON.parse(settingsStr)});
    })*/
