import React, { useState, useRef } from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import Footer from './footer';

function ViewJournal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const journalContentRef = useRef(null);

  return (
    <div>
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white min-h-screen`}
      >
        <Header />
        <div className="p-6">
          <div className="bg-[#F9FAFD] rounded-md shadow-md p-10">
            <h2 className="text-[25px] font-semibold mb-2  ">Antonio Andres Watson - January 01, 2025</h2>
            <p className='border-b border-[#959494] -ml-3 -mr-3 mb-7'></p>
            <div ref={journalContentRef} className='text-[25px]'>
              <p className=" font-bold">Bold Title</p>
              <p className="underline text-gray-600">Subtitle</p>
              <p className="text-justify indent-8 mb-2">
                This is an example of an indented and justified paragraph. It demonstrates how text can be formatted
                with various styles and alignments. In this paragraph, the term <span className="italic text-[#E70000]">italicized</span>{' '}
                is used to emphasize certain words.
              </p>
              <p className="mt-8 mb-8">This sentence is aligned to the right.</p>
              <ul className="list-disc list-inside mb-2">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
              <ol className="list-decimal list-inside mt-8">
                <li>First step</li>
                <li>Second step</li>
                <li>Third step</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewJournal;