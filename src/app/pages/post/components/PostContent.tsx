import React from 'react';
import ReactHtmlParser from 'react-html-parser';

interface PostContentProps {
  content: string;
}
const PostContent = (props: PostContentProps) => {
  const { content } = props;
  const transform = (node) => {
    if (node.type === 'tag') {
      switch (node.name) {
        case 'figcaption':
          node.attribs.class = 'img-caption';
          break;
        case 'p':
          node.attribs.class = 'paragraph-block';
          break;
        case 'blockquote':
          node.attribs.class = 'quote';
          break;
        case 'img':
          node.attribs.class = 'img-content';
          break;
        case 'a':
          node.attribs.class = 'link';
          node.attribs.target = 'blank';
          break;
        case 'ul':
          node.attribs.class = 'unordered-list-content';
          break;
        case 'ol':
          node.attribs.class = 'ordered-list-content';
          break;
        case 'li':
          node.attribs.class = 'item-content';
          break;
        default:
          return;
      }
    }
  };
  return (
    <div className="post-content">
      {ReactHtmlParser(content, { transform })}
    </div>
  );
};

export default PostContent;
