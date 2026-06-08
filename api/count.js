
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  try{

    let visits =
    await redis.get("visits");

    if(!visits){

      visits = 0;
    }

    visits++;

    await redis.set(
      "visits",
      visits
    );

    res.status(200).json({
      visits
    });

  }catch(error){

    res.status(500).json({
      error: "Counter failed"
    });

  }

}

