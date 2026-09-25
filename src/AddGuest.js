import { useState } from 'react';

export default function AddGuest({ firstName, lastName }) {
  const [status, setStatus] = useState(false);
  return (
    <div data-test-id="guest">
      <h2>Guest</h2>
      The name of the guest is: {firstName} {lastName} and he is{' '}
      {status ? 'attending' : 'not attending'}.
      <input
        type="checkbox"
        aria-label="{firstName} {lastName} attending status"
        value={status}
        onChange={() => {
          setStatus(!status);
        }}
      />
    </div>
  );
}
