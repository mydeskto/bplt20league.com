
"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/hero-section';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return; // Prevent multiple submissions
    
    setIsLoading(true);

    try {
      const result = await emailjs.send(
        'service_qz337a9',
        'template_ahknqkp', // You'll need to create a template in EmailJS dashboard
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'F7FEMaMhpJMiv7g-t'
      );

      // Removed console.log to reduce main-thread work

      if (result.status === 200) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <HeroSection title="Contact Us" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-6 text-[#d4a574]">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Office Address</h3>
                  <p className="text-gray-300">
                    BPL Headquarters<br />
                    Sher-e-Bangla National Cricket Stadium<br />
                    Dhaka, Bangladesh
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
                  <p className="text-gray-300">
                    Email: bplt20league@gmail.com<br />
                    {/* Phone: +880-1-4444444<br />
                    WhatsApp: +880 9801234567 */}
                  </p>
                </div>

                
              </div>
            </div>

             {/* Contact Form */}
             <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
               <h2 className="text-2xl font-bold mb-6 text-[#d4a574]">Send us a Message</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                     Full Name
                   </label>
                   <Input
                     id="name"
                     name="name"
                     type="text"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Your full name"
                     className="w-full bg-white/10 border-gray-600 text-white placeholder-white/70"
                     required
                   />
                 </div>

                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                     Email Address
                   </label>
                   <Input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="your@email.com"
                     className="w-full bg-white/10 border-gray-600 text-white placeholder-white/70"
                     required
                   />
                 </div>

                 <div>
                   <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">
                     Subject
                   </label>
                   <Input
                     id="subject"
                     name="subject"
                     type="text"
                     value={formData.subject}
                     onChange={handleChange}
                     placeholder="How can we help?"
                     className="w-full bg-white/10 border-gray-600 text-white placeholder-white/70"
                     required
                   />
                 </div>

                 <div>
                   <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                     Message
                   </label>
                   <textarea
                     id="message"
                     name="message"
                     rows={4}
                     value={formData.message}
                     onChange={handleChange}
                     className="w-full bg-white/10 border border-gray-600 rounded-md p-2 text-white placeholder-white/70"
                     placeholder="Your message here..."
                     required
                   ></textarea>
                 </div>

                 <Button
                   type="submit"
                   disabled={isLoading}
                   className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                 >
                   {isLoading ? 'Sending...' : 'Send Message'}
                 </Button>
               </form>
             </div>
          </div>
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #10b981',
          },
        }}
      />
    </div>
  );
}