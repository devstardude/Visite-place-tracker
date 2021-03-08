import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "../../../../assets/images/traveller.jpg";
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import { Chip } from "@material-ui/core";
import "./PostCard.css";
const PostCard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const currentUserCheck = auth.userId === props.post.creator;
  const deleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/posts/delete/${props.post.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onPostDelete(props.post.id);
    } catch (err) {}
  };
  return (
    <div className="col-12 col-lg-6 pr-4 px-lg-5 pb-5 pt-3">
      {error && <ErrorModal errorText={error} clicked={clearError} />}
      <Card className="CardDiv">
        <Link style={{ color: "black" }} to={`/post/${props.post.id}`}>
          <ImageHeader className="CardImage" alt="image" imageSrc={Image} />
          <CardBody>
            <h4>{props.post.title} </h4>
            <p>
              {props.post.description.slice(0, 30)}{" "}
              {props.post.description.slice(31, 32) && "... (Read More)"}
            </p>

            <p className="mb-0 pb-0">
              {props.post.tags.map((tag) => (
                <Chip
                  style={{ marginRight: "4px" }}
                  className="my-1"
                  size="small"
                  label={tag}
                  clickable
                />
              ))}
            </p>
          </CardBody>
        </Link>

        {currentUserCheck && (
          <CardFooter>
            <div className="container d-flex justify-content-between PostCardFooterButton">
              <Link to={`/edit/post/${props.post.id}`}>
                <button className="btn btn-outline-info">Edit</button>
              </Link>
              <DeleteConfirmationModal
                deleteWarning="Are you sure you want to delete this post?"
                deleteHandler={deleteHandler}
              />
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
