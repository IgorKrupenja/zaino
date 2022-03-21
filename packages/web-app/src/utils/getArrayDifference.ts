export const getArrayDifference = <T>(
  array1: Array<T> | undefined,
  array2: Array<T> | undefined
) => {
  return array1?.filter((element) => !array2?.includes(element));
};
