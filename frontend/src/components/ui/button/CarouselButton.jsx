function CarouselButton({ onClick, children, classes }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${classes} top-[50%] -translate-y-[50%] flex items-center justify-center w-[35px] h-[35px] bg-white p-1 rounded-full opacity-50 transition-all hover:bg-primary hover:opacity-100 hover:text-white`}
    >
      {children}
    </button>
  );
}
export default CarouselButton;