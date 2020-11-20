import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostID: null,
  };
  componentDidMount() {
    axios.get("http://jsonplaceholder.typicode.com/posts").then((response) => {
      const posts = response.data.slice(0, 4);
      const updatePosts = posts.map((post) => {
        return {
          ...post,
          author: "Alen",
        };
      });
      this.setState({ posts: updatePosts });
      //console.log(response);
    });
  }
  postSelectedHandler = (id) => {
    this.setState({ selectedPostID: id });
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => {
            this.postSelectedHandler(post.id);
          }}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostID} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
