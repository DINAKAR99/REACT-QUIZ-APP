import { Button, Card, CardBody, Container, Input } from "reactstrap";
// import { loadAllCategories } from "../services/category-services";

import { useEffect, useState } from "react";
// import JoditEditor from "jodit-react";
// import { useRef } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getCurrentUserDetail } from "../auth";

const AddPost = () => {
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    posttitle: "",
    postcontent: "",
    imageName: "wd",
    category: { categoryId: 1 }, // Assuming the category has an id of 1

    user: { id: "" },
  });

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //-----------------functions------------------
  //field changed function
  const fieldChanged = (event) => {
    //console.log(event)
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  //category id change function
  const categoryChanged = (event) => {
    //console.log(event)
    setPost({ ...post, category: { categoryId: event.target.value } });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, postcontent: data });
  };

  //create post function
  const createPost = (event) => {
    event.preventDefault();
    console.log(post);
    if (post.posttitle.trim() == "") {
      toast.error("post is required !!");
      return;
    }
    if (post.postcontent.trim() == "") {
      toast.error("post content is required !!");
      return;
    }

    if (post.category.categoryId == "") {
      toast.error("Post Category is required !!");
      return;
    }
    //submit the form on server
    post.user = { id: user.id };

    doCreatePost(post)
      .then((resp) => {
        console.log(resp);
        toast.success("Post Created");
        setPost({
          posttitle: "",
          postcontent: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("error");
        console.log(error);
      });
  };
  return (
    <div className="wrapper ">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          {JSON.stringify(post)}
          <h3>what is going in your mind ?</h3>
          <form onSubmit={createPost}>
            <div className="my-3">
              <label htmlFor="content">
                <b>POST TITLE</b>
              </label>
              <Input
                type="text"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{ height: "30px" }}
                name="posttitle"
                onChange={fieldChanged}
              ></Input>
            </div>
            <div className="my-3">
              <label htmlFor="category">
                <b>POST CONTENT</b>
              </label>
              {/* <input type="textarea" id="content" placeholder="Enter here" className="rounded-0"onChange={fieldChanged} style={{ height: '300px' }}/>*/}
              <JoditEditor
                ref={editor}
                value={post.postcontent}
                onChange={contentFieldChanged}
                name="postcontent"
              />
            </div>
            <div className="my-3">
              <label htmlFor="content">
                <b>POST CATEGORY</b>
              </label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={categoryChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger">
                Rest Content
              </Button>
            </Container>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default AddPost;
