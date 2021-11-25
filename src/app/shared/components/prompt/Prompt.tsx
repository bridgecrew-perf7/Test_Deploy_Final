import React, { useState, useEffect } from 'react';
import { useBlocker, useNavigate, useLocation } from 'react-router-dom';

const Prompt = (props: {
  title: string;
  message: string;
  isBlocking: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPromptShowed, setIsPromptShowed] = useState(false);
  const [newPath, setNewPath] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const handleBlockedNavigation = (nextLocation: any) => {
    if (nextLocation.location.pathname !== location.pathname) {
      setIsPromptShowed(true);
      setNewPath(nextLocation.location.pathname);
    }
  };
  const cancelNavigation = () => {
    setIsPromptShowed(false);
  };
  const confirmNavigation = () => {
    setIsPromptShowed(false);
    setConfirmedNavigation(true);
  };

  useEffect(() => {
    if (confirmedNavigation) {
      navigate(newPath);
    }
  }, [confirmedNavigation]);

  useBlocker(handleBlockedNavigation, props.isBlocking);

  return (
    <>
      {isPromptShowed && (
        <>
          <div className="modal-shadow" />
          <div className="prompt">
            <h3 className="prompt-title">{props.title}</h3>
            <p className="prompt-message">{props.message}</p>
            <div className="prompt-actions">
              <button
                className="btn btn-primary prompt-btn"
                onClick={confirmNavigation}
              >
                Yes
              </button>
              <button
                className="btn btn-outline prompt-btn"
                onClick={cancelNavigation}
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Prompt;
