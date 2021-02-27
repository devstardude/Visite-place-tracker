import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import { visitedFilter, wishlistFilter } from "../../../utils/utils";
import ProfileCount from "../Components/ProfileCount/ProfileCount";
import UserHeader from "../Components/UserHeader/UserHeader";
import UserTabs from "../Components/UserTabs/UserTabs";
import Loading from "../../../Shared/Loading/Loading";
import "./SingleUser.css";

const SingleUser = (props) => {
  const [userData, setUserData] = useState();
  const [visited, setVisited] = useState();
  const [wishlist, setWishlist] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    }
  };
  const onDeleteHandler = (wishlist, deletedPlaceId) => {
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
  };
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        const visited = visitedFilter(responseData.places);
        const wishlist = wishlistFilter(responseData.places);
        setVisited(visited);
        setWishlist(wishlist);
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
    fetchUserData();
    fetchPlaces();
  }, [sendRequest, userId]);

  if (!userData) {
    return <Loading />;
  } else {
    return (
      <div className="SingleUserPage">
        <UserHeader user={userData} />
        <ProfileCount user={userData} />
        <UserTabs
          visitedList={visited}
          wishlistList={wishlist}
          onDelete={onDeleteHandler}
          onWishlistChange={wishlistChangeHandler}
        />
      </div>
    );
  }
};

export default SingleUser;
