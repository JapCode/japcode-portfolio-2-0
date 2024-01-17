type CapitalizeFirstLetter<T extends string> =
  T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;

const capitalizeFirstLetter = <T extends string>(
  input: T,
): CapitalizeFirstLetter<T> => {
  return (input.charAt(0).toUpperCase() +
    input.slice(1)) as CapitalizeFirstLetter<T>;
};

export default capitalizeFirstLetter;
