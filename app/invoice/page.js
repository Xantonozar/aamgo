"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '123456';
  const invoiceRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Current date for invoice date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate due date (14 days from now)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  const invoiceDueDate = dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Sample order details - in a real app, this would come from an API or context
  const [invoiceDetails] = useState({
    invoiceId: `INV-${orderId}`,
    orderId: orderId,
    invoiceDate: currentDate,
    dueDate: invoiceDueDate,
    customerInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Mango Street, Dhaka, Bangladesh'
    },
    companyInfo: {
      name: 'AmGo Mangoes',
      address: '456 Fruit Avenue, Dhaka, Bangladesh',
      email: 'support@amgomangoes.com',
      phone: '+880 1234 567890',
      website: 'www.amgomangoes.com'
    },
    paymentMethod: 'Credit Card (**** 1234)',
    items: [
      {
        id: 1,
        name: 'Alphonso Mango',
        description: 'Premium Grade, 1kg Box',
        price: 24.99,
        quantity: 2,
        total: 49.98
      },
      {
        id: 2,
        name: 'Mango Gift Box',
        description: 'Mixed Varieties, 2kg Assorted',
        price: 39.99,
        quantity: 1,
        total: 39.99
      }
    ],
    subtotal: 89.97,
    shipping: 0,
    tax: 4.50,
    total: 94.47
  });
  
  // Function to generate and download PDF
  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set fonts
      pdf.setFont("helvetica", "normal");
      
      // Add company info
      pdf.setFontSize(22);
      pdf.setTextColor("#F57F17");
      pdf.text(invoiceDetails.companyInfo.name, 20, 20);
      
      pdf.setFontSize(10);
      pdf.setTextColor("#666666");
      pdf.text(invoiceDetails.companyInfo.address, 20, 27);
      pdf.text(invoiceDetails.companyInfo.email, 20, 32);
      pdf.text(invoiceDetails.companyInfo.phone, 20, 37);
      pdf.text(invoiceDetails.companyInfo.website, 20, 42);
      
      // Add Invoice title and details
      pdf.setFontSize(24);
      pdf.setTextColor("#000000");
      pdf.text("INVOICE", 190, 20, { align: "right" });
      
      pdf.setFontSize(10);
      pdf.setTextColor("#666666");
      pdf.text(`Invoice #: ${invoiceDetails.invoiceId}`, 190, 30, { align: "right" });
      pdf.text(`Order #: ${invoiceDetails.orderId}`, 190, 35, { align: "right" });
      pdf.text(`Date: ${invoiceDetails.invoiceDate}`, 190, 40, { align: "right" });
      pdf.text(`Due Date: ${invoiceDetails.dueDate}`, 190, 45, { align: "right" });
      
      // Customer information
      pdf.setFontSize(12);
      pdf.setTextColor("#000000");
      pdf.text("Invoice To:", 20, 60);
      
      pdf.setFontSize(10);
      pdf.setTextColor("#333333");
      pdf.text(invoiceDetails.customerInfo.name, 20, 67);
      pdf.setTextColor("#666666");
      pdf.text(invoiceDetails.customerInfo.address, 20, 72);
      pdf.text(invoiceDetails.customerInfo.email, 20, 77);
      pdf.text(invoiceDetails.customerInfo.phone, 20, 82);
      
      // Payment method
      pdf.setFontSize(12);
      pdf.setTextColor("#000000");
      pdf.text("Payment Method:", 140, 60, { align: "right" });
      
      pdf.setFontSize(10);
      pdf.setTextColor("#666666");
      pdf.text(invoiceDetails.paymentMethod, 190, 60, { align: "right" });
      
      // Total due highlight
      pdf.setFillColor(255, 250, 230); // light amber color
      pdf.roundedRect(155, 65, 35, 20, 2, 2, 'F');
      pdf.setTextColor("#F57F17");
      pdf.setFontSize(14);
      pdf.text(`$${invoiceDetails.total.toFixed(2)}`, 172.5, 75, { align: "center" });
      pdf.setFontSize(8);
      pdf.setTextColor("#666666");
      pdf.text("Total Due", 172.5, 80, { align: "center" });
      
      // Table header
      const tableTop = 95;
      const tableLeft = 20;
      const colWidths = [60, 50, 20, 20, 30];
      
      pdf.setFillColor(245, 245, 245);
      pdf.rect(tableLeft, tableTop, 170, 10, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor("#555555");
      pdf.text("Item", tableLeft + 4, tableTop + 7);
      pdf.text("Description", tableLeft + colWidths[0] + 4, tableTop + 7);
      pdf.text("Price", tableLeft + colWidths[0] + colWidths[1] + 4, tableTop + 7, { align: "right" });
      pdf.text("Qty", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 4, tableTop + 7, { align: "right" });
      pdf.text("Total", tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 4, tableTop + 7, { align: "right" });
      
      // Table content
      let currentY = tableTop + 15;
      invoiceDetails.items.forEach((item, index) => {
        pdf.setTextColor("#333333");
        pdf.text(item.name, tableLeft + 4, currentY);
        pdf.setTextColor("#666666");
        pdf.text(item.description, tableLeft + colWidths[0] + 4, currentY);
        pdf.text(`$${item.price.toFixed(2)}`, tableLeft + colWidths[0] + colWidths[1] + 4, currentY, { align: "right" });
        pdf.text(`${item.quantity}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 4, currentY, { align: "right" });
        pdf.setTextColor("#333333");
        pdf.text(`$${item.total.toFixed(2)}`, tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 4, currentY, { align: "right" });
        
        // Draw line after each item
        pdf.setDrawColor(230, 230, 230);
        currentY += 5;
        pdf.line(tableLeft, currentY, tableLeft + 170, currentY);
        currentY += 10;
      });
      
      // Summary section
      const summaryLeft = 140;
      currentY += 5;
      
      pdf.setTextColor("#666666");
      pdf.text("Subtotal:", summaryLeft, currentY);
      pdf.setTextColor("#333333");
      pdf.text(`$${invoiceDetails.subtotal.toFixed(2)}`, tableLeft + 170, currentY, { align: "right" });
      
      currentY += 8;
      pdf.setTextColor("#666666");
      pdf.text("Shipping:", summaryLeft, currentY);
      pdf.setTextColor("#333333");
      pdf.text(invoiceDetails.shipping === 0 ? "Free" : `$${invoiceDetails.shipping.toFixed(2)}`, tableLeft + 170, currentY, { align: "right" });
      
      currentY += 8;
      pdf.setTextColor("#666666");
      pdf.text("Tax (5%):", summaryLeft, currentY);
      pdf.setTextColor("#333333");
      pdf.text(`$${invoiceDetails.tax.toFixed(2)}`, tableLeft + 170, currentY, { align: "right" });
      
      // Total line
      currentY += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(summaryLeft, currentY, tableLeft + 170, currentY);
      
      currentY += 8;
      pdf.setFontSize(12);
      pdf.setTextColor("#333333");
      pdf.text("Total:", summaryLeft, currentY);
      pdf.setTextColor("#F57F17");
      pdf.text(`$${invoiceDetails.total.toFixed(2)}`, tableLeft + 170, currentY, { align: "right" });
      
      // Footer
      const footerY = 250;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, footerY, 190, footerY);
      
      pdf.setFontSize(12);
      pdf.setTextColor("#333333");
      pdf.text("Thank you for your business!", 105, footerY + 10, { align: "center" });
      
      pdf.setFontSize(9);
      pdf.setTextColor("#666666");
      pdf.text("If you have any questions about this invoice, please contact", 105, footerY + 18, { align: "center" });
      pdf.text(`${invoiceDetails.companyInfo.email} | ${invoiceDetails.companyInfo.phone}`, 105, footerY + 25, { align: "center" });
      
      // Save the PDF
      pdf.save(`Invoice-${invoiceDetails.invoiceId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again or contact support.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  return (
    <main className="min-h-screen py-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
            <div className="flex space-x-4">
              <Link
                href={`/confirmation?orderId=${orderId}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDBE02]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Order
              </Link>
              <button
                onClick={downloadInvoice}
                disabled={isGeneratingPDF}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                style={{ backgroundColor: '#F57F17' }}
              >
                {isGeneratingPDF ? (
                  <span>Generating...</span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Invoice Content */}
          <div ref={invoiceRef} className="bg-white p-8 max-w-4xl mx-auto">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#F57F17' }}>{invoiceDetails.companyInfo.name}</h2>
                <p className="text-gray-600">{invoiceDetails.companyInfo.address}</p>
                <p className="text-gray-600">{invoiceDetails.companyInfo.email}</p>
                <p className="text-gray-600">{invoiceDetails.companyInfo.phone}</p>
                <p className="text-gray-600">{invoiceDetails.companyInfo.website}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800 mb-2">INVOICE</div>
                <div className="text-gray-600"><span className="font-medium">Invoice #:</span> {invoiceDetails.invoiceId}</div>
                <div className="text-gray-600"><span className="font-medium">Order #:</span> {invoiceDetails.orderId}</div>
                <div className="text-gray-600"><span className="font-medium">Date:</span> {invoiceDetails.invoiceDate}</div>
                <div className="text-gray-600"><span className="font-medium">Due Date:</span> {invoiceDetails.dueDate}</div>
              </div>
            </div>
            
            {/* Invoice To/From */}
            <div className="flex justify-between mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Invoice To:</h3>
                <p className="text-gray-800 font-medium">{invoiceDetails.customerInfo.name}</p>
                <p className="text-gray-600">{invoiceDetails.customerInfo.address}</p>
                <p className="text-gray-600">{invoiceDetails.customerInfo.email}</p>
                <p className="text-gray-600">{invoiceDetails.customerInfo.phone}</p>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Method:</h3>
                <p className="text-gray-600">{invoiceDetails.paymentMethod}</p>
                <div className="mt-4 bg-amber-50 p-3 rounded-md inline-block">
                  <div className="font-bold text-lg" style={{ color: '#F57F17' }}>
                    ${invoiceDetails.total.toFixed(2)}
                  </div>
                  <div className="text-gray-600 text-sm">Total Due</div>
                </div>
              </div>
            </div>
            
            {/* Invoice Items */}
            <div className="mb-8">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Item</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Description</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Qty</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-800">{item.name}</td>
                      <td className="py-3 px-4 text-gray-600">{item.description}</td>
                      <td className="py-3 px-4 text-right text-gray-800">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-gray-800">{item.quantity}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-800">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Invoice Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-800 font-medium">${invoiceDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-800 font-medium">
                    {invoiceDetails.shipping === 0 ? 'Free' : `$${invoiceDetails.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (5%):</span>
                  <span className="text-gray-800 font-medium">${invoiceDetails.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                  <span className="text-gray-800">Total:</span>
                  <span style={{ color: '#F57F17' }}>${invoiceDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Invoice Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center text-gray-600">
                <p className="font-medium text-gray-800">Thank you for your business!</p>
                <p className="mt-2">
                  If you have any questions about this invoice, please contact<br />
                  {invoiceDetails.companyInfo.email} | {invoiceDetails.companyInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 