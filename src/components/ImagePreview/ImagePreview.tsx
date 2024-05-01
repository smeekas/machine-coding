import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./ImagePreview.module.css";
type ImagePreview = {
  image: string;
  preview?: {
    previewWidth: number;
    previewHeight: number;
  };
  lens?: {
    lensWidth: number;
    lensHeight: number;
  };
};

function ImagePreview({ image, ...rest }: ImagePreview) {
  const [showPreview, setShowPreview] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [dimension, setDimension] = useState<DOMRect | null>();

  const { lens, preview } = rest;
  const { previewHeight = 300, previewWidth = 300 } = preview ?? {};
  const { lensWidth = 50, lensHeight = 50 } = lens ?? {};

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //ratio between preview size and lens size
  //for ex. 50x50 lens and preview size is 300x300. so we have to scale image 6 times  in height and width
  const widthRatio = previewWidth / lensWidth;

  const heightRatio = previewHeight / lensHeight;

  const onMouseMove: MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();
    if (dimension) {
      //e.pageX - dimension.left gives x mouse position.
      //e.pageY - dimension.top gives y mouse position.
      // - (lensWidth / 2) gives left part of lens box.
      // - (lensHeight / 2) gives top part of lens box.

      let x = e.pageX - dimension.left - lensWidth / 2;
      let y = e.pageY - dimension.top - lensHeight / 2;

      if (x > dimension.width - lensWidth) {
        // mouse must be between 0 and dimension.width - lensWidth.
        x = dimension.width - lensWidth;
      }
      if (x < 0) {
        // if mouse crosses image from left

        x = 0;
      }
      if (y > dimension.height - lensHeight) {
        //just like x
        y = dimension.height - lensHeight;
      }
      if (y < 0) {
        y = 0;
      }

      //above ifs are done so lens don't go out of image
      setX(x);
      setY(y);
    }
  };
  useEffect(() => {
    if (imageRef.current) {
      const dimensions = imageRef.current.getBoundingClientRect();
      setDimension(dimensions);
    }
  }, []);

  let previewStyle: React.CSSProperties = {
    backgroundImage: `url(${image})`,

    // background size is same as original image size just ration times larger. so we will position bg image with multiplied by ratio
    backgroundPosition: `-${x * widthRatio}px -${y * heightRatio}px`,
    width: previewWidth,
    height: previewHeight,
  };

  if (dimension) {
    previewStyle = {
      ...previewStyle,

      //background size must be dimension ratio times large
      backgroundSize: `${dimension.width * widthRatio}px ${
        dimension.height * heightRatio
      }px`,
    };
  }
  return (
    <div className={styles.container}>
      <div className={styles.originalImage} ref={imageRef}>
        <img
          src={image}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          onMouseMove={onMouseMove}
        />
        {showPreview && (
          <div
            className={styles.lens}
            id="lens"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
            onMouseMove={onMouseMove}
            style={{
              width: lensWidth,
              height: lensHeight,
              left: `${x}px`,
              top: `${y}px`,
            }}
          />
        )}
      </div>
      <div className={styles.desc}>
        <p>
          After working with them for some time, she learns that the stated
          purpose is a front for Red Coast's true intention: the search for
          extraterrestrial life. Ye discovers the possibility of amplifying
          outgoing radio waves by using microwave cavities within the Sun and
          sends an interstellar message to test her theory, but tells no one
          else. Eight years later, now in a loveless marriage with Yang, Ye
          receives a message from a concerned alien pacifist from the planet
          Trisolaris in Alpha Centauri,[a] warning her not to respond or else
          the inhabitants of Trisolaris will be able to deduce the Solar
          System's location (based on the time it takes them to receive her
          response to their messages) and invade Earth. Disillusioned by the
          political chaos and having come to despise humankind, Ye responds
          anyway, inviting the Trisolarans to come to Earth to settle its
          problems. She murders Yang and Lei to keep the alien message secret.
        </p>
        {showPreview && (
          <div className={styles.preview} style={previewStyle}></div>
        )}
      </div>
    </div>
  );
}

export default ImagePreview;
