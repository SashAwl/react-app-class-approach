import { useForm } from 'react-hook-form';
import { type FormValues } from '../../types/formValuesType';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../store/formSlice';

export const ControlledForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      accept: false,
      country: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    dispatch(setFormData(data));
    console.log(data);
  };

  return (
    <form
      data-testid="controlled-form"
      className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          required
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          required
        />
      </div>

      <div>
        <span className="mr-8">Gender</span>
        <label className="mr-4">
          <input
            type="radio"
            value="male"
            {...register('gender')}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            {...register('gender')}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          />
          Female
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...register('accept')}
            className="border-1 border-gray-300 rounded-lg p-2 ml-2"
            required
          />
          Accept Terms & Conditions
        </label>
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          list="countries"
          {...register('country')}
          className="border-1 border-gray-300 rounded-lg p-2 ml-2"
          required
        />
        <datalist id="countries">
          <option value="United States" />
          <option value="Canada" />
          <option value="Germany" />
          <option value="France" />
          <option value="Japan" />
        </datalist>
      </div>

      <button type="submit" className=" bg-blue-100 rounded-lg p-2 ml-2">
        Submit
      </button>
    </form>
  );
};
