import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { Member } from "./member";

interface FormType {
  left: Member[];
  right: Member[];
}

interface InputProps {
  index: number;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
}

const inputClassName = "p-3 border border-neutral-200 rounded-lg";
const buttonClassNamePrimary =
  "px-3 py-2 rounded-lg bg-neutral-700 text-white font-bold w-max cursor-pointer";
const buttonClassNameSecondary =
  "px-3 py-2 border-2 border-neutral-200 rounded-lg text-neutral-500 font-bold w-max cursor-pointer";
const errorMessageClassName = "text-red-900";

const requiredMessage = "入力必須です";

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    const left = btoa(JSON.stringify([...data.left]));
    const right = btoa(JSON.stringify([...data.right]));

    const builtParams = new URLSearchParams({
      left: left,
      right: right,
    }).toString();
    window.open("/multiple?" + builtParams, "_blank");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5 bg-red-100 flex flex-col gap-3">
        <LeftInputMember index={0} register={register} errors={errors} />
        <LeftInputMember index={1} register={register} errors={errors} />
      </div>
      <div className="p-5 bg-blue-100 flex flex-col gap-3">
        <RightInputMember index={0} register={register} errors={errors} />
        <RightInputMember index={1} register={register} errors={errors} />
      </div>

      <div className="m-4 flex gap-4">
        <label>
          <p className={buttonClassNamePrimary}>対戦カードを生成</p>
          <input type="submit" className="hidden" />
        </label>

        <button
          type="button"
          className={buttonClassNameSecondary}
          onClick={() => reset()}
        >
          リセット
        </button>
      </div>
    </form>
  );
};

const LeftInputMember: FC<InputProps> = ({ index, register, errors }) => {
  return (
    <>
      <p className="font-bold">左側プレイヤー{index}</p>
      <input
        type="text"
        placeholder="ニックネーム"
        className={inputClassName}
        {...register(
          `left.${index}.name`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
      />
      {errors.left && (
        <p className={errorMessageClassName}>{errors.left.message}</p>
      )}
      <input
        type="text"
        placeholder="画像URL"
        className={inputClassName}
        {...register(
          `left.${index}.url`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
      />
      {errors.left && (
        <p className={errorMessageClassName}>{errors.left.message}</p>
      )}
      <SelectVariant
        side="left"
        index={index}
        register={register}
      ></SelectVariant>
    </>
  );
};

const RightInputMember: FC<InputProps> = ({ index, register, errors }) => {
  return (
    <>
      <p className="font-bold">右側プレイヤー{index}</p>
      <input
        type="text"
        placeholder="ニックネーム"
        className={inputClassName}
        {...register(
          `right.${index}.name`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
      />
      {errors.right && (
        <p className={errorMessageClassName}>{errors.right.message}</p>
      )}
      <input
        type="text"
        placeholder="画像URL"
        className={inputClassName}
        {...register(
          `right.${index}.url`,
          index === 0 ? { required: requiredMessage } : undefined
        )}
      />
      {errors.right && (
        <p className={errorMessageClassName}>{errors.right.message}</p>
      )}
      <SelectVariant
        side="right"
        index={index}
        register={register}
      ></SelectVariant>
    </>
  );
};

interface VariantProps {
  side: "left" | "right";
  index: number;
  register: UseFormRegister<FormType>;
}

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

export default Form;
