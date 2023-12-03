// import { OrderApi } from '@/services/flipkart/flipkart-api';
// import { NextApiRequest } from 'next';
/* eslint-disable no-console */
// import { OrderApi } from '@/services/flipkart/flipkart-api';
import { NextResponse } from 'next/server';
// import cron from 'node-cron';

// // Function to be executed on the scheduled interval
// const scheduledTask = async () => {
//   console.info('cron job run number 1', 'cron job run number 1');
//   // const orderData =   await OrderApi()
//   // console.info('orderData :>> ', orderData);
//   // Your logic here
// };
// // Function to be executed on the scheduled interval
// const scheduledTask1 = async () => {
//   console.info('cron job run number 2', 'cron job run number 2');
//   const orderData = await OrderApi();
//   console.info('orderData :>> ', orderData);
//   // Your logic here
// };

// Define a cron schedule (runs every minute in this example)

export async function GET() {
  try {
    // cron.schedule('* * * * * *', scheduledTask);
    console.log('Log before starting the cron');
    // cron.schedule('* * * * * *', scheduledTask1);
    // const orderData = await OrderApi();

    return NextResponse.json({ msg: 'Okay, GOt it.' });
  } catch (error) {
    return NextResponse.json({ msg: error });
  }
}

// Dummy API route, just to satisfy Next.js structure
