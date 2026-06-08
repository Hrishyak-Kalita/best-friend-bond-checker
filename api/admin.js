
import { Redis } from "@upstash/redis";

const redis = new Redis({

  url: process.env.KV_REST_API_URL,

  token: process.env.KV_REST_API_TOKEN

});

export default async function handler(req, res) {

  const key =
  req.query.key;

  /* SIMPLE ADMIN SECRET */

  if(key !== "hrishadmin"){

    return res.status(401).json({
      error:"Unauthorized"
    });

  }

  try{

    const visits =
    await redis.get("visits");

    const recentBonds =
    await redis.get("recentBonds");

    return res.status(200).json({

      totalVisitors:
      Number(visits || 0),

      recentBonds:
      recentBonds || []

    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      error:error.message
    });

  }

}

