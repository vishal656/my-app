import React from 'react';
import { BsTruck, BsCreditCard, BsShield, BsHeadset } from 'react-icons/bs';

export const serviceData = [
  {
    icon: <BsTruck className="text-3xl text-orange-500" />,
    title: 'Free Shipping',
    subtitle: 'Lorem ipsum dolor sit amet.',
    bg: 'bg-orange-100',
  },
  {
    icon: <BsCreditCard className="text-3xl text-teal-500" />,
    title: 'Safe Payment',
    subtitle: 'Lorem ipsum dolor sit amet.',
    bg: 'bg-teal-100',
  },
  {
    icon: <BsShield className="text-3xl text-green-500" />,
    title: 'Secure Payment',
    subtitle: 'Lorem ipsum dolor sit amet.',
    bg: 'bg-green-100',
  },
  {
    icon: <BsHeadset className="text-3xl text-blue-500" />,
    title: 'Back Guarantee',
    subtitle: 'Lorem ipsum dolor sit amet.',
    bg: 'bg-blue-100',
  },
];

const Wrapper = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((val, index) => (
            <div
              key={index}
              className={`${val.bg} flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-center`}
            >
              <div className="mb-4">{val.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{val.title}</h3>
              <p className="text-sm text-gray-600">{val.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrapper;
