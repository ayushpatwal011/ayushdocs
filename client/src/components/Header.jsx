import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const clearInput = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-4 sm:mx-10 xl:mx-24">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary-dull/10 rounded-full text-sm">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star" className="w-2" />
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold sm:leading-16">
          Your own
          <span className="text-primary-dull"> Learning</span>
          <br /> platform
        </h1>
        <p className="my-5 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-800">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-center items-center max-w-lg max-sm:scale-75 mx-auto border border-primary bg-white rounded overflow-hidden"
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for topic"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {input && (
        <div className="text-center">
          <button
            onClick={clearInput}
            
            className="px-6 py-1.5 mb-4 border border-primary/40 bg-primary-dull/10 rounded-full text-sm cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
