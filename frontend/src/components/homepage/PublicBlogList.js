import React, { useContext, useEffect, useState } from "react";
import PostContext from "../../context/postContext";
import BlogCard from "./blog/BlogCard";
import Metadata from "../layout/Metadata";
import "./css/Blog.css";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Load from "../layout/Load";

const PublicBlogList = ({ title }) => {
  const { posts: postData } = useContext(PostContext);
  const { isLoading, posts: postsData } = postData;

  const posts = postsData.sort(function (a, b) {
    return (
      new Date(b.createdAt || b.updatedAt) -
      new Date(a.createdAt || a.updatedAt)
    );
  });

  const [maxDisplay, setMaxDisplay] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [postList, setPostList] = useState(posts);
  const [categories, setCategories] = useState([
    "Environment",
    "Children’s rights",
    "Partnerships",
    "Health",
  ]);

  const changeMaxHandler = () => {
    if (maxDisplay === 9) {
      setMaxDisplay(posts.length);
    } else {
      setMaxDisplay(9);
    }
  };

  useEffect(() => {
    if (categoryQuery === "-") {
      let filteredPost = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPostList(filteredPost);
    } else {
      let filteredPost = [];
      if (searchQuery) {
        let newPostList = posts.filter((post) =>
          post.category.toLowerCase().includes(categoryQuery.toLowerCase())
        );
        filteredPost = newPostList.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        filteredPost = posts.filter((post) =>
          post.category.toLowerCase().includes(categoryQuery.toLowerCase())
        );
      }
      setPostList(filteredPost);
    }
  }, [searchQuery, categoryQuery, posts]);

  return isLoading ? (
    <Load />
  ) : (
    <div>
      <Metadata title={title} />
      <div id="blog">
        <div className="filter-container">
          <Form.Control
            type="text"
            className="searchField"
            placeholder="Search title..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Form.Select
            className="selectField"
            name="category"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Environment">Environment</option>
            <option value="Children’s rights">Children’s rights</option>
            <option value="Partnerships">Partnerships</option>
            <option value="Health">Health</option>
          </Form.Select>
          <Button
            style={{ marginLeft: "10px", width: "fit-content" }}
            className="admin-button primary"
            onClick={() => {
              setSearchQuery("");
              setCategoryQuery("");
            }}
          >
            Clear Filter
          </Button>
        </div>

        <div className="recent1">
          {postList &&
            postList.map((post, index) =>
              index < maxDisplay && !post.isArchived ? (
                <BlogCard post={post} />
              ) : (
                ""
              )
            )}
        </div>
        {postList.length > 9 && (
          <Button onClick={changeMaxHandler} className="admin-button primary">
            {postList.filter((post) => !post.isArchived).length >= maxDisplay &&
              (postList.filter((post) => !post.isArchived).length !== 9 &&
              maxDisplay === 9
                ? "See More"
                : "See Less")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PublicBlogList;
