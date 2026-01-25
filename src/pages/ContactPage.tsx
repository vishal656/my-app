import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <section className="w-full">
      {/* TITLE */}
      <h2
        className="text-[35px] font-bold uppercase py-[30px] pl-[250px]
                   max-[1210px]:px-[60px]
                   max-[450px]:px-[15px]"
      >
        Contact Us
      </h2>

      {/* MAP */}
      <div>
        <iframe
          className="w-full h-[300px] border-0 bg-gray-200"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30789.07759428033!2d73.95040091398974!3d15.287704508166195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb135ec03d6f5%3A0x57d20f2d211f7730!2sCrafted%20Couches!5e0!3m2!1sen!2sin!4v1769088243288!5m2!1sen!2sin"
          loading="lazy"
          title="vishal-map"
        />
      </div>

      {/* CONTENT */}
      <div
        className="px-[250px] flex flex-col gap-[60px]
                   max-[1210px]:px-[60px]
                   max-[450px]:px-[15px]"
      >
        {/* ADDRESS WRAPPER */}
        <div className="flex max-[450px]:flex-col">
          {/* ADDRESS BLOCK */}
          <div className="flex flex-col gap-[15px] mt-[50px] w-1/2 max-[450px]:w-full">
            <h3 className="text-[26px] font-semibold">Store in London</h3>
            <p className="text-[14px]">
              1418 River Drive, Suite 35 Cottonhall, CA 9622
              <br /> United Kingdom
            </p>
            <p className="text-[14px]">
              admin@dummymail.com
              <br />
              +44 20 7123 4567
            </p>
          </div>

          <div className="flex flex-col gap-[15px] mt-[50px] w-1/2 max-[450px]:w-full">
            <h3 className="text-[26px] font-semibold">Store in India</h3>
            <p className="text-[14px]">
              A-791, Bandra Reclamation Rd, Mumbai
              <br /> Maharashtra
            </p>
            <p className="text-[14px]">
              contact@dummymail.com
              <br />
              +44 20 7123 4567
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactPage;
