import React, { Component } from 'react';
import { Global, css } from '@emotion/react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchData from './API/fetchData';
import { Container } from './Styles/Container';
// ===============================================>
export class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      queryValue: '',
      page: 1,
      total: null,
      loading: false,
      modalImg: '',
      showModal: false,
      // selectedImageId: null,
    };
  }
  componentDidUpdate(_, prevState) {
    const { queryValue, page } = this.state;
    if (prevState.queryValue !== queryValue || prevState.page !== page) {
      this.fetchImg();
    }
  }
  // ===============================================>
  handleSearchSubmit = queryValue => {
    if (this.state.queryValue !== queryValue) {
      this.setState({ queryValue, page: 1, images: [], total: 0 });
    }
  };
  // ===============================================>
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchImg);
  };
  // ===============================================>
  handleImageClick = imageUrl => {
    this.setState({ modalImg: imageUrl, showModal: true });
  };
  // ===============================================>
  handleCloseModal = () => {
    this.setState({ showModal: false, modalImg: '' });
  };
  // ===============================================>
  fetchImg = async () => {
    const { queryValue, page, images } = this.state;

    if (!queryValue) {
      return;
    }

    this.setState({ loading: true });

    try {
      const { total, fetchedImages } = await fetchData(queryValue, page);

      if (total) {
        const uniqueImages = fetchedImages.filter(
          newImage =>
            !images.some(existingImage => existingImage.id === newImage.id)
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...uniqueImages],
          total,
        }));
      } else {
        console.log('Nothing found, try again!');
      }
    } catch (error) {
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  };
  // ===============================================>
  render() {
    const { images, loading, showModal, modalImg } = this.state;

    return (
      <>
        <Global
          styles={{
            html: {
              boxSizing: ' border-box',
              width: '100vw',
              overflowX: 'hidden',
            },
          }}
        />
        <Global
          styles={css`
            *,
            *::before,
            *::after {
              box-sizing: inherit;
            }
          `}
        />

        <Global
          styles={css`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #212121;
            }
          `}
        />
        <Global
          styles={{
            img: {
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
            },
          }}
        />
        <Container>
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <ImageGallery
            // key={selectedImageId}
            images={images}
            onImageClick={this.handleImageClick}
          />
          {loading && <Loader />}
          {images.length > 0 && !loading && (
            <Button onClick={this.handleLoadMore} />
          )}
          {showModal && (
            <Modal
              showModal={showModal}
              image={modalImg}
              onClose={this.handleCloseModal}
              // id={selectedImageId}
            />
          )}
        </Container>
      </>
    );
  }
}
