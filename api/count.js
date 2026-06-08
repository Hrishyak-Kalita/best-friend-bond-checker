
import { Redis } from "@upstash/redis";

const redis = new Redis({

  url: process.env.KV_REST_API_URL,

  token: process.env.KV_REST_API_TOKEN

});

export default async function handler(req, res) {

  try{

    /* =========================
       VISITOR COUNT
    ========================= */

    if(req.method === "GET"){

      let visits =
      await redis.get("visits");

      visits =
      Number(visits || 0);

      visits++;

      await redis.set(
        "visits",
        visits
      );

      return res.status(200).json({
        visits
      });

    }

    /* =========================
       SAVE BOND
    ========================= */

    if(req.method === "POST"){

      const body =
      req.body;

      let recentBonds =
      await redis.get("recentBonds");

      if(!Array.isArray(recentBonds)){

        recentBonds = [];
      }

      recentBonds.unshift({

        name1: body.name1,

        name2: body.name2,

        score: body.score,

        time: Date.now()

      });

      recentBonds =
      recentBonds.slice(0,20);

      await redis.set(
        "recentBonds",
        recentBonds
      );

      return res.status(200).json({
        success:true
      });

    }

    return res.status(405).json({
      error:"Method not allowed"
    });

  }catch(error){

    console.log(error);

    return res.status(500).json({
      error:error.message
    });

  }

}

