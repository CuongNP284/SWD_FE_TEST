import React from "react";

type LeftOverlayContentProps = {
  isAnimated: boolean;
  setIsAnimated: (value: boolean) => void;
};

const LeftOverlayContent: React.FC<LeftOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center overflow-hidden">
      <h1 className="text-6xl font-bold text-white-100 mb-4">
        Already have an account ?
      </h1>

      <h5 className="text-xl text-white-100">Sign in with your email & password</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white-100 text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
