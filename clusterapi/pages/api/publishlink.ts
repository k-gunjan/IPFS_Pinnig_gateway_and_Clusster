import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

// _____enable cors____________________________________________________
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['GET'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// _____________________end cors___________________________________________

export const config = {
    api: {
       bodyParser: false,
    }
};

type Data = {
  status: boolean,
  link?: string,
  error?: ApiError
  
}

type ApiError = {
  message: String,
  code: Number
}

let default_ipfs_url = "http://127.0.0.1/";
let ipfs_url = process.env.IPFS_URL ||default_ipfs_url 
ipfs_url += '/ipfs/'
// http://127.0.0.1/ipfs/bafkreicbe6zqqyjmpsr3v7bbpswxm6da2ls7kkdpr2igxxztxfan5vtvbm?filename=file.txt
// http://localhost:8080/ipfs/bafkreicbe6zqqyjmpsr3v7bbpswxm6da2ls7kkdpr2igxxztxfan5vtvbm?filename=h.jpeg
// https://ipfs.io/ipfs/bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi?filename=cat.jpg

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try{
    // ____________________enable cors _______________________
    // Run the middleware
    await runMiddleware(req, res, cors)
    //_____________________end cors___________________________

    if (req.method == "GET") {
        const { query: { cid, filename } } = req;
        const cidString = Array.isArray(cid)?cid[0]:cid
        const filenameString = Array.isArray(filename)?filename[0]:filename
        if (cidString && filenameString){
            return res.status(200).json({
                status:true,
                link: ipfs_url + cidString + '?filename='+ filenameString
            });

        } else {

            return res.status(405).json({"status":false,"error": {"message": "parameters required", "code":1002}, link: ipfs_url});
        }
    } else {
      //only POST req.method allowed for this operation
        return res.status(405).json({"status":false,"error": {"message": "Method not allowed", "code":1002}, link: ipfs_url});
    }
  }catch (error) {
    console.error(error)
    res.status(406).json({"status":false,"error": {"message":"general api error", "code":1006,}, link: ipfs_url } )
  }  
    
}
