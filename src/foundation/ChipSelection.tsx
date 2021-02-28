import * as React from "react";

interface ChipData {
  value: string;
  text: string;
}

export type ChipSelectionProps = {
  placeholder: string;
  inputValue: string;
  selectedData: ChipData[];
  disabled?: boolean;
  selection: ChipData[];
  onChipChange: (value: ChipData[]) => void;
  onInputChange: React.ChangeEventHandler<any>;
  onInputBlur: React.FocusEventHandler<any>;
};

export const ChipSelection = (props: ChipSelectionProps) => {
  const {
    placeholder,
    inputValue,
    selectedData = [],
    disabled = false,
    selection = [],
    onChipChange,
    onInputChange,
    onInputBlur,
  } = props;
  const divRef = React.useRef<HTMLElement>();
  const inputRef = React.useRef<HTMLElement>();
  const [focus, setFocus] = React.useState(false);
  return (
    <div ref={divRef as any}>
      <label className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      <div className="relative" onClick={() => inputRef.current?.focus()}>
        <div
          className={
            "mt-1 py-1 px-2 block w-full border rounded flex items-center outline-none" +
            (focus ? " ring ring-black" : "")
          }
        >
          {selectedData.map((d, i) => (
            <div
              key={i}
              className="rounded-full border px-3 py-1 flex items-center"
            >
              <span>{d.text}</span>
              <button
                className="outline-none focus:outline-none px-1 w-5 h-5"
                onClick={() => {
                  const newSelectedData = [...selectedData];
                  newSelectedData.splice(newSelectedData.indexOf(d), 1);
                  onChipChange(newSelectedData);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          {!disabled && (
            <input
              ref={inputRef as any}
              type="text"
              className="py-1 px-2 focus:outline-none"
              value={inputValue}
              onFocus={() => setFocus(true)}
              onBlur={(e) => {
                setFocus(false);
                onInputBlur(e);
              }}
              onChange={onInputChange}
            />
          )}
        </div>
        {selection.length > 0 && (
          <div className="absolute mt-1 left-0 w-full">
            <div className="border rounded">
              {selection.map((e, i) => (
                <div
                  className={
                    "p-2 hover:bg-gray-100" + (i > 0 ? " border-t" : "")
                  }
                  onClick={() => onChipChange(selectedData.concat([e]))}
                >
                  {e.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChipSelection;
