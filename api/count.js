
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  try {

    let visits =
    await redis.get("visits");

    visits = Number(visits || 0);

    visits++;

    await redis.set(
      "visits",
      visits
    );

    return res.status(200).json({
      visits: visits
    });

  } catch (error) {

    return res.status(500).json({
      visits: 0,
      error: error.message
    });

  }

}

