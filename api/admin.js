
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  const secret =
  req.query.secret;

  const ADMIN_SECRET =
  process.env.ADMIN_SECRET;

  if(secret !== ADMIN_SECRET){

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
      visits || 0,

      totalRecentBonds:
      recentBonds?.length || 0,

      recentBonds:
      recentBonds || []

    });

  }catch(error){

    return res.status(500).json({

      error:error.message

    });

  }

}
