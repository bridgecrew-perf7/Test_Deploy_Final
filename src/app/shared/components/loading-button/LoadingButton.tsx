import React from 'react';

interface LoadingButton {
  loading: boolean;
  type?: any;
  handleFunction?: () => void;
  children: any;
  classBtn: string;
}

const LoadingButton = (props: LoadingButton) => {
  return (
    <button
      className={props.classBtn}
      disabled={props.loading}
      onClick={props.handleFunction}
      type={props.type}
    >
      {props.loading ? (
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1"
          alt="loading"
          className="loading-indicator"
        />
      ) : (
        props.children
      )}
    </button>
  );
};

export default LoadingButton;
