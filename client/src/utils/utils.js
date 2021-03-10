import imageCompression from "browser-image-compression";
import { uploadImage } from "../firebase/firebase";

export const imageUploadHandler = async (id, file,size) => {
  const options = {
    maxSizeMB: size,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const url = await uploadImage(id, compressedFile);
    return url;
  } catch (error) {
    console.log(error);
  }
};

const badge = (urban, nature, sea, others) => {
  if (urban === nature && nature === sea && sea === others && others === 0) {
    return "New Adventurer";
  } else if (urban >= 10 && nature >= 10 && sea >= 10 && others >= 10) {
    return "Pro Traveller";
  } else if (urban === Math.max(urban, nature, sea, others)) {
    return "Urban Traveller";
  } else if (nature === Math.max(urban, nature, sea, others)) {
    return "Nature Traveller";
  } else if (sea === Math.max(urban, nature, sea, others)) {
    return "Sea Traveller";
  } else {
    return "Going Places";
  }
};

const placeCount = (places) => {
  const visitedFilter = places.filter((place) => {
    return place.wishlist === false;
  });
  const urbanCount = visitedFilter.filter((urban) => {
    return urban.typeOfPlace === "urban";
  });
  const natureCount = visitedFilter.filter((nature) => {
    return nature.typeOfPlace === "nature";
  });
  const seaCount = visitedFilter.filter((sea) => {
    return sea.typeOfPlace === "sea";
  });
  const otherCount = visitedFilter.filter((other) => {
    return other.typeOfPlace === "other";
  });
  return {
    urbanCount: urbanCount.length,
    natureCount: natureCount.length,
    seaCount: seaCount.length,
    otherCount: otherCount.length,
  };
};

const visitedFilter = (places) => {
  const visitedFilter = places.filter((place) => {
    return place.wishlist === false;
  });
  return visitedFilter;
};
const wishlistFilter = (places) => {
  const wishlistFilter = places.filter((place) => {
    return place.wishlist === true;
  });
  return wishlistFilter;
};
export { badge, placeCount, visitedFilter, wishlistFilter };
