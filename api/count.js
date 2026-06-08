
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  try {

    /* =========================
       VISITOR COUNT
    ========================= */

    let visits =
    await redis.get("visits");

    visits =
    Number(visits || 0);

    visits++;

    await redis.set(
      "visits",
      visits
    );

    /* =========================
       STORE RECENT BONDS
    ========================= */

    if(req.method === "POST"){

      const body =
      req.body;

      let recent =
      await redis.get("recentBonds");

      if(!Array.isArray(recent)){

        recent = [];
      }

      recent.unshift({

        name1:
        body.name1?.slice(0,15),

        name2:
        body.name2?.slice(0,15),

        score:
        body.score,

        time:
        Date.now()

      });

      recent =
      recent.slice(0,20);

      await redis.set(
        "recentBonds",
        recent
      );

    }

    return res.status(200).json({
      visits
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      visits:0,

      error:error.message

    });

  }

}

