import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';

import { Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import GroupScreen from './GroupScreen.js';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProfileScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.scrollAnim = new Animated.Value(0);

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{
                    flex: this.scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 0],
                        extrapolate: 'clamp'
                    }
                    )
                }}>
                    <View style={{ flex: 3, zIndex: -1 }}>
                        <Image source={require('../images/profile.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2, backgroundColor: 'white' }} />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap' }} >
                        <Image source={require('../images/person.png')} style={{ width: 80, height: 80, backgroundColor: 'white' }} />
                        <Text></Text>
                        <Text style={{ fontSize: 35 }}>{'   '}{this.props.username_login}</Text>
                    </View>
                </Animated.View>
                <View style={{ flex: 1 }}>
                    <ScrollableTabView
                        tabBarBackgroundColor={'#ffffff'}
                        renderTabBar={() => <ScrollableTabBar />} onScroll={
                            (position) => {
                                const x = position;
                                this.scrollAnim.setValue(x);
                            }
                        }
                        initialPage={0}
                    >
                        <ScrollView tabLabel="個人資料">
                            <List>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ alignSelf: 'center' }}><Icon name="user" /></Text>
                                        <Text>{"   "}</Text>
                                        <Text style={{ fontSize: 15, textAlign:'left' }}>username</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: 15 ,textAlign:'center'}}>{this.props.username_login}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ alignSelf: 'center' }}><Icon name="building" /></Text>
                                        <Text>{"   "}</Text>
                                        <Text style={{ fontSize: 15, textAlign:'left'}}>Inc.</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: 15,textAlign:'center' }}>xxx company</Text>
                                    </Body>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ alignSelf: 'center' }}><Icon name="envelope" /></Text>
                                        <Text>{"   "}</Text>
                                        <Text style={{fontSize: 15, textAlign:'left'}}>e-mail</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: 15,textAlign:'center' }}>xxx@xxxxmail.com</Text>
                                    </Body>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ alignSelf: 'center' }}><Icon name="bell" /></Text>
                                        <Text>{"   "}</Text>
                                        <Text style={{ fontSize: 15, textAlign:'left'}}>Notification</Text>
                                    </Left>
                                    <Body>
                                        <Switch value={false} style={{ marginRight: 70 }} />
                                    </Body>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Left>
                                        <Text style={{ alignSelf: 'center' }}><Icon name="cog" /></Text>
                                        <Text>{"   "}</Text>
                                        <Text style={{ fontSize: 15, textAlign:'left'}}>setting</Text>
                                    </Left>
                                    <Body>
                                         <Icon name="arrow-right" size={15} color="gray" style={{ marginLeft: 95 }}/>
                                    </Body>
                                </ListItem>
                            </List>
                        </ScrollView>
                        <ScrollView tabLabel="群組列表">
                            <GroupScreen navigate={navigate} />
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }

}

export default connect(state => ({
    ...state.chatlist,
    ...state.logIn
}))(ProfileScreen);
