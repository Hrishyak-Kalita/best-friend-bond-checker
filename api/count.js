
import { kv } from "@vercel/kv";

export default async function handler(req, res) {

  let visits = await kv.get("visits");

  if (!visits) {
    visits = 0;
  }

  visits++;

  await kv.set("visits", visits);

  res.status(200).json({
    visits
  });

}

