import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./styles.css";

function Accordion({ items }) {
  // keeps the track of currently open item
  // null means no item is expanded

  const [activeIndex, setActiveIndex] = useState(null);

  // clicking an open item collapses it (set to null)
  // clicking a closed item opens it (set to it's index)
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return  <p>No items available.</p>;
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        return (
          <div className="accordion-item" key={item.title}>
            <button
              className="accordion-title"
              onClick={() => handleToggle(index)}
            >
              {item.title}
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {activeIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
