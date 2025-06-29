import React, { useState, useEffect } from "react";

import COURSE_DEFAULT_IMAGE from "../../assets/course-placeholder.png";
import PROFILE_DEFAULT_IMAGE from "../../assets/silhouette.jpeg";

const ImageWithFallback = ({ photoUrl, isProfileImage = false, alt, ...props }) => {
  const fallbackImage = isProfileImage ? PROFILE_DEFAULT_IMAGE : COURSE_DEFAULT_IMAGE;
  
  const [currentImgSrc, setCurrentImgSrc] = useState(() => {
    return photoUrl ? photoUrl: fallbackImage;
  });

  const [hasError, setHasError] = useState(false);

useEffect(() => {
    setHasError(false);
    if (photoUrl) {
      setCurrentImgSrc(photoUrl);
    } else {
      setCurrentImgSrc(fallbackImage);
    }
  }, [photoUrl, fallbackImage]);

  const handleError = () => {
    if (!hasError) {
      setCurrentImgSrc(fallbackImage);
      setHasError(true);
    }
  };

  return (
    <img
      {...props}
      src={currentImgSrc}
      alt={alt || (isProfileImage ? "Profile Image" : "Course Image")}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
