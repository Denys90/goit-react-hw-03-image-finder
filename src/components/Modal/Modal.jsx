import React, { Component } from 'react';
import { Overlay } from './Overlay';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleImageClick = e => {
    e.stopPropagation();
  };

  render() {
    const { showModal, image, onClose } = this.props;

    return (
      <Overlay showModal={showModal} onClick={onClose}>
        <div>
          <img src={image} alt="" onClick={this.handleImageClick} />
        </div>
      </Overlay>
    );
  }
}

export default Modal;
