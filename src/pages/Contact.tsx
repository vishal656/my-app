import ContactForm from '../components/ContactForm';
import styled from 'styled-components';

/* PAGE WRAPPER */
export const ContactSection = styled.section`
  width: 100%;
`;

/* TITLE */
export const Title = styled.h2`
  font-size: 35px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 30px;
  padding-left: 250px;

  @media (max-width: 1210px) {
    padding: 30px 60px;
  }

  @media (max-width: 450px) {
    padding: 30px 15px;
  }
`;

/* MAP */
export const ContactMap = styled.div`
  iframe {
    width: 100%;
    height: 300px;
    border: none;
    background-color: #e4e4e4;
  }
`;

/* CONTENT */
export const ContactInfo = styled.div`
  padding: 0 250px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (max-width: 1210px) {
    padding: 0 60px;
  }

  @media (max-width: 450px) {
    padding: 0 15px;
  }
`;

/* ADDRESS WRAPPER */
export const ContactAddress = styled.div`
  display: flex;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

/* ADDRESS BLOCK */
export const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
  width: 50%;

  h3 {
    font-size: 26px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
  }

  @media (max-width: 450px) {
    width: 100%;
  }
`;
const ContactPage = () => {
  return (
    <ContactSection>
      <Title>Contact Us</Title>

      <ContactMap>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30789.07759428033!2d73.95040091398974!3d15.287704508166195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb135ec03d6f5%3A0x57d20f2d211f7730!2sCrafted%20Couches!5e0!3m2!1sen!2sin!4v1769088243288!5m2!1sen!2sin" width="600" height="450" loading="lazy"  title="vishal-map"/>
      </ContactMap>

      <ContactInfo>
        <ContactAddress>
          <Address>
            <h3>Store in London</h3>
            <p>
              1418 River Drive, Suite 35 Cottonhall, CA 9622
              <br /> United Kingdom
            </p>
            <p>
              admin@dummymail.com
              <br />
              +44 20 7123 4567
            </p>
          </Address>

          <Address>
            <h3>Store in India</h3>
            <p>
              A-791, Bandra Reclamation Rd, Mumbai
              <br /> Maharashtra
            </p>
            <p>
              contact@dummymail.com
              <br />
              +44 20 7123 4567
            </p>
          </Address>
        </ContactAddress>

        <ContactForm />
      </ContactInfo>
    </ContactSection>
  );
};

export default ContactPage;
