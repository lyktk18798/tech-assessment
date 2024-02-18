const CONFIG: RequestInit = {
  headers: {
    "Content-Type": "text/plain",
  },
};

export async function shortenURL(payload: string): Promise<string> {
  const config = { ...CONFIG };
  config.method = "POST";
  config.body = payload;
  return await fetch(`${process.env.REACT_APP_API_ENDPOINT}/create`, config)
      .then(async response => {
          if (!response.ok) {
              throw new Error(await response.text());
          }
          return response.text();
      })
}
