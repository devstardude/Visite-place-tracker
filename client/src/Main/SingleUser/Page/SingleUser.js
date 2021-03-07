import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { visitedFilter, wishlistFilter } from "../../../utils/utils";
import ProfileCount from "../Components/ProfileCount/ProfileCount";
import UserHeader from "../Components/UserHeader/UserHeader";
import UserTabs from "../Components/UserTabs/UserTabs";
import Loading from "../../../Shared/Loading/Loading";
import "./SingleUser.css";
import Alert from "../../../Shared/Alert/Alert";
const SingleUser = (props) => {
  const [userData, setUserData] = useState();
  const [visited, setVisited] = useState();
  const [wishlist, setWishlist] = useState();
  const [posts, setPosts] = useState();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({ open: false, message: "", variant: "" });
  };
  const wishlistChangeHandler = (place) => {
    const pid = String(place.id);
    if (place.wishlist) {
      setWishlist((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== pid)
      );
      setVisited((prevPlace) => {
        return [...prevPlace, { ...place, wishlist: false }];
      });
      setUserData((prevData) => {
        const newData = userData.places.map((place) =>
          place.id === pid ? { ...place, wishlist: false } : place
        );
        return { ...prevData, places: newData };
      });
      setAlertState({
        open: true,
        message: "Added to visited",
        variant: "success",
      });
    }
    if (!place.wishlist) {
      setVisited((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== pid)
      );
      setWishlist((prevPlaces) => {
        return [...prevPlaces, { ...place, wishlist: true }];
      });
      setUserData((prevData) => {
        const newData = userData.places.map((place) =>
          place.id === pid ? { ...place, wishlist: true } : place
        );
        return { ...prevData, places: newData };
      });
      setAlertState({
        open: true,
        message: "Added to wishlist",
        variant: "success",
      });
    }
  };
  const onPlaceDeleteHandler = (wishlist, deletedPlaceId) => {
    const pid = String(deletedPlaceId);
    if (wishlist) {
      setWishlist((prevPlace) => prevPlace.filter((place) => place.id !== pid));
    } else {
      setVisited((prevPlace) => prevPlace.filter((place) => place.id !== pid));
      setUserData((prevData) => {
        const newPlaceArray = prevData.places.filter(
          (place) => place.id !== deletedPlaceId
        );
        const newUserData = { ...prevData, places: newPlaceArray };
        return newUserData;
      });
    }
    setAlertState({
      open: true,
      message: "Place Deleted",
      variant: "error",
    });
  };
  const onPostDeleteHandler = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setUserData((prevData) => {
      const newPostArray = prevData.posts.filter((post) => post !== postId);
      const newUserData = { ...prevData, posts: newPostArray };
      return newUserData;
    });
    setAlertState({
      open: true,
      message: "Post Deleted",
      variant: "error",
    });
  };
  const giveLikeCountHandler = (id) => {
    setUserData((prevData) => {
      const newLikesArray = [...prevData.likes, id];
      return { ...prevData, likes: newLikesArray };
    });
    setAlertState({
      open: true,
      message: "Profile Liked",
      variant: "success",
    });
  };
  const userId = useParams().userId;
  useEffect(() => {
    setVisited();
    setWishlist();
    window.scrollTo(0, 0);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setVisited(visitedFilter(responseData.places));
        setWishlist(wishlistFilter(responseData.places));
      } catch (err) {}
    };
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );
        setUserData(responseData.user[0]);
      } catch (err) {}
    };
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/myposts/${userId}`
        );
        setPosts(responseData.userPosts);
      } catch (err) {}
    };
    fetchUserData();
    fetchPlaces();
    fetchPosts();
  }, [sendRequest, userId]);

  if (!userData) {
    return <Loading />;
  } else {
    return (
      <div className="SingleUserPage">
        {/* {error && <ErrorModal errorText={error} clicked={clearError} />} */}
        <UserHeader giveLikeCount={giveLikeCountHandler} user={userData} />
        <ProfileCount user={userData} />
        <Alert
          handleClose={handleClose}
          openAlert={alertState.open}
          alertMessage={alertState.message}
          variant={alertState.variant}
        />
        <UserTabs
          loading={isLoading}
          id={userId}
          visitedList={visited}
          wishlistList={wishlist}
          postsList={posts}
          onPlaceDelete={onPlaceDeleteHandler}
          onPostDelete={onPostDeleteHandler}
          onWishlistChange={wishlistChangeHandler}
        />
      </div>
    );
  }
};

export default SingleUser;
