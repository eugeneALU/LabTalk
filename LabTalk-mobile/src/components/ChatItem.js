import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { connect } from 'react-redux';

class ChatItem extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        username: PropTypes.string,
        username_login: PropTypes.string,
        ts: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.change_ts_to_time = this.change_ts_to_time.bind(this);
        this.change_ts_to_date = this.change_ts_to_date.bind(this);
        this.handle_string_length = this.handle_string_length.bind(this);
    }

    render() {
        const { text, username, ts, username_login } = this.props;
        let TimeString = this.change_ts_to_time(ts * 1000).concat(' ', this.change_ts_to_date(ts * 1000));
        // let TimeString = '';

        let username_display = username;
        let object;

        if (username === username_login) {
            object = (
                <View style={styles.myjustify}>
                   <View>
                        <View>
                            <Text style={styles.my}>{username_display}</Text>
                        </View>
                        <View>
                            <Text style={styles.mytextstyle}>
                                {text}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            object = (
                <View style={styles.otherjustify}>
                    <View>
                        <View>
                            <Text style={styles.other}>{username_display}</Text>
                        </View>
                        <View>
                            <Text style={styles.othertextstyle}>
                                {text}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View>
                {object}
            </View>
        );
    }

    change_ts_to_time(ts) {
        var time = new Date(ts);
        return time.toLocaleTimeString();
    }

    change_ts_to_date(ts) {
        var time = new Date(ts);
        return time.toLocaleDateString();
    }

    handle_string_length() {
        const { text } = this.props;

        if (text.length < 30) {
            return `${text.length + 1}`;
        }
        else {
            return '40';
        }
    }

}

export default connect((state) => {
    return {
        ...state.chatroom,
        ...state.chatroom_hid,
        ...state.chatlist
    };
})(ChatItem);


const styles = {
    myjustify: {
        elevation: 3,
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    otherjustify: {
        elevation: 3,
        flexDirection: 'row',
    },
    my: {
        color: 'white',
        fontSize: 15,
        textAlign:'right'
    },
    mytextstyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2A2B2A',
        fontSize: 20,
        borderRadius: 15,
        color: 'white',
    },
    other: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontSize: 15,
        borderRadius: 50
    },
    othertextstyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2D3047',
        fontSize: 20,
        borderRadius: 15,
        color: 'white',
    }
};
