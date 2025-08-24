import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import { MenuButton } from './components/MenuButton/MenuButton';
import { ControlledForm } from './components/ControlledForm/ControlledForm';
import { Modal } from './components/Modal/Modal';
import { useState } from 'react';

type FormType = 'UncontrolledForm' | 'ControlledForm' | null;

function App() {
  const [currentForm, setCurrentForm] = useState<FormType>(null);

  const changeForm = (name: FormType) => {
    setCurrentForm(name);
  };
  return (
    <>
      <div className="flex justify-center gap-2 mt-4">
        <MenuButton
          nameButton="Uncontrolled form"
          handleClick={() => changeForm('UncontrolledForm')}
        />
        <MenuButton
          nameButton="Controlled form"
          handleClick={() => changeForm('ControlledForm')}
        />
      </div>
      <Modal>
        <div className="flex col-auto mt-8">
          {!currentForm && <p className="mx-auto">Select form</p>}
          {currentForm && currentForm === 'UncontrolledForm' && (
            <UncontrolledForm />
          )}
          {currentForm && currentForm === 'ControlledForm' && (
            <ControlledForm />
          )}
        </div>
      </Modal>
    </>
  );
}

export default App;
