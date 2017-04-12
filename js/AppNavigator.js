
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StyleProvider, variables, Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { Router, Scene } from 'react-native-router-flux';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { closeDrawer } from './actions/drawer';

import Home from './components/home/';
import Header from './components/Header/';
import Header1 from './components/Header/1';
import Header2 from './components/Header/2';
import Header3 from './components/Header/3';
import Header4 from './components/Header/4';
import Header5 from './components/Header/5';
import Header6 from './components/Header/6';
import Header7 from './components/Header/7';
import Header8 from './components/Header/8';
import Anatomy from './components/anatomy/';
import Footer from './components/footer/';
import BasicFooter from './components/footer/basicFooter';
import IconFooter from './components/footer/iconFooter';
import IconText from './components/footer/iconText';
import BadgeFooter from './components/footer/badgeFooter';
import NHBadge from './components/badge/';
import NHButton from './components/button/';
import Default from './components/button/default';
import Outline from './components/button/outline';
import Rounded from './components/button/rounded';
import Block from './components/button/block';
import Full from './components/button/full';
import Custom from './components/button/custom';
import Transparent from './components/button/transparent';
import IconBtn from './components/button/iconBtn';
import Disabled from './components/button/disabled';
import NHCard from './components/card/';
import BasicCard from './components/card/basic';
import NHCardImage from './components/card/card-image';
import NHCardShowcase from './components/card/card-showcase';
import NHCardList from './components/card/card-list';
import NHCardHeaderAndFooter from './components/card/card-header-and-footer';
import NHCheckbox from './components/checkbox/';
import NHDeckSwiper from './components/deckswiper/';
import NHFab from './components/fab/';
import BasicFab from './components/fab/basic';
import MultipleFab from './components/fab/multiple';
import NHForm from './components/form/';
import FixedLabel from './components/form/fixedLabel';
import InlineLabel from './components/form/inlineLabel';
import FloatingLabel from './components/form/floatingLabel';
import PlaceholderLabel from './components/form/placeholder';
import StackedLabel from './components/form/stacked';
import TextArea from './components/form/textArea';
import NHIcon from './components/icon/';
import BasicIcon from './components/icon/basic';
import IconState from './components/icon/state';
import SpecificIcon from './components/icon/specific';
import NHInputGroup from './components/inputgroup/';
import RegularInput from './components/inputgroup/regular';
import UnderlineInput from './components/inputgroup/underline';
import RoundedInput from './components/inputgroup/rounded';
import IconInput from './components/inputgroup/iconInput';
import SuccessInput from './components/inputgroup/success';
import ErrorInput from './components/inputgroup/error';
import DisabledInput from './components/inputgroup/disabledInput';
import NHLayout from './components/layout/';
import RowNB from './components/layout/row';
import ColumnNB from './components/layout/column';
import NestedGrid from './components/layout/nested';
import CustomRow from './components/layout/customRow';
import CustomCol from './components/layout/customCol';
import NHList from './components/list/';
import NHBasicList from './components/list/basic-list';
import NHListDivider from './components/list/list-divider';
import NHListSeparator from './components/list/list-separator';
import NHListHeader from './components/list/list-headers';
import NHListIcon from './components/list/list-icon';
import NHListAvatar from './components/list/list-avatar';
import NHListThumbnail from './components/list/list-thumbnail';
import NHRadio from './components/radio/';
import NHSearchbar from './components/searchbar/';
import NHSpinner from './components/spinner/';
import NHPicker from './components/picker/';
import NHTab from './components/tab/';
import BasicTab from './components/tab/basicTab';
import ConfigTab from './components/tab/configTab';
import NHThumbnail from './components/thumbnail/';
import NHTypography from './components/typography/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import Segment from './components/segment';
import BasicSegment from './components/segment/SegmentHeader';
import AdvSegment from './components/segment/segmentTab';
import Toast from './components/toast';
import statusBarColor from './themes/variables';

const {
  popRoute,
} = actions;

const RouterWithRedux = connect()(Router);

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    themeState: React.PropTypes.string,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <StatusBar
            hidden={(this.props.drawerState === 'opened' && Platform.OS === 'ios') ? true : false}
            backgroundColor={statusBarColor.statusBarColor}
          />
          <RouterWithRedux>
            <Scene key="root" hideNavBar>
              <Scene key="0" component={IconText} initial={true}/>
              <Scene key="1" component={IconText} />
              <Scene key="2" component={IconText} />
              <Scene key="3" component={IconText} />
              <Scene key="4" component={IconText} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
