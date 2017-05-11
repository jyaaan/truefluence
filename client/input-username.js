const React = require('react');
const store = require('./store');


const UsernameInput = props => {
  const { text } = props;
  const handleChange = event => {
    store.dispatch({
      type: 'INPUT_CHANGED',
      text: event.target.value
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const username = store.getState().usernameInput;
    fetch('/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username })
    })
      .then((result) => result.json())
      .then(user => {
        store.dispatch({
          type: 'SAVE_PROFILE',
          profile: user
        });
      })
  };
  return (
    <div className='column'>
      <div className='ui action input'>
        <input
          type='text'
          placeholder='IG Username'
          onChange={ handleChange }
          ></input>
        <button
          className='ui button'
          onClick={ handleSubmit }>Search</button>
      </div>
    </div>
  );
}

module.exports = UsernameInput;
