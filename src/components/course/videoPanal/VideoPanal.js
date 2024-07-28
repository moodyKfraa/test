import React from "react";

function VideoPanal({ data }) {
  return (
    <div>
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          title="rgh"
          src={data.url}
          loading="lazy"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>
  );
}

export default VideoPanal;
