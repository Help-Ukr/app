import useFetchRequest from "./useFetchRequest";

export default function useGetRequest<TResult = any>(url?: string) {
  return useFetchRequest<TResult>(url);
}
