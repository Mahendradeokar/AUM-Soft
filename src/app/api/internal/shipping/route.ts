import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // console.log('API called');
    // let username = '308b123ba42448a3251a81321a0222880a20'
    // let password = '1d8025ecf290d8c170ba03d169aae0b24'
    // for API Key for rj accounts
    let username = 'a66008645569619492a5797191b383930203';
    let password = '174134c0729930f2ca3a5f9c5eded7ff6';

    // let username='b914339729338a39a678938374982a3ab796'
    // let password= '3ba49ae82cf3e7a9a8b541a72aaf3a33c'
    const base64Credentials = btoa(`${username}:${password}`);

    const config = {
      method: 'get', // Change the HTTP method as needed (e.g., 'post', 'put', 'delete', etc.)
      url: 'https://api.flipkart.net/oauth-service/oauth/token?grant_type=client_credentials&scope=Seller_Api',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/json', // Adjust the content type if necessary
      },
    };
    const data = await axios(config);
    // console.log(data.data);
    // return res.json(data.data);
    // const secondApi = {
    //   method: 'Get', // Change the HTTP method as needed (e.g., 'post', 'put', 'delete', etc.)
    //   url: `https://api.flipkart.net/sellers/listings/v3/${req.query.id}`,
    //   headers: {
    //     Authorization: `Bearer${data.data.access_token}`,
    //     'Content-Type': 'application/json', // Adjust the content type if necessary
    //   },
    // };
    // const data1 = await axios(secondApi);
    // console.log('data1.data :>> ', data1.data);
    // return res.send(data1.data);

    // const returnAPi = {
    //   method: "GET",
    //   url: 'https://api.flipkart.net/sellers/v2/returns?source=courier_return',
    //   // url: "https://api.flipkart.net/napi/payments/fetchOutstandingPaymentDetails",
    //   headers: {
    //     'Authorization': `Bearer${data.data.access_token}`,
    //     'Content-Type': 'application/json', // Adjust the content type if necessary
    //   }
    // }

    // const returnData = await axios(returnAPi);
    // console.log("returndata", returnData.data);

    // console.log(req.query.id);
    const returnAPi = {
      method: 'POST',
      // url: `https://api.flipkart.net/sellers/v2/orders/${req.query.id}`
      url: 'https://api.flipkart.net/sellers/v3/shipments/filter',
      // url: `https://api.flipkart.net/listings/v3/${req.query.id}`,
      // url: "https://api.flipkart.net/napi/payments/fetchOutstandingPaymentDetails",
      data: {
        filter: {
          type: 'postDispatch',
          states: ['DELIVERED'],
        },
      },
      headers: {
        Authorization: `Bearer${data.data.access_token}`,
        'Content-Type': 'application/json', // Adjust the content type if necessary
      },
    };

    const returnData = await axios(returnAPi);
    // console.log('returndata', returnData.data);
    return NextResponse.json({ message: 'password change successfully', data: returnData }, { status: StatusCodes.OK });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
