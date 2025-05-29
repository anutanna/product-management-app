import React from 'react';
import Image from 'react-bootstrap/Image';

const Empty = ({ message }) => {
  return (
    <div className="text-center">
      <Image
        src="https://staticmania.cdn.prismic.io/staticmania/16994ca5-ac01-4868-8ade-1b9e276ccdb3_Property+130Folder.png"
        height={234}
        width={350}
      />
      <div className="text-center mt-2">{message}</div>
    </div>
  );
};

export const EmptyComponent = ({ message = "No data available" }) => {
  return <Empty message={message} />;
};


