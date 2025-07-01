import React from 'react';
import { Target, Heart, Users, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To bridge the gap between dreams and reality by providing financial support to deserving students pursuing higher education.'
    },
    {
      icon: Heart,
      title: 'Our Vision',
      description: 'Creating a world where financial constraints never limit a student\'s potential to achieve academic excellence.'
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Building a supportive network of students, educators, and mentors committed to educational success.'
    },
    {
      icon: Star,
      title: 'Our Promise',
      description: 'Transparent, fair, and merit-based scholarship distribution that rewards dedication and academic excellence.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About My Nirdeshak
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded by Love Kumar Sharma, My Nirdeshak is dedicated to
            empowering students with the financial support they need to pursue
            their educational dreams.
          </p>
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Founder
              </h3>
              <h4 className="text-2xl text-blue-600 font-semibold mb-6">
                Love Kumar Sharma
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With a passion for education and a vision to make quality higher
                education accessible to all deserving students, Love Kumar
                Sharma founded My Nirdeshak. His belief that financial
                constraints should never be a barrier to academic excellence
                drives our mission forward.
              </p>
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium italic">
                  "Every student deserves the chance to pursue their dreams.
                  My Nirdeshak, we're not just providing scholarships
                  – we're investing in the future leaders of tomorrow."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h3>
            <p className="text-blue-100 text-lg">
              Making a difference in students' lives across the nation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2,500+</div>
              <div className="text-blue-200">Students Registered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
              <div className="text-blue-200">Scholarships Awarded</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">₹2cr+</div>
              <div className="text-blue-200">Aim To Distribute</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;