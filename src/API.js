import { use, useState } from 'react';

export function GetAllUsers() {
  const [allGuests, setAllGuests] = useState([]);
  const baseUrl = 'http://localhost:4000';
  return (
    <>
      <div>
        <button
          onClick={async function getAll() {
            const response = await fetch(`${baseUrl}/guests`);
            const guests = await response.json();
            setAllGuests(guests);
          }}
        >
          Download all guests
        </button>
      </div>
      <div>
        {allGuests.map((allGuest) => (
          <div key={allGuest.id}>
            <span>{allGuest.firstName}</span>
            <span>{allGuest.lastName}</span>
            <span>{allGuest.attending ? 'Attending' : 'Not attending'}</span>
          </div>
        ))}
      </div>
    </>
  );
}
export function GetUser() {
  const [singleUserFirstName, setSingleUserFirstName] = useState('');
  const [singleUserLastName, setSingleUserLastName] = useState('');
  const [singleUser, setSingleUser] = useState({});
  const baseUrl = 'http://localhost:4000';
  return (
    <>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSingleUser({
              id: 1,
              firstName: singleUserFirstName,
              lastName: singleUserLastName,
              attending: false,
            });
          }}
        >
          <input
            placeholder="Enter First Name"
            value={singleUserFirstName}
            onChange={(event) => {
              setSingleUserFirstName(event.currentTarget.value);
            }}
          />
          <input
            placeholder="Enter Last Name"
            value={singleUserLastName}
            onChange={(event) => {
              setSingleUserLastName(event.currentTarget.value);
            }}
          />
        </form>
      </div>
      <div>
        <button
          onClick={async function GetOne() {
            const response = await fetch(`${baseUrl}/guests/${singleUser.id}`);
            const guest = await response.json();
            console.log(guest);
          }}
        >
          Download guest
        </button>
      </div>
    </>
  );
}

export function PostUsers() {
  const baseUrl = 'http://localhost:4000';
  return (
    <div>
      <button
        onClick={async function Post() {
          const response = await fetch(`${baseUrl}/guests`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
          });
          const createdGuest = await response.json();
          console.log(createdGuest);
        }}
      >
        Create new guest
      </button>
    </div>
  );
}

export function UpdateUser() {
  const baseUrl = 'http://localhost:4000';
  return (
    <div>
      <button
        onClick={async function Update() {
          const response = await fetch(`${baseUrl}/guests/1`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ attending: true }),
          });
          const updatedGuest = await response.json();
          console.log(updatedGuest);
        }}
      >
        Update guest
      </button>
    </div>
  );
}

export function DeleteUser() {
  const baseUrl = 'http://localhost:4000';
  return (
    <div>
      <button
        onClick={async function Delete() {
          const response = await fetch(`${baseUrl}/guests/1`, {
            method: 'DELETE',
          });
          const deletedGuest = await response.json();
          console.log(deletedGuest);
        }}
      >
        Delete guest
      </button>
    </div>
  );
}
