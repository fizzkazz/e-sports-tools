export type CSVItem = {
  name: string;
  url: string;
};

// CSVデータをオブジェクトに変換する関数
export const csvToObject = (csv: string): CSVItem[] => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");

  const result = lines.slice(1).map((line) => {
    const obj: { [key: string]: string } = {};
    const row = line.split(",");

    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    return obj as CSVItem;
  });

  return result;
};

// CSVファイルの読み込み
export const fetchCSV = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = () => reject(fileReader.error);
    fileReader.readAsText(file);
  });
};
