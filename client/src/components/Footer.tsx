const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto text-white flex items-center justify-between max-w-[65em] px-4">
        <p className="font-bold font-fair text-[1.2rem] sm:text-[1.3rem]">Holidays.com</p>
        <div className="flex gap-3 sm:gap-5"> 
          <p className="text-[0.8rem] sm:text-[0.9rem]" >Privacy Policy</p>
          <p className="text-[0.8rem] sm:text-[0.9rem]">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
   
