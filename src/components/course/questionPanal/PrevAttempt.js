import React from "react";

function PrevAttempt({ prevAttempt, handleShowPrevAttemptResults }) {
  return (
    <div>
      {prevAttempt.elId}
      <button onClick={handleShowPrevAttemptResults}>click</button>
    </div>
  );
}

export default PrevAttempt;
