export type ButtonProps = React.ButtonHTMLAttributes<any>;

export const Button = (props: ButtonProps) => {
  const { type, children, onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className="block w-full py-1 px-4 border border-transparent text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
};

export default Button;
