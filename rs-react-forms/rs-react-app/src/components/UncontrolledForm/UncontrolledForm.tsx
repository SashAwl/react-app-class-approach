import { useRef } from 'react';

export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded shadow"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          ref={ageRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
        <br />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2 mt-4"
        />
      </div>

      <div>
        <span className="mr-8">Gender</span>
        <label className="mr-4">
          <input
            type="radio"
            name="gender"
            value="male"
            ref={maleRef}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            ref={femaleRef}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          />{' '}
          Female
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            ref={acceptRef}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          />{' '}
          Accept Terms & Conditions
        </label>
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          list="countries"
          ref={countryRef}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
        <datalist id="countries">
          <option value="United States" />
          <option value="Canada" />
          <option value="Germany" />
          <option value="France" />
          <option value="Japan" />
        </datalist>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
