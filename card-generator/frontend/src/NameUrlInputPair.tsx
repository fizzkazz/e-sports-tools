import { FC, useState, ChangeEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Member } from "./member";

interface FormType {
  left: Member[];
  right: Member[];
}

type CSVItem = {
  name: string;
  url: string;
};

type Side = "left" | "right";

type NameUrlInputPairProps = {
  csvData: CSVItem[];
  side: Side;
  index: number;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
};

type VariantProps = {
  side: Side;
  index: number;
  register: UseFormRegister<FormType>;
};

const inputClassName = "p-3 border border-neutral-200 rounded-lg";
const errorMessageClassName = "text-red-900";
const requiredMessage = "入力必須です";

const NameUrlInputPair: FC<NameUrlInputPairProps> = ({
  csvData,
  side,
  index,
  register,
  errors,
}) => {
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedName(event.target.value);
    const selectedItem = csvData.find(
      (item) => item.name === event.target.value
    );
    setSelectedUrl(selectedItem ? selectedItem.url : selectedUrl);
  };

  const handleUrlInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUrl(event.target.value);
  };

  const errorFrom = (value: Side) => {
    switch (value) {
      case "left":
        return errors.left;
      case "right":
        return errors.right;
      default:
        const _: never = value;
    }
  };
  const error = errorFrom(side);

  return (
    <>
      <p className="font-bold">プレイヤー{index}</p>

      <input
        type="text"
        placeholder="ニックネーム"
        className={inputClassName}
        value={selectedName}
        list={`autocomplete-options-${side + index}`}
        {...register(
          `${side}.${index}.name`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
        onChange={handleNameInput}
      />
      {error && <p className={errorMessageClassName}>{error.message}</p>}
      <datalist id={`autocomplete-options-${side + index}`}>
        {csvData.map((item, index) => (
          <option key={index} value={item.name}>
            {item.url}
          </option>
        ))}
      </datalist>
      <input
        type="text"
        value={selectedUrl}
        placeholder="画像URL"
        className={inputClassName}
        {...register(
          `${side}.${index}.url`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
        onChange={handleUrlInput}
      />
      {error && <p className={errorMessageClassName}>{error.message}</p>}
      <SelectVariant
        side={side}
        index={index}
        register={register}
      ></SelectVariant>
    </>
  );
};

const SelectVariant: FC<VariantProps> = ({ side, index, register }) => {
  return (
    <>
      <label>
        <input
          type="radio"
          value="red"
          {...register(`${side}.${index}.variant`)}
        ></input>
        red
      </label>
      <label>
        <input
          type="radio"
          value="blue"
          {...register(`${side}.${index}.variant`)}
        ></input>
        blue
      </label>
      <label>
        <input
          type="radio"
          value="green"
          {...register(`${side}.${index}.variant`)}
        ></input>
        green
      </label>
      <label>
        <input
          type="radio"
          value="yellow"
          {...register(`${side}.${index}.variant`)}
        ></input>
        yellow
      </label>
    </>
  );
};

export default NameUrlInputPair;
