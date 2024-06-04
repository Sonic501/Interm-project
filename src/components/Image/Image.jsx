import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import images from "../../assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFaffback] = useState("");
    const handleError = () => {
      setFaffback(customFallback);
    };

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref} //Vì tách components thì ko tìm thấy DOM element của thẻ img nên phải truyền ref
        src={src !== null ? fallback || src : fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);



export default Image;
