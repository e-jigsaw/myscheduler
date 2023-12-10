export const postMessage = async (content: string) => {
  const res = await fetch(Bun.env.HOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });
  return res;
};
