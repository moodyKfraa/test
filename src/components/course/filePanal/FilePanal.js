import React from "react";

function FilePanal({ data }) {
  return (
    <div>
      <a
        href={`https://storage.bunnycdn.com/moody/${data.url}?accessKey=bc6cca6a-239a-44b3-8849c0c36e0d-6472-4dd4&download`}
      >
        download file
      </a>
    </div>
  );
}

export default FilePanal;
