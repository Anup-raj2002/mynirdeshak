import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useSubmitContactUs } from '../queries/useFormsQueries';
import { useNotification } from '../contexts/NotificationContext';

const Contact = () => {
  const submitForm = useSubmitContactUs();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm.mutate(formData, {
      onSuccess: () => {
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      },
      onError: (err) => {
        showNotification(
          err?.response?.data?.message || err?.message || 'Failed to send message. Please try again later.',
          'error'
        );
      }
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'mynirdeshak@gmail.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 12345 67890',
      subtitle: 'Mon-Fri 10AM-5PM IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Knowledge Park III,Greater Noida UP',
      subtitle: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: '10:00 AM - 5:00 PM',
      subtitle: 'Monday to Friday'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our scholarship program? We're here to help you 
            on your journey to educational success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-blue-600" />
                Send us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="registration">Registration Help</option>
                  <option value="scholarship">Scholarship Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="exam">Exam Related</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  placeholder="Describe your query in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We're here to support you throughout your educational journey. 
                Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl w-fit mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h4>
                    <p className="text-gray-800 font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {info.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    When is the registration deadline?
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Registration is open year-round. However, exam dates are announced 
                    quarterly with specific registration cutoffs.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    What documents do I need?
                  </h5>
                  <p className="text-gray-600 text-sm">
                    You'll need your 12th grade certificate, mark sheet, ID proof, 
                    and college admission letter (after securing admission).
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    How is the scholarship amount disbursed?
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Scholarships are directly paid to your college for fee purposes 
                    after verification of admission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;