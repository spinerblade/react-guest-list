export default function AddGuest({ firstName, lastName }) {
  return (
    <div data-test-id="guest">
      <h2>Guest</h2>
      The name of the guest is: {firstName} {lastName}
      <input
        type="checkbox"
        aria-label="{firstName} {lastName} attending status"
      />
    </div>
  );
}
