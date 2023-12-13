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
  componentDidMount() {
    this.loadFromLocalStorage();
  }
  // ===============================================>
  componentDidUpdate(_, prevState) {
    const { queryValue, page } = this.state;
    if (prevState.queryValue !== queryValue || prevState.page !== page) {
      this.fetchImg();

      localStorage.setItem('myData', JSON.stringify(this.state));
    }
  }
  // ===============================================>
  saveToLocalStorage = () => {
    const { images, queryValue, page, total } = this.state;
    const dataToSave = { images, queryValue, page, total };

    localStorage.setItem('myData', JSON.stringify(dataToSave));
  };
  // ===============================================>
  handleSearchSubmit = queryValue => {
    if (this.state.queryValue !== queryValue) {
      this.setState(
        { queryValue, page: 1, images: [], total: 0 },
        this.saveToLocalStorage
      );
    }
  };
  // ===============================================>
  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImg();
        this.saveToLocalStorage();
      }
    );
  };
  // ===============================================>
  handleImageClick = imageUrl => {
    this.setState({ modalImg: imageUrl, showModal: true });
  };
  // ===============================================>
  handleCloseModal = () => {
    this.setState({ showModal: false, modalImg: '' }, this.saveToLocalStorage);
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

        this.setState(
          prevState => ({
            images: [...prevState.images, ...uniqueImages],
            total,
          }),
          () => this.saveToLocalStorage()
        );
      } else {
        alert('Nothing found, try again!');
      }
    } catch (error) {
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  };
  // ===============================================>
  loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('myData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.setState(parsedData);
    }
  };
  // ===============================================>
  render() {
    const { images, loading, showModal, modalImg } = this.state;

    return (
      <>
        <Global
          styles={css`
            html: {
              boxSizing: ' border-box',
              width: '100vw',
              overflowX: 'hidden',
            },
            img: {
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
            },

            *,
            *::before,
            *::after {
              box-sizing: inherit;
            }
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
        <Container>
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <ImageGallery
            // key={selectedImageId}
            images={images}
            onImageClick={this.handleImageClick}
          />
          {loading && <Loader />}
          {images.length > 11 && !loading && (
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
