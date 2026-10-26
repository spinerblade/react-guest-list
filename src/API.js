import './index.css';
import { useState } from 'react';

export function GetAllUsers({ allGuests, setAllGuests }) {
  const baseUrl = 'https://express-guest-list-api-memory.spinerblade.deno.net';
  async function deleteGuest(id) {
    await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    setAllGuests(allGuests.filter((allGuest) => allGuest.id !== id));
  }
  return (
    <div className="flex items-end gap-4 mb-6">
      {allGuests.map((allGuest) => (
        <div data-test-id="guest" key={allGuest.id}>
          <button
            aria-label={`Remove ${allGuest.firstName} ${allGuest.lastName}`}
            className="text-red-600 hover:text-red-800 font-bold px-2"
            onClick={() => deleteGuest(allGuest.id)}
          >
            ✕
          </button>
          <div>{allGuest.firstName}</div>
          <div>{allGuest.lastName}</div>
          <div>{allGuest.attending ? 'Attending' : 'Not attending'}</div>
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
  const baseUrl = 'https://express-guest-list-api-memory.spinerblade.deno.net';
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
          <label htmlFor="firstNameToBeRemoved">Enter Name to delete</label>
          <input
            id="firstNameToBeRemoved"
            placeholder="First Name"
            value={firstNameRemove}
            onChange={(event) => {
              setFirstNameRemove(event.currentTarget.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastNameToBeRemoved">Enter Family Name</label>
          <input
            id="lastNameToBeRemoved"
            placeholder="Last Name"
            value={lastNameRemove}
            onChange={(event) => {
              setLastNameRemove(event.currentTarget.value);
            }}
          />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Delete guest
          </button>
        </div>
      </form>
    </div>
  );
}

export function DeleteAllUsers({ allGuests, setAllGuests }) {
  const baseUrl = 'https://express-guest-list-api-memory.spinerblade.deno.net';

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
