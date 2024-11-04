import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { usePolicyContext } from '../Context/PolicyContext'

import { useLocation } from 'react-router-dom';



const DropdownMenu = (props) => {
  const  {dispatch} = usePolicyContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();

  const toggleDropdown = (id) => {
    console.log("hit")
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  function handleRemove(){

    dispatch({
      type: "REMOVE_POLICY",
      payload: { policy: props.policyid} 
    });
  }

  function mergeUp(){
    dispatch({
      type: "MERGE_UP",
      payload: { policy: props.policyid} 
    });
  }

  return (
  
    <div className="relative inline-block   
 text-left" ref={dropdownRef}>
      <button
        onMouseDown={toggleDropdown}
        className="text-white  font-bold border-none hover:text-gray-50"
      >
        ...
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="origin-top-right absolute right-5 top-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
        >
          <div className="py-1">   

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleRemove}
            >
              Delete
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={mergeUp}
            >
              Merge Up
            </a>
            
          </div>   

        </motion.div>
      )}
    </div>
  );
};

export default DropdownMenu;