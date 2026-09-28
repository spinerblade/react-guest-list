import './index.css';
import { useState } from 'react';

export function GetAllUsers({ allGuests, setAllGuests }) {
  const baseUrl = 'http://localhost:4000';
  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    setAllGuests(allGuests.filter((allGuest) => allGuest.id !== id));
  }
  return (
    <div data-test-id="guest" className="flex items-end gap-4 mb-6">
      {allGuests.map((allGuest) => (
        <div key={allGuest.id}>
          <h2 className="text-2xl">Guest</h2>
          <button
            aria-label={`Remove ${allGuest.firstName} ${allGuest.lastName}`}
            className="text-red-600 hover:text-red-800 font-bold px-2"
            onClick={() => deleteGuest(allGuest.id)}
          >
            ✕
          </button>
          <span>{allGuest.firstName}</span>
          <span>{allGuest.lastName}</span>
          <span>{allGuest.attending ? 'Attending' : 'Not attending'}</span>
          <input
            type="checkbox"
            aria-label={`${allGuest.firstName} ${allGuest.lastName} attending status`}
            checked={allGuest.attending}
            onChange={async function (event) {
              const checked = event.currentTarget.checked;
              await fetch(`${baseUrl}/guests/${allGuest.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ attending: checked }),
              });
              setAllGuests(
                allGuests.map((guest) =>
                  guest.id === allGuest.id
                    ? { ...guest, attending: checked }
                    : guest,
                ),
              );
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function DeleteUser({ allGuests, setAllGuests }) {
  const baseUrl = 'http://localhost:4000';
  const [firstNameRemove, setFirstNameRemove] = useState('');
  const [lastNameRemove, setLastNameRemove] = useState('');
  return (
    <div className="flex items-end gap-4 mb-6">
      <h2 className="text-2xl text-blue-800">Remove Guest by Name</h2>
      <form
        className="flex items-end gap-4 mb-6"
        onSubmit={async function (event) {
          event.preventDefault();
          const guestRemove = allGuests.find((allGuest) => {
            return (
              allGuest.firstName === firstNameRemove &&
              allGuest.lastName === lastNameRemove
            );
          });
          if (!guestRemove) {
            console.log('No matching guest found');
            return;
          }

          await fetch(`${baseUrl}/guests/${guestRemove.id}`, {
            method: 'DELETE',
          });
          setAllGuests(
            allGuests.filter((allGuest) => allGuest.id !== guestRemove.id),
          );
          setFirstNameRemove('');
          setLastNameRemove('');
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="First Name">Enter First Name</label>
          <input
            id="First Name"
            placeholder="First Name"
            value={firstNameRemove}
            onChange={(event) => {
              setFirstNameRemove(event.currentTarget.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Last Name">Enter Last Name</label>
          <input
            id="Last Name"
            placeholder="Last Name"
            value={lastNameRemove}
            onChange={(event) => {
              setLastNameRemove(event.currentTarget.value);
            }}
          />
        </div>
        <div>
          <button
            aria-label={`Remove ${firstNameRemove} ${lastNameRemove}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Remove guest
          </button>
        </div>
      </form>
    </div>
  );
}

export function DeleteAllUsers({ allGuests, setAllGuests }) {
  const baseUrl = 'http://localhost:4000';

  return (
    <div className="flex items-end gap-4 mb-6">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={async function () {
          await Promise.all(
            allGuests.map(async function (allGuest) {
              await fetch(`${baseUrl}/guests/${allGuest.id}`, {
                method: 'DELETE',
              });
            }),
          );
          setAllGuests([]);
        }}
      >
        Delete all guests
      </button>
    </div>
  );
}
