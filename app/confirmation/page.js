"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Client component for order details
function OrderDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '123456';
  
  // Current date for order date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Sample order details - in a real app, this would come from an API or context
  const [orderDetails] = useState({
    orderId: orderId,
    orderDate: currentDate,
    estimatedDelivery: estimatedDelivery,
    paymentMethod: 'Credit Card (**** 1234)',
    shippingAddress: '123 Mango Street, Dhaka, Bangladesh',
    items: [
      {
        id: 1,
        name: 'Alphonso Mango',
        variety: 'Premium Grade',
        weight: '1kg Box',
        price: 24.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=1000'
      },
      {
        id: 2,
        name: 'Mango Gift Box',
        variety: 'Mixed Varieties',
        weight: '2kg Assorted',
        price: 39.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1000'
      }
    ],
    subtotal: 89.97,
    shipping: 0,
    tax: 4.50,
    total: 94.47
  });

  return (
    <div className="container mx-auto px-4">
      {/* Order Success Message */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Thank you for your order. We've received your order and will begin processing it right away.
          You will receive an email confirmation shortly.
        </p>
        <div className="inline-block border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-lg font-medium text-gray-700 mb-6">
          Order #{orderDetails.orderId}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#FDBE02] to-[#F57F17] hover:from-[#F57F17] hover:to-[#FDBE02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02] transition-all duration-300"
          >
            <span>Continue Shopping</span>
          </Link>
          <Link
            href={`/invoice?orderId=${orderDetails.orderId}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Invoice
          </Link>
        </div>
      </div>
      
      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-[#FDBE02] mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          Order Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Order Number</h3>
            <p className="text-gray-800">{orderDetails.orderId}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Order Date</h3>
            <p className="text-gray-800">{orderDetails.orderDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
            <p className="text-gray-800">{orderDetails.paymentMethod}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
            <p className="text-gray-800">{orderDetails.estimatedDelivery}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
            <p className="text-gray-800">{orderDetails.shippingAddress}</p>
          </div>
        </div>
        
        {/* Order Items */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Items</h3>
        <div className="border rounded-lg overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderDetails.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.weight}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[#F57F17]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">
                {orderDetails.shipping === 0 ? 'Free' : `$${orderDetails.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800">${orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-bold">
              <span className="text-gray-800">Total</span>
              <span className="text-[#F57F17]">${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-[#FDBE02] mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          Need Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Order Issues</h3>
            <p className="text-sm text-gray-600 mb-3">Having problems with your order? Our customer service team is here to help.</p>
            <a href="#" className="text-sm font-medium text-[#F57F17] hover:text-[#FDBE02]">Contact Support →</a>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Shipping Questions</h3>
            <p className="text-sm text-gray-600 mb-3">Need to change your shipping address or have questions about delivery?</p>
            <a href="#" className="text-sm font-medium text-[#F57F17] hover:text-[#FDBE02]">Shipping FAQ →</a>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Returns & Refunds</h3>
            <p className="text-sm text-gray-600 mb-3">Learn about our return policy and how to request a refund.</p>
            <a href="#" className="text-sm font-medium text-[#F57F17] hover:text-[#FDBE02]">Return Policy →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component
function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded mb-8"></div>
        <div className="h-32 bg-gray-200 rounded mb-8"></div>
      </div>
    </div>
  );
}

// Main page component
export default function ConfirmationPage() {
  return (
    <main className="min-h-screen py-8 bg-gradient-to-b from-amber-50 to-white">
      {/* Progress indicator */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Cart
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-gray-200">
                  Checkout
                </div>
                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#FDBE02] bg-amber-100">
                  Confirmation
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#FDBE02] to-[#F57F17]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <OrderDetails />
      </Suspense>
    </main>
  );
} 