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
import OZRefreshFlatList, {FlatListState} from "./OZRefreshFlatList";
import SizeUtil from "./SizeUtil";

const defaultPage = 1;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            refreshing: false,
            refreshState: FlatListState.Both,
            loadMore: false,
            page: defaultPage,
        }
    }
    
    render() {
        return (
            <View>
                <OZRefreshFlatList
                    style={styles.list}
                    data={this.state.dataSource}
                    refreshing={this.state.refreshing}
                    refreshState={this.state.refreshState}
                    onRefresh={() => this.handleRefresh()}
                    onEndReached={() => this.handleLoadMore()}
                    renderItem={({item}) => this.renderItem(item)}
                    currentPage={this.state.page}
                    pageSize={10}
                    length={this.state.dataSource.length}
                />
            </View>
        );
    }
    
    renderItem = (item) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }
    
    handleRefresh = () => {
        if (!this.state.refresh) {
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
        if (!this.state.loadMore && this.state.loaded) {
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
        if (this.state.page === defaultPage) {
            //刷新
            this.setState({
                dataSource: staticData,
            });
        } else {
            //加载更多
            this.setState({
                dataSource: this.state.dataSource.concat(staticData),
            });
        }
    }
}

const styles = StyleSheet.create({
    list: {
        width: SizeUtil.screenW(),
        height: SizeUtil.screenH(false, false),
    }
});

