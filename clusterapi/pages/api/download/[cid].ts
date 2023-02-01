import * as stream from 'stream';
import { promisify } from 'util';
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

const finished = promisify(stream.finished);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try{
    const { query: { cid } } = req;
      const cidString = Array.isArray(cid)?cid[0]:cid
    // let cid = req.query.get(cid)//QmQvBEGk2iJ4P1TMkhksDyqZ8S8uqVqiYmpYUvbyimskf1
    let doownloadAddress = "http://ipfs0:8080/ipfs/"+ cidString;
    console.log('download string is:', doownloadAddress);
    if (req.method == "GET") {
      axios({
        method: 'get',
        url: doownloadAddress,
        responseType: 'stream',
      }).then((response) => {
        response.data.pipe(res);
        return finished(res); //this is a Promise
      },
      (error) => {
        console.log("error  in connection to ipfs daemon");
        res.status(405).end(); //json({"status":false,"error": {"message":"unable to connect", "code":1005,}, })
    }
    );
    } else {
      //only POST req.method allowed for this operation
      console.log('Ony GET method allowed. req uri:', req.url)
      res.status(405).end(); //json({"status":false,"error": {"message": "Method not allowed", "code":1002}});
    }
}catch (error) {
        console.error(error)
        res.status(405).end();
      }
}
