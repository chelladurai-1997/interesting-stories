type CheckboxProps = {
  id: string;
  name: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ id, name }) => (
  <input
    type="checkbox"
    id={id}
    name={name}
    className="form-check-input mr-2"
  />
);
export default Checkbox;
