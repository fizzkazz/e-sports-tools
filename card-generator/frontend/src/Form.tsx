import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Member } from "./member";
import NameUrlInputPair from "./NameUrlInputPair";
import { CSVItem, csvToObject, fetchCSV } from "./fetchCSV";

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
    setValue,
  } = useForm<FormType>();
  const [csvData, setCsvData] = useState<CSVItem[]>([]);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const csvText = await fetchCSV(file);
      const csv = csvToObject(csvText);
      setCsvData(csv);
    }
  };

  const onSubmit = (data: FormType) => {
    const left = btoa(JSON.stringify([...data.left]));
    const right = btoa(JSON.stringify([...data.right]));

    console.log(data.left);
    console.log(data.right);

    const builtParams = new URLSearchParams({
      left: left,
      right: right,
    }).toString();
    window.open("/multiple?" + builtParams, "_blank");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 bg-red-100 flex flex-col gap-3">
          <NameUrlInputPair
            csvData={csvData}
            side="left"
            index={0}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <NameUrlInputPair
            csvData={csvData}
            side="left"
            index={1}
            register={register}
            errors={errors}
            setValue={setValue}
          />
        </div>
        <div className="p-5 bg-blue-100 flex flex-col gap-3">
          <NameUrlInputPair
            csvData={csvData}
            side="right"
            index={0}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <NameUrlInputPair
            csvData={csvData}
            side="right"
            index={1}
            register={register}
            errors={errors}
            setValue={setValue}
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
      <div>
        <input type="file" accept=".csv" onChange={handleFileSelect} />
      </div>
    </>
  );
};

export default Form;
