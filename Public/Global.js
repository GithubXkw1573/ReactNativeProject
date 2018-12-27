


import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const isIphoneX = SCREEN_HEIGHT > 800 ? true : false;
const StatusBarHeight = isIphoneX ? 44 : 20 ;
const NaviBarHeight = 44;

global.screen = {width: SCREEN_WIDTH, 
		         height: SCREEN_HEIGHT,
		         statusBarHeight: StatusBarHeight,
		         naviBarHeight:   NaviBarHeight,       
		     	} ;

global.isIphoneX = isIphoneX;


var React = require('react-native');
var {Platform} = React;

global.platform = Platform;