interface MenuButtonProps {
  nameButton: string;
  handleClick: () => void;
}

export const MenuButton = ({ nameButton, handleClick }: MenuButtonProps) => {
  return (
    <>
      <button
        className="no-underline text-black border-2 border-white bg-neutral-200 hover:border-gray-200 px-4 py-2 rounded-xl active:scale-94"
        onClick={handleClick}
      >
        {nameButton}
      </button>
    </>
  );
};
