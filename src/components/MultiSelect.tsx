import { useCloseSelect } from "@/hooks/useCloseSelect";
import * as React from "react";
import { MdKeyboardArrowRight, MdDone, MdOutlineClose } from "react-icons/md";
interface IItemSelectOption {
  label: React.ReactNode;
  value: string | number;
}

export interface IMultiSelectProps {
  items: IItemSelectOption[];

  addNewItem: (value: string) => void;
}

export function MultiSelect(props: IMultiSelectProps) {
  const { items, addNewItem } = props;

  const [newValue, setNewValue] = React.useState("");

  const [selected, setSelected] = React.useState<IItemSelectOption[]>([]);

  const { UUID, isOpen, setIsOpen } = useCloseSelect();

  const handleClickOption = (active: boolean, item: IItemSelectOption) => {
    if (!active) {
      setSelected((pre) => [...pre, item]);
    } else {
      setSelected((pre) => pre.filter((p) => p.value !== item.value));
    }
  };

  const handleOnSubmitInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewValue("");
    addNewItem(newValue);
    setSelected((pre) => [
      ...pre,
      {
        label: newValue,
        value: newValue,
      },
    ]);
  };

  const handleReset = () => {
    setSelected([]);
  };

  return (
    <div className="MultiSelect" id={UUID}>
      <div className="MultiSelect_InputWrapper">
        <form
          onSubmit={handleOnSubmitInput}
          onBlur={() => {
            setNewValue("");
          }}
        >
          <input
            className={selected.length > 0 ? "MultiSelect_InputActive" : ""}
            onClick={() => {
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
            placeholder={
              selected.length
                ? selected.map((s) => s.value).join(", ")
                : "Choose options"
            }
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
          />
          <MdKeyboardArrowRight
            className={`MultiSelect_InputWrapper_Icon ${
              isOpen ? "MultiSelect_InputWrapper_IconOpen" : ""
            }`}
          />
          {isOpen && (
            <MdOutlineClose
              onClick={handleReset}
              className={`MultiSelect_InputWrapper_IconReset `}
            />
          )}
        </form>
      </div>
      {isOpen && (
        <div className={"MultiSelect_ItemsWrapper  "}>
          {items.map((item) => {
            const active =
              selected.findIndex((s) => s.value === item.value) !== -1;
            return (
              <div
                className={`MultiSelect_Item ${
                  active ? "MultiSelect_ItemActive" : ""
                }`}
                onClick={() => {
                  handleClickOption(active, item);
                }}
              >
                {item.label}
                {active && <MdDone className={`MultiSelect_Item_Icon `} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
