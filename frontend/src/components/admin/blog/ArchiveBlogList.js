import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostContext from "../../../context/postContext";
import { useAlert } from "react-alert";
import Blog from "./Blog";
import "./Blog.css";
import formatDate from "../../../formatDate";

const ArchiveBlogList = () => {
  const {
    posts: data,
    updateData: updateItem,
    archiveData: archivePost,
    deleteData: deletePost,
  } = useContext(PostContext);
  const { posts: postList, isLoading } = data;

  const [posts, setPosts] = useState(postList);

  useEffect(() => {
    setPosts(postList);
  }, [postList]);

  const filteredPost = posts.filter((post) => post.isArchived === true);

  const alert = useAlert();

  const archiveItem = (post) => {
    const { isArchived } = post;
    archivePost(post);
    alert.success(isArchived ? "Post restored" : "Moved to Archives");
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      alert.success("Post Deleted");
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "IMAGE",
          field: "image",
        },
        {
          label: "TITLE",
          field: "title",
        },
        {
          label: "EXPIRY DATE",
          field: "expiry_date",
        },
        {
          label: "ACTIONS",
          field: "actions",
        },
      ],
      rows: [],
    };

    filteredPost &&
      filteredPost.forEach((post, index) => {
        const { title, images, _id: id, category, expiresAt } = post;
        data.rows.push({
          id: index + 1,
          image: <img className="image" src={images[0].path} />,
          title: title,
          expiry_date: formatDate(expiresAt),
          actions: (
            <div>
              <Button
                variant="success"
                className="success admin-button"
                onClick={() => archiveItem(post)}
              >
                {post.isArchived ? "Restore" : "Archive"}
              </Button>
              {post.isArchived && (
                <Button
                  variant="danger"
                  className="admin-button danger"
                  onClick={() => deleteItem(post._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ),
        });
      });

    return data;
  };

  return isLoading ? (
    <>Loading</>
  ) : (
    <div className="manage-post-div">
      {/* <Form.Control type='text' onChange={(e) => setPosts(postList.filter(post => post.title.includes(e.target.value)))} /> */}

      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={setData()}
        fullPagination
        // searching={false}
        searchTop
        searchBottom={false}
      />
    </div>
  );
};

export default ArchiveBlogList;
