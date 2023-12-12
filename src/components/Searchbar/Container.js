import styled from '@emotion/styled';

export const Container = styled.div`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #212121;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  form {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    background-color: #28292c;
    border-radius: 3px;
    overflow: hidden;
  }
  button {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 0;
    color: #fff;
    opacity: 0.6;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    outline: none;
    background-color: #28292c;
  }
  button:hover {
    opacity: 1;
  }
  span {
  }
  input {
    display: inline-block;
    width: 100%;
    font: inherit;
    font-size: 20px;
    border: none;
    outline: none;
    padding-left: 4px;
    padding-right: 4px;
    background-color: #28292c;
    color: #979292;
  }
  input::placeholder {
    font: inherit;
    font-size: 18px;
    color: #ddd6d6;
  }
`;
