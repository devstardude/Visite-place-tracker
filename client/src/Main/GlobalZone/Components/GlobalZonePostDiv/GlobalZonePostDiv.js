import React from "react";
import { firestore } from "../../../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GlobalZonePostCard from "../GlobalZonePostCard/GlobalZonePostCard";
import "./GlobalZonePostDiv.css";
import Spinner from "../../../../Shared/Spinner/Spinner";
const post = {
  title: "heheheheheh",
  description: "pepepepepe",
  tags: ["pepe", "ppepe"],
};

const GlobalZonePostDiv = (props) => {
  const postsRef = firestore.collection("global-post");
  const query = postsRef.orderBy("createdAt");
  const [allPosts] = useCollectionData(query, {
    idField: "uid",
  });
  return (
    <div className="GlobalZonePostDiv p-3">
      {console.log(allPosts)}
      {!allPosts && <Spinner color="black"  />}
      {allPosts &&
        allPosts.map((post) => <GlobalZonePostCard post={post} />)}
    </div>
  );
};

export default GlobalZonePostDiv;
