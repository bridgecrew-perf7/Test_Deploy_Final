import React from 'react';

const LoadingIndicatorDefault = () => {
  return (
    <div>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1"
        alt="loading"
        className="loading-indicator"
      />
    </div>
  );
};
const ErrorHandlerDefault = ({ errorMsg }) => {
  return (
    <div>
      <p>Error : {errorMsg}</p>
    </div>
  );
};
interface pageRendererProps {
  state: any;
  loadingIndicator?: React.Component;
  errorHandler?: React.Component;
}
// handle data loading
const pageRenderer = (Wrapped) => {
  return (props: pageRendererProps) => {
    return props.state.isLoading ? (
      props.loadingIndicator || <LoadingIndicatorDefault />
    ) : props.state.hasError ? (
      props.errorHandler || <ErrorHandlerDefault errorMsg={props.state.error} />
    ) : (
      <Wrapped />
    );
  };
};

export default pageRenderer;
