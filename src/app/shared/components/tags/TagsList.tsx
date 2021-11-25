import React from 'react';
import { Link } from 'react-router-dom';

const TagsList = (props: { tagsList: string[] | [] }) => {
  const defaultTag = 'general';
  return (
    <>
      {props.tagsList.length === 0 || props.tagsList[0] === '' ? (
        <Link to="#" className="btn btn-outline btn-tag">
          {defaultTag}
        </Link>
      ) : (
        props.tagsList.map((item, index) => (
          <Link to="#" className="btn btn-outline btn-tag" key={index}>
            {item}
          </Link>
        ))
      )}
    </>
  );
};

export default TagsList;
