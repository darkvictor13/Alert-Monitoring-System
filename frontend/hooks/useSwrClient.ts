import { AxiosError } from "axios";
import useSWR, { MutatorCallback } from "swr";
import backendApi from "../lib/axios/backend_api";

interface useSWRClientOptions {
  revalidateOnFocus?: boolean;
}

export function useSWRClient<Data = unknown, Error = unknown>(
  url: string,
  options: useSWRClientOptions = {
    revalidateOnFocus: true,
  }
) {
  const { data, error, mutate } = useSWR<Data, AxiosError<Error>>(
    url,
    async (url: string) => {
      try {
        const response = await backendApi.get<Data>(url);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: options?.revalidateOnFocus,
    }
  );

  return {
    data,
    error,
    isLoading: !data && !error && !!url,
    localMutate: (data?: Data | Promise<Data> | MutatorCallback<Data>) =>
      mutate(data, false),
    mutateAndRefetch: (data?: Data | Promise<Data> | MutatorCallback<Data>) =>
      mutate(data, true),
  };
}
