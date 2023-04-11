import { FC } from "react";
import { useForm } from "react-hook-form";
import { Member } from "./member";
import NameUrlInputPair from "./NameUrlInputPair";

interface FormType {
  left: Member[];
  right: Member[];
}

const buttonClassNamePrimary =
  "px-3 py-2 rounded-lg bg-neutral-700 text-white font-bold w-max cursor-pointer";
const buttonClassNameSecondary =
  "px-3 py-2 border-2 border-neutral-200 rounded-lg text-neutral-500 font-bold w-max cursor-pointer";

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
        <NameUrlInputPair
          csvData={[]}
          side="left"
          index={0}
          register={register}
          errors={errors}
        />
        <NameUrlInputPair
          csvData={[]}
          side="left"
          index={1}
          register={register}
          errors={errors}
        />
      </div>
      <div className="p-5 bg-blue-100 flex flex-col gap-3">
        <NameUrlInputPair
          csvData={[]}
          side="right"
          index={0}
          register={register}
          errors={errors}
        />
        <NameUrlInputPair
          csvData={[]}
          side="right"
          index={1}
          register={register}
          errors={errors}
        />
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

export default Form;
