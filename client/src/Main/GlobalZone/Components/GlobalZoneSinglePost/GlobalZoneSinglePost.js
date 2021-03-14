import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../../../../firebase/firebase";
import Loading from "../../../../Shared/Loading/Loading";
import SinglePostLayout from "../../../../Shared/SinglePostLayout/SinglePostLayout";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import Masthead from "../../../../Shared/Masthead/Masthead";
//import'./GlobalZoneSinglePost.css';
const GlobalZoneSinglePost = (props) => {
  const postId = useParams().postId;
  const [value, loading, error] = useDocument(
    firestore.doc(`global-post/${postId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <React.Fragment>
      {loading && !value && <Loading />}
      {!loading && value && <SinglePostLayout post={value.data()} />}
      {error && (
        <div>
          <ErrorModal error={error} />
          <Masthead title="Not found" />
        </div>
      )}
    </React.Fragment>
  );
};

export default GlobalZoneSinglePost;
