import { redirect } from "next/navigation";

export default function handleServerErrors(
  response: Response,
  retry: ((response: Response) => Promise<Response>) | null = null,
  useCloud: boolean = false,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    if ((response.status === 401 || response.status === 403) && !useCloud) {
      if (retry) {
        return retry(response)
          .catch(() => {
            return redirect("/auth/login");
          });
      } else {
        return redirect("/auth/login");
      }
    }
    if (!response.ok) {
      return response.json().then(errorData => {
        // Create a proper Error object with a meaningful message
        const errorMessage = errorData?.detail || errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        const error = new Error(errorMessage);
        // Preserve the original error data for debugging
        Object.assign(error, {
          status: response.status,
          detail: errorData?.detail,
          data: errorData
        });
        reject(error);
      }).catch(() => {
        // If response.json() fails, create a generic error
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        Object.assign(error, { status: response.status });
        reject(error);
      });
    }

    if (response.status >= 200 && response.status < 300) {
      return resolve(response);
    }

    return reject(response);
  });
}
