import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faChevronLeft, faChevronRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import jsPDF from 'jspdf';

const TableHead = ({ content }) => {
  return (
    <div className='w-full flex items-center p-1 rounded-lg bg-yellow-600'>
      {content.map((element, index) => (
        <div key={index} className={`${element === 'Feedback' ? 'flex-[3]' : 'flex-1'} flex justify-center items-center font-semibold text-slate-50`}>
          {element}
        </div>
      ))}
    </div>
  );
};

const TableData = ({ content, deleteFeedback }) => {
  return (
    <div className='flex flex-col w-full gap-2 mt-2'>
      {content.map((element, index) => (
        <div key={index} className={`${element.pfType === 'complaint' ? 'outline-red-600' : ''} ${element.pfType === 'suggestion' ? 'outline-lime-600' : ''} ${element.pfType === 'question' ? 'outline-blue-600' : ''} flex items-center p-[6px] rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-zinc-800 outline outline-1 outline-offset-[-5px]`}>
          <div className='flex-1 flex justify-center items-center text-[16px]'>
            {new Date(element.pfDate).toLocaleDateString()}
          </div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.cusName}</div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.cusEmail}</div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.pName}</div>
          <div className='flex-1 flex justify-center items-center text-[18px]'>{element.pfRate}</div>
          <div className='flex-[3] flex justify-center items-center text-[16px]'>{element.pfNote}</div>
          <div className='flex-1 flex justify-center items-center text-[16px] gap-4'>
            <span
              className="bg-red-800 text-red-100 transition-all duration-300 py-2 px-3 rounded-xl text-[1.25em] hover:shadow-md hover:shadow-zinc-800 cursor-pointer"
              onClick={() => deleteFeedback(element.pfID)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const TablePagination = ({ nowIndex, totalIndex, paginFunction }) => {
  const paginBtns = [];
  for (let i = 0; i < totalIndex; i++) {
    paginBtns.push(
      <div 
        className={`${i === nowIndex ? 'bg-slate-600 text-slate-50' : 'text-slate-600'} outline outline-2 outline-offset-[-3px] text-[1em] outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer`} 
        key={i} 
        onClick={() => paginFunction(i + 1)}
      >
        {i + 1}
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      <div 
        className='outline outline-2 outline-offset-[-3px] text-[1em] text-slate-600 outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer' 
        onClick={() => paginFunction('<')}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {paginBtns}
      <div 
        className='outline outline-2 outline-offset-[-3px] text-[1em] text-slate-600 outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer' 
        onClick={() => paginFunction('>')}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export const ShowFeedbacksTable = ({ reviewType }) => {
  const [thisPage, setThisPage] = useState(1);
  const [packageReviews, setPackageReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get('/api/package-feedbacks', config);
      setPackageReviews(response.data.response);
      setError(null);
    } catch (error) {
      console.error('Error fetching package feedbacks:', error);
      setError('Failed to fetch feedbacks');
    }
  };

  const deleteFeedback = async (pfID) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            
            await axios.delete('/admin/delete-package-feedback', { data: { pfID }, headers: config.headers });
            
            // Update the UI
            setPackageReviews(prevReviews => prevReviews.filter(review => review.pfID !== pfID));
            setError(null);
            alert('Feedback deleted successfully');
        } catch (error) {
            console.error('Error deleting feedback:', error.response ? error.response.data : error);
            setError(error.response?.data?.message || 'Failed to delete feedback');
        }
    }
};


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredReviews = packageReviews.filter(review =>
    review.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.pName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHead = ['Date', 'Customer', 'Email', reviewType === 'instructors' ? 'Instructor' : 'Package', 'Rating', 'Feedback', 'Actions'];
  const maxRows = 5;
  const maxPages = Math.ceil(filteredReviews.length / maxRows);
  
  const dataSet = filteredReviews.slice(
    (thisPage - 1) * maxRows,
    thisPage * maxRows
  );

  const handlePagination = (direction) => {
    if (direction === '>' && thisPage < maxPages) {
      setThisPage(thisPage + 1);
    } else if (direction === '<' && thisPage > 1) {
      setThisPage(thisPage - 1);
    } else if (!isNaN(direction)) {
      setThisPage(parseInt(direction, 10));
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const title = 'Feedback Details';
    const headers = ['Date', 'Customer', 'Email', reviewType === 'instructors' ? 'Instructor' : 'Package', 'Rating', 'Feedback'];
    
    pdf.setFontSize(20);
    pdf.text(title, 20, 20);
    pdf.setFontSize(12);
    
    let y = 40;
    headers.forEach((header, index) => {
      pdf.text(header, 20 + index * 40, y);
    });
    
    dataSet.forEach((feedback) => {
      const row = [
        new Date(feedback.pfDate).toLocaleDateString(),
        feedback.cusName,
        feedback.cusEmail,
        feedback.pName,
        feedback.pfRate,
        feedback.pfNote,
      ];
      y += 10;
      row.forEach((cell, index) => {
        pdf.text(cell.toString(), 20 + index * 40, y);
      });
    });

    pdf.save('Feedback_Details.pdf');
  };

  return (
    <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
      <h1 className='text-2xl font-bold text-center mb-4'>Customer Feedbacks</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      <SearchBar onSearch={handleSearch} />
      <button 
        onClick={downloadPDF} 
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
      >
        Download PDF
      </button>

      <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-[#c7c7c7c4] w-[80vw]'>
        <TableHead content={tableHead} />
        <TableData content={dataSet} deleteFeedback={deleteFeedback} />
        <TablePagination 
          nowIndex={thisPage - 1} 
          totalIndex={maxPages} 
          paginFunction={handlePagination} 
        />
      </div>
    </div>
  );
};

export default ShowFeedbacksTable;