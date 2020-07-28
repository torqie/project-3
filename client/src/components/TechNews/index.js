import React, { Component } from 'react'
import axios from 'axios'
import { Card, Carousel, Skeleton } from "antd";
import List from "antd/es/list";
import Avatar from "antd/es/avatar";
const { Meta } = Card;




export default class TechNewsFeed extends Component {
    state = {
        articles: {},
        loading: true,
    };

    componentDidMount() {
        axios
            .get("https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&category=Technology&rapidapi-key=" + process.env.REACT_APP_BING_NEWS_SEARCH_API_KEY)
            .then(response => {
                this.setState({
                    articles: response.data.value,
                    loading: false
                })
            })
            .catch(error => {
                console.log("Error getting news article: ", error)
            });
    }

    render() {
        const { loading } = this.state;
        console.log("articles", this.state.articles);
        return (
            <Skeleton loading={this.state.loading} active avatar={{active: true, size: "large", shape:"square"}}>
                <Carousel autoplay autoplaySpeed={10000} dots={false} easing="easeOutCubic">
                    {!loading && this.state.articles.map((article, index) => {
                        return (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={!loading && (<Avatar size={100} shape="square" src={article.image.thumbnail.contentUrl} />)}
                                    title={!loading && (<a href={article.url}>{article.name}</a>)}
                                    description={!loading && (article.description)}
                                />
                        </List.Item>
                    )})}
                </Carousel>
            </Skeleton>
        )
    }
}