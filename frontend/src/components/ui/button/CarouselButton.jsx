function CarouselButton({ onClick, children, classes }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${classes} top-[50%] -translate-y-[50%] flex items-center justify-center w-[35px] h-[35px] p-1 rounded-full transition-all`}
    >
      {children}
    </button>
  );
}
export default CarouselButton;