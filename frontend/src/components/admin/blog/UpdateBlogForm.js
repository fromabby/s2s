import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Metadata from "../../layout/Metadata";
import PostContext from "../../../context/postContext";
import Load from "../../layout/Load";

const UpdateBlogForm = ({ title }) => {
  const [showInput, setShowInput] = useState(false);
  const [post, setPost] = useState({});
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const { id } = useParams();

  const { posts, fetchSingleData, updateData } = useContext(PostContext);
  const { post: postDetail, isLoading } = posts;

  useEffect(() => {
    fetchSingleData(id);
  }, []);

  useEffect(() => {
    setPost(postDetail);
    setImages(postDetail.images);
  }, [postDetail]);

  console.log(images);

  const alert = useAlert();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    Object.keys(post).forEach((key) => {
      formData.set(key, post[key]);
    });

    images.map((image) => formData.append("images", image));

    try {
      const multiformdata = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const updatePost = async () => {
        const { data } = await axios.put(
          `/api/v1/posts/${id}`,
          formData,
          multiformdata
        );
        if (data.success) {
          await updateData(postDetail, data.post);
          alert.success("Post Updated");
        }
      };
      await updatePost();
      navigate(`/admin/blog`);
    } catch (error) {
      alert.error("Error");
      console.log(error);
    }
  };

  console.log(images, post.images)

  return isLoading ? (
    <Load />
  ) : post ? (
    <Fragment>
      <Metadata title={title} />
      <Form className="container mt-2 post-form" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Title"
            value={post.title}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="Enter Author"
            value={post.author}
            onChange={changeHandler}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="category"
            defaultValue={null}
            value={post.category}
            onChange={changeHandler}
            required
          >
            <option value={null}>Select Category</option>
            <option value="Environment">Environment</option>
            <option value="Children’s rights">Children’s rights</option>
            <option value="Partnerships">Partnerships</option>
            <option value="Health">Health</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Enter content"
            value={post.content}
            onChange={changeHandler}
            required
          />
        </Form.Group>
        {post?.images && (
          <Form.Group className="mb-3">
            <Form.Label className="d-block">Select Images</Form.Label>
            {images?.map((image) => (
              <img
                src={image.path || URL.createObjectURL(image)}
                alt={image.path || image.name}
                style={{ height: "200px", width: "auto" }}
              />
            ))}
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="image"
            style={{
              textDecoration: "underline",
            }}
          >
            Click here to select images
          </Form.Label>
          <Form.Control
            id="image"
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            style={{ display: "none" }}
          />
          {
            images.every(image => image.name) &&
            <Button
              variant="danger"
              onClick={() => setImages(post.images)}
              className="d-block"
            >
              Reset Image
            </Button>
          }
        </Form.Group>

        <div className="d-flex flex-row justify-content-end">
          <Button variant="success" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </Fragment>
  ) : (
    <>Loading</>
  );
};

export default UpdateBlogForm;
