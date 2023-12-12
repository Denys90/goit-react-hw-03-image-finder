import React from 'react';
import { Item } from './Item';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <Item onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" />
    </Item>
  );
};

export default ImageGalleryItem;
