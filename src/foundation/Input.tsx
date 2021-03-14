export type InputProps = React.InputHTMLAttributes<any>;

export const Input = (props: InputProps) => {
  const { id, type, name, placeholder, value, onChange, onBlur } = props;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      {type === "plaintext" ? (
        <p
          id={id}
          data-testid={id}
          className="mt-1 py-1 px-2 block w-full border border-transparent"
        >
          {value}
        </p>
      ) : (
        <input
          id={id}
          data-testid={id}
          type={type}
          name={name}
          className="mt-1 py-1 px-2 block w-full border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
