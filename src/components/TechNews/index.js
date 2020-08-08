import React, { Component } from 'react'
import axios from 'axios'
import { Card, Carousel, Skeleton } from "antd";
import List from "antd/es/list";
import Avatar from "antd/es/avatar";
import "./style.css"
import API from "../../utils/API"

export default class TechNewsFeed extends Component {
    state = {
        articles: {},
        loading: true,
    };

    componentDidMount() {
        API.getTechNews().then(response => {
            console.log("technews: ", response);

            this.setState({
                articles: response.data.value,
                loading: false
            })
        }).catch(error => { console.log(error) });
    }

    render() {
        const { loading } = this.state;
        console.log("articles", this.state.articles);
        return (
            <Card id="techcard">
            <Skeleton loading={this.state.loading} active avatar>
            <h2 id="techtitle">Latest Tech News</h2>
                <Carousel autoplay autoplaySpeed={15000} dots={false}>
                    {!loading && this.state.articles.map((article, index) => {
                        return (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    title={!loading && (<a href={article.url}>{article.name}</a>)}
                                    avatar={!loading && (<Avatar size={120} shape="square" src={article.image.thumbnail.contentUrl} />)}
                                    description={!loading && (article.description)}
                                />
                        </List.Item>
                    )})}
                </Carousel>
            </Skeleton>
            </Card>
        )
    }
}