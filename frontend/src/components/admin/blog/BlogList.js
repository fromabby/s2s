import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostContext from "../../../context/postContext";
import { useAlert } from "react-alert";
import Metadata from "../../layout/Metadata";
import Blog from "./Blog";
import "./Blog.css";
import Load from "../../layout/Load";
import formatDate from "../../../formatDate";

const BlogList = ({ title }) => {
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

  let filteredPost = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((post) => post.isArchived === false);
  let featureCount = posts.filter((post) => post.isFeature === true).length;
  let subfeatureCount = posts.filter(
    (post) => post.isSubFeature === true
  ).length;

  const alert = useAlert();

  const updateFeature = (post) => {
    const {
      title,
      images,
      _id: id,
      isFeature,
      isSubFeature,
      isArchived,
    } = post;

    try {
      const multiformdata = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const updatePost = async () => {
        const { data } = await axios.put(
          `/api/v1/posts/${id}`,
          { ...post, isFeature: !isFeature, isSubFeature: false },
          multiformdata
        );
        if (data.success) {
          updateItem(post, data.post);
          if (isFeature) {
            alert.success("Removed featured post");
          } else {
            alert.success("Post Featured");
          }
        }
      };

      if (isFeature) {
        updatePost();
      } else {
        if (featureCount < 1) {
          updatePost();
        } else {
          alert.error("Only one featured post allowed!");
        }
      }
    } catch (error) {
      alert.error("Error");
    }
  };

  const updateSubFeature = (post) => {
    const {
      title,
      images,
      _id: id,
      isFeature,
      isSubFeature,
      isArchived,
    } = post;
    try {
      const multiformdata = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const updatePost = async () => {
        const { data } = await axios.put(
          `/api/v1/posts/${id}`,
          { ...post, isSubFeature: !isSubFeature },
          multiformdata
        );
        if (data.success) {
          updateItem(post, data.post);
          if (isSubFeature) {
            alert.success("Removed subfeatured post");
          } else {
            alert.success("Post added to Subfeatures");
          }
        }
      };

      if (isSubFeature) {
        updatePost();
      } else {
        if (subfeatureCount < 3) {
          updatePost();
        } else {
          alert.error("Only three featured post allowed!");
        }
      }
    } catch (error) {
      alert.error("Error");
      console.log(error);
    }
  };
  const archiveItem = (post) => {
    if (
      window.confirm(
        "It will be permanently deleted after 90 days. Are you sure you want to archive the post?"
      )
    ) {
      const { isArchived } = post;
      archivePost(post);
      alert.success(isArchived ? "Post restored" : "Moved to Archives");
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          width: 200,
        },
        {
          label: "IMAGE",
          field: "image",
          width: 200,
        },
        {
          label: "TITLE",
          field: "title",
          width: 200,
        },
        {
          label: "CATEGORY",
          field: "category",
          width: 200,
        },
        {
          label: "Date",
          field: "date",
          width: 200,
        },
        {
          label: "ACTIONS",
          field: "actions",
          width: 200,
        },
        {
          label: "FEATURE",
          field: "feature",
          width: 200,
        },
      ],
      rows: [],
    };

    filteredPost &&
      filteredPost
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .forEach((post, index) => {
          const {
            title,
            images,
            _id: id,
            isFeature,
            category,
            isSubFeature,
            isArchived,
            createdAt,
          } = post;
          data.rows.push({
            id: index + 1,
            image: (
              // <div className='image-wrapper'>
              <img className="image" src={images[0].path} />
            ),
            // </div>
            title: title,
            category: category,
            date: formatDate(createdAt),
            actions: (
              <div>
                {!isArchived && (
                  <Link to={`/admin/blog/edit/${id}`}>
                    <Button variant="primary" className="admin-button primary">
                      Edit
                    </Button>
                  </Link>
                )}

                <Button
                  variant="danger"
                  className="admin-button danger"
                  onClick={() => archiveItem(post)}
                >
                  {isArchived ? "Restore" : "Archive"}
                </Button>
              </div>
            ),
            feature: (
              <div>
                {!isArchived && (
                  <div className="admin-switch">
                    <Form.Check
                      checked={isFeature}
                      type="switch"
                      disabled={isSubFeature}
                      label="Feature"
                      id="disabled-custom-switch"
                      onChange={() => updateFeature(post)}
                    />
                    <Form.Check
                      checked={isSubFeature}
                      type="switch"
                      disabled={isFeature}
                      label="Subfeature"
                      id="disabled-custom-switch"
                      onChange={() => updateSubFeature(post)}
                    />
                  </div>
                )}
              </div>
            ),
          });
        });

    return data;
  };

  return (
    <>
      <Metadata title={title} />
      {isLoading ? (
        <Load />
      ) : (
        <div className="manage-post-div">
          <div className="create-button">
            <Link to="/admin/blog/new">
              <Button variant="success" className="success">
                Add New Post
              </Button>
            </Link>
          </div>
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={setData()}
            fullPagination
            searchTop
            searchBottom={false}
          />
        </div>
      )}
    </>
  );
};

export default BlogList;
