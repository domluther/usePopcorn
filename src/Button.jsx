/*eslint react/prop-types: "off"*/

export function Button({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? '–' : '+'}
    </button>
  );
}
