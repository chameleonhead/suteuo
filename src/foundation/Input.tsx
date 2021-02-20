export type InputProps = React.InputHTMLAttributes<any>;

export const Input = (props: InputProps) => {
  const { id, type, name, placeholder, value, onChange, onBlur } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className="mt-1 block w-full border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
