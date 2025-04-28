import React, { useState, useRef } from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import Footer from './footer';

function Journal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const editorRef = useRef(null);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSubmit = () => {
    if (isChecked && editorRef.current.innerText.trim()) {
      alert('Journal submitted!');
      // You can save editorRef.current.innerHTML if needed
    } else {
      alert('Please agree to the terms and write something.');
    }
  };

  return (
    <div>
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF] min-h-screen`}
      >
        <Header />
        <div className="p-6 mt-10 mx-20 ">

          {/* Toolbar */}
          <div className="border-3 border-[#C2C2C2] rounded-md bg-[#f9f9fc]">
            <div className="flex items-center border-b px-4 py-2 text-gray-400 text-[20px]">
              <div className="flex space-x-2">
                <button onClick={() => handleFormat('bold')} className="hover:text-black font-bold">B</button>
                <button onClick={() => handleFormat('italic')} className="hover:text-black italic">I</button>
                <button onClick={() => handleFormat('underline')} className="hover:text-black underline">U</button>
                <button onClick={() => handleFormat('foreColor', 'black')} className="hover:text-black">A</button>

                <select
                  onChange={(e) => handleFormat('fontSize', e.target.value)}
                  className="bg-transparent focus:outline-none"
                >
                  <option value="3">14</option>
                  <option value="4">16</option>
                  <option value="5">18</option>
                </select>

                <span>|</span>

                <button onClick={() => handleFormat('insertUnorderedList')} className="hover:text-black">•</button>
                <button onClick={() => handleFormat('insertOrderedList')} className="hover:text-black">1.</button>

                <span>|</span>

                <button onClick={() => handleFormat('justifyLeft')} className="hover:text-black">L</button>
                <button onClick={() => handleFormat('justifyCenter')} className="hover:text-black">C</button>
                <button onClick={() => handleFormat('justifyRight')} className="hover:text-black">R</button>

                <span>|</span>

                <button onClick={() => handleFormat('formatBlock', 'blockquote')} className="hover:text-black">“”</button>
              </div>
            </div>

            {/* Editable area */}
            <div
              ref={editorRef}
              contentEditable
              className="w-full min-h-[587px] bg-[#f9f9fc] p-6 focus:outline-none resize-none placeholder-gray-400 text-gray-800 text-base"
              placeholder="Type Here..."
              suppressContentEditableWarning={true}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center mt-6 space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <label className="text-gray-600 text-[25px]">
              You agree to submit this entry. Once submitted, the entry cannot be edited.
            </label>
          </div>

          {/* Submit button */}
          <button
            className="text-[28px] mt-6 px-6 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isChecked || !editorRef.current?.innerText.trim()}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journal;
