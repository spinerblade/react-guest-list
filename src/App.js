import { useEffect, useState } from 'react';
import AddGuest from './AddGuest';
import * as Api from './API';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [firstNameRemove, setFirstNameRemove] = useState('');
  const [lastNameRemove, setLastNameRemove] = useState('');

  return (
    <>
      <h1>Enter Guest</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setGuests([
            ...guests,
            {
              id: guests.length,
              firstName: firstName,
              lastName: lastName,
              attending: false,
            },
          ]);
          setFirstName('');
          setLastName('');
        }}
      >
        <label htmlFor="First Name">Enter First Name</label>
        <input
          id="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.currentTarget.value);
            console.log('first name', { firstName });
          }}
        />
        <label htmlFor="Last Name">Enter Last Name</label>
        <input
          id="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.currentTarget.value);
            console.log('last name', { lastName });
          }}
        />
        <div>
          <button>Add Guest</button>
        </div>
      </form>

      {guests.map((guest) => {
        return (
          <AddGuest
            key={guest.id}
            firstName={guest.firstName}
            lastName={guest.lastName}
          />
        );
      })}

      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newGuestList = guests.filter((guest) => {
              return !(
                guest.firstName === firstNameRemove &&
                guest.lastName === lastNameRemove
              );
            });
            setGuests(newGuestList);
            setFirstNameRemove('');
            setLastNameRemove('');
          }}
        >
          <input
            placeholder="First Name to be removed"
            value={firstNameRemove}
            onChange={(event) => {
              setFirstNameRemove(event.currentTarget.value);
            }}
          />

          <input
            placeholder="Last Name to be removed"
            value={lastNameRemove}
            onChange={(event) => {
              setLastNameRemove(event.currentTarget.value);
            }}
          />
          <button>Remove</button>
        </form>
      </div>
      <Api.GetAllUsers />
      <Api.GetUser />
      <Api.PostUsers />
      <Api.UpdateUser />
      <Api.DeleteUser />
    </>
  );
}
