import React, { useState } from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

function Resources() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const roadmapItems = [
    {
      title: 'Project Management',
      image: '/pictures/PM.jpg',
      description: 'is the art of keeping tasks, teams, and goals on track for successful project completion.',
      path: '/PM',
    },
    {
      title: 'Code Development',
      image: '/pictures/CD.jpg',
      description: 'turns ideas into functional software through coding and problem-solving.',
      path: '/CD',
    },
    {
      title: 'UI/UX Design',
      image: '/pictures/UIUX.jpg',
      description: 'is the process of creating intuitive and visually appealing experiences for users.',
      path: '/UIUX',
    },
    {
      title: 'System Quality Assurance',
      image: '/pictures/SQA.jpg',
      description: 'ensures that the developed application is reliable, secure, and performs as expected.',
      path: '/SQA',
    },
  ];

  return (
    <div className="flex flex-col">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF] min-h-screen`}
      >
        <Header />

        <div className="p-8">
          <h1 className="text-[70px] font-semibold text-center mb-2 text-[#1F3463]">Internship Roadmap</h1>
          <p className="text-center text-gray-600 mb-8 text-[25px] px-40">
            Gain access to carefully selected resources that support skill development, boost productivity, and help you navigate your professional path with confidence.
          </p>

          <div className="grid grid-cols-2 gap-6 mx-auto items-center">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="group shadow-md flex flex-col items-center justify-center h-[284px] text-center px-6 py-4 transition-transform duration-300 border border-[#C3C3C3] cursor-pointer rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="bg-white/70 p-3 rounded-lg">
                  <h2 className="text-[45px] font-bold text-[#1F3463] bg-[#F9FAFD] ">{item.title}</h2>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 text-[#1F3463] font-medium text-[30px] max-w-[786px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resources;
