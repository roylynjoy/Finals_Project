import React, {useState} from 'react'
import Header from './header';
import Sidebar from './Sidebar';
import Footer from './footer';

function Journal() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [entry, setEntry] = useState('');

  const handleSubmit = () => {
    if (isChecked && entry.trim()) {
      alert('Journal submitted!');
      // You can add logic to save the journal here
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
        } bg-[#FAFAFF] min-h-screen`}>
        <Header />
        <div className="bg-white p-6 mt-10 mx-20 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Daily Journal</h1>
          <textarea
            className="w-full min-h-[200px] p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            placeholder="Type Here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <label className="text-[25px] text-gray-600">
              You agree to submit this entry. Once submitted, the entry cannot be edited.
            </label>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-[#1E3A8A] text-white rounded  disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isChecked || !entry.trim()}
          >
            Submit
          </button>
        </div>

        
      </div>
      <Footer />
    </div>
  )
}

export default Journal