import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormType {
  leftname: string;
  lefturl: string;
  rightname: string;
  righturl: string;
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
  } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    const builtParams = new URLSearchParams({
      leftname: data.leftname,
      lefturl: data.lefturl,
      rightname: data.rightname,
      righturl: data.righturl,
    }).toString();
    window.open("/cardview?" + builtParams, "_blank");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5 bg-red-100 flex flex-col gap-3">
        <p className="font-bold">プレイヤー1</p>
        <input
          type="text"
          placeholder="ニックネーム"
          className={inputClassName}
          {...register("leftname", { required: requiredMessage })}
        />
        {errors.leftname && (
          <p className={errorMessageClassName}>{errors.leftname.message}</p>
        )}
        <input
          type="text"
          placeholder="画像URL"
          className={inputClassName}
          {...register("lefturl", { required: requiredMessage })}
        />
        {errors.lefturl && (
          <p className={errorMessageClassName}>{errors.lefturl.message}</p>
        )}
      </div>
      <div className="p-5 bg-blue-100 flex flex-col gap-3">
        <p className="font-bold">プレイヤー2</p>
        <input
          type="text"
          placeholder="ニックネーム"
          className={inputClassName}
          {...register("rightname", { required: requiredMessage })}
        />
        {errors.rightname && (
          <p className={errorMessageClassName}>{errors.rightname.message}</p>
        )}
        <input
          type="text"
          placeholder="画像URL"
          className={inputClassName}
          {...register("righturl", { required: requiredMessage })}
        />
        {errors.righturl && (
          <p className={errorMessageClassName}>{errors.righturl.message}</p>
        )}
      </div>

      <div className="m-4 flex gap-4">
        <label>
          <p className={buttonClassNamePrimary}>対戦カードを生成</p>
          <input type="submit" className="hidden" />
        </label>

        <button type="button" className={buttonClassNameSecondary}>
          リセット
        </button>
      </div>
    </form>
  );
};
export default Form;
