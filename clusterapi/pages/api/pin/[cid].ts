import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try{
    if (req.method == "DELETE") {
    const { query: { cid } } = req;
    const cidString = Array.isArray(cid)?cid[0]:cid
    let deletePinAddress = "http://cluster0:9094/pins/"+ cidString;
      // const { data } =               
      await axios.delete(deletePinAddress)
      .then((response) => {
        // console.log('response data is',JSON.stringify(response.data));
        let ipfsdata = response?.data // response from the cluster
        if (typeof ipfsdata !== 'undefined' && ipfsdata !== "") {
          res.status(200).json({"status": true, "cid": ipfsdata.cid||'', "data": ipfsdata,"error": {}} )
        } else{
          //cluster is up and runnning but the operation failed. check 'docker-compose logs' for detailed log
          //one scenario of fail is if minimum number of clusters are not availbale to pin 
          res.status(406).json({"status":false,"error": {"message":"cluster error. check cluster logs", "code":1004}} )
        }
    }, (error) => {
        // console.log("error  in response:error data", error.response.data);
        // console.log('response data is',JSON.stringify(error.code));
        let ipfserror = error?.response?.data // error response from the cluster
        if (typeof ipfserror !== 'undefined' && ipfserror !== "") {
          res.status(ipfserror.code).json({"status": false, "error": ipfserror} )
        } else{
          //check 'docker-compose logs' for detailed log
          // res.status(406).json({"status":false,"error": {"message":"cluster error. check cluster logs", "code":1004}} )
          res.status(406).json({"status":false,"error": {"message":"may be unable to connect to cluster", "code":1005,}, } )
        }
    });

      // data.pipe(res);
      // console.log('response in the backed:',data)
      // return res.status(200).json({...data, name:data.name, cid: data.cid,} )

    } else {
      //only POST req.method allowed for this operation
      return res.status(405).json({"status":false,"error": {"message": "Method not allowed", "code":1002}});
    }
  }catch (error) {
    console.error(error)
    res.status(406).json({"status":false,"error": {"message":"general api error", "code":1006,}, } )
  }  
    
}
