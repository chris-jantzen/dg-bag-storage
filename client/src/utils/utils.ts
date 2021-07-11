export const handleChange =
  (handler: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.currentTarget.value);
  };
