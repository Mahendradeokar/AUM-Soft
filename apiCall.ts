/* eslint-disable no-console, no-unused-vars */
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3001; // Change to your desired port

app.get('/api/data', async (req, res) => {
  try {
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
    console.log(data.data);
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

    console.log(req.query.id);
    const returnAPi = {
      method: 'GET',
      url: `https://api.flipkart.net/sellers/v2/orders/${req.query.id}`,
      // url: `https://api.flipkart.net/listings/v3/${req.query.id}`,
      // url: "https://api.flipkart.net/napi/payments/fetchOutstandingPaymentDetails",
      headers: {
        Authorization: `Bearer${data.data.access_token}`,
        'Content-Type': 'application/json', // Adjust the content type if necessary
      },
    };

    const returnData = await axios(returnAPi);
    console.log('returndata', returnData.data);
    return res.json(returnData.data);
  } catch (error) {
    console.log('error :>> ', error);
    return res.json(error.response.statusText);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
