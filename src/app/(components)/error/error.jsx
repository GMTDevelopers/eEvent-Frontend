export const getApiError = async (res) => {
  let body = null;

  try {
    body = await res.clone().json();
  } catch {}

  return {
    message:
      body?.message ??
      body?.error ??
      res.statusText ??
      "Something went wrong",

    details: body?.data ?? body?.details ?? null,

    code: body?.code ?? res.status ?? null,
  };
};
