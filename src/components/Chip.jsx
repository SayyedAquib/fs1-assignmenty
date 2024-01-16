import React, { useState, useRef } from "react";
import { dummyData } from "../utils/constants";

const Chip = () => {
  // State variables
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredList, setFilteredList] = useState(dummyData);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  // Handle input change event
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterItems(value);
  };

  // Filter items based on input value
  const filterItems = (value) => {
    const filteredItems = dummyData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filteredItems);
  };

  // Handle click event on filtered item to add it as a chip
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setFilteredList(filteredList.filter((i) => i !== item));
    setInputValue("");
    inputRef.current.focus();
  };

  // Handle click event on chip to remove it
  const handleChipRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setFilteredList([...filteredList, item]);
  };

  // Handle backspace key press to remove the last chip
  const handleBackspace = (e) => {
    if (
      inputValue === "" &&
      selectedItems.length > 0 &&
      e.key === "Backspace"
    ) {
      e.preventDefault();
      const lastItem = selectedItems[selectedItems.length - 1];
      handleChipRemove(lastItem);
    }
  };

  // Handle input focus to show/hide the list
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // JSX rendering
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-blue-500 my-3">
        Pick Users
      </h1>
      <div className="relative">
        {/* Display selected items as chips */}
        <div className="flex flex-wrap">
          {selectedItems.map((item) => (
            <div key={item.name} className="bg-gray-300 p-2 m-1 rounded-full">
              <img
                className="w-11 rounded-full inline"
                src={item.profilePic}
                alt={`${item.name}'s Profile`}
              />{" "}
              {item.name}{" "}
              <span
                className="cursor-pointer"
                onClick={() => handleChipRemove(item)}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
        {/* Input field for searching and selecting users */}
        <input
          type="text"
          className="border border-gray-300 p-2 w-full"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
        {/* Display filtered items in a dropdown when the input is focused */}
        {filteredList.length > 0 && (
          <ul className="absolute left-0 mt-2 bg-white w-full max-h-80 overflow-y-scroll border border-gray-300 rounded">
            {filteredList.map((item) => (
              <li
                key={item.name}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleItemClick(item)}
              >
                {/* Display item details with profile picture and email */}
                <img
                  className="w-11 rounded-full inline mr-2"
                  src={item.profilePic}
                  alt={`${item.name}'s Profile`}
                />{" "}
                {item.name}{" "}
                <span className="text-slate-500 ml-3">✉️ {item.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Chip;
