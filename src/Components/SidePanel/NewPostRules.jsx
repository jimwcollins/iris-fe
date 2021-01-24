import React from 'react';

function NewPostRules({ screen }) {
  const isMob = screen === 'tabPhone';

  return (
    <div className={isMob ? 'postRulesMob' : 'topicbox'}>
      {isMob ? (
        <p className="postRulesMob__head">Posting to The Iris</p>
      ) : (
        <div className="box__header">
          <p className="box__header__text">Posting to The Iris</p>
        </div>
      )}
      <p className={isMob ? 'postRulesMob__sub' : 'box__desc'}>
        A polite note to please...
      </p>
      <ol className="newPostRules">
        <li>Treat each other with respect</li>
        <li>Behave as you would in real life</li>
        <li>Credit any referenced content</li>
        <li>Look for duplicate articles before posting</li>
        <li>Read any topic rules</li>
      </ol>
    </div>
  );
}

export default NewPostRules;
