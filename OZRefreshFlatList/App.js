/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    createStackNavigator,
} from 'react-navigation';
import OZRefreshFlatList, {FlatListState} from "./OZRefreshFlatList";
import SizeUtil from "./SizeUtil";

const defaultPage = 1;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{title: 1}, {title: 2}, {title: 3}, {title: 4}, {title: 5}],
            refreshing: false,
            loadMore: false,
            load: false,
            refreshState: FlatListState.Both,
            page: defaultPage,
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <OZRefreshFlatList
                    style={styles.list}
                    data={this.state.dataSource}
                    refreshing={this.state.refreshing}
                    refreshState={this.state.refreshState}
                    onRefresh={() => this.handleRefresh()}
                    onEndReached={() => this.handleLoadMore()}
                    renderItem={({item}) => this.renderItem(item)}
                    pageSize={5}
                    length={this.state.dataSource.length}
                />
            </View>
        );
    }
    
    renderItem = (item) => {
        return (
            <View style={{height: 100}}>
                <Text>{item.title}</Text>
            </View>
        );
    }
    
    handleRefresh = () => {
        if (!this.state.refreshing) {
            console.log('开始下拉刷新');
            this.setState({
                refreshing: true,
                page: defaultPage,
            }, () => {
                this.fetchData();
            });
        }
    }
    
    handleLoadMore = () => {
        if (!this.state.loadMore && !this.state.refreshing) {
            let page = this.state.page;
            console.log('开始上拉加载更多', (page + 1));
            this.setState({
                loadMore: true,
                page: page + 1,
            }, () => {
                this.fetchData();
            });
        }
    }
    
    fetchData = () => {
        let staticData = [{title: 1}, {title: 2}, {title: 3}, {title: 4}, {title: 5}];
        if (this.state.page === defaultPage && this.state.refreshing === true) {
            //刷新
            this.timer = setTimeout(() => {
                this.setState({
                    dataSource: staticData,
                    refreshing: false,
                    load: true,
                });
            }, 100);
            console.log('停止下拉刷新');
        } else if (this.state.page > defaultPage && this.state.loadMore === true) {
            //加载更多
            this.timer = setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.concat(staticData),
                    loadMore: false,
                });
            }, 100);
            console.log('停止上拉加载更多');
        }
    }
}

const AppStack = createStackNavigator({
    App: {screen: App},
});
export default AppStack;

const styles = StyleSheet.create({
    container: {
        // width: SizeUtil.screenW(),
        // height: SizeUtil.screenH(false, true),
        flex: 1,
        // backgroundColor: 'red',
    },
    list: {
        // margin: 10,
        height: SizeUtil.screenH(false, true),
        // backgroundColor: 'blue',
    }
});

