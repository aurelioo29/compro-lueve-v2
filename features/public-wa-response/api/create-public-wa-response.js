export async function createPublicWaResponseApi(payload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/wa-responses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to submit WA response");
  }

  return data;
}
