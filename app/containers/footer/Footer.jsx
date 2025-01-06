import React from 'react';
import './footer.css';
import Image from 'next/image';

const Footer = () => (
  <div className="gpt3__footer section__padding"  id="footer">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Get to know the Developers</h1>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_div">
        <div className="gpt3__footer-image1">
          <Image src="/basil.jpg" alt="Person 1" width={128} height={128} layout="responsive" className="rounded-full" />
        </div>
        <div className="gpt3__footer-info">
          <h4>Basil Biju Cherian</h4>
          <a href="https://in.linkedin.com/in/basilcherian" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Social Media</a>
          <a href="tel:+919383489708" className="text-white hover:underline"> Contact </a>
        </div>
      </div>
      <div className="gpt3__footer-links_div">
        <div className="gpt3__footer-image2">
          <Image src="/vinay.jpg" alt="Person 2" width={128} height={128} layout="responsive" className="rounded-full" />
        </div>
        <div className="gpt3__footer-info">
          <h4>Vinay Krishnan</h4>
          <a href=" https://www.linkedin.com/in/vinay-krishnan-72b8232a3/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Social Media</a>
          <a href="tel:+917034272817" className="text-white hover:underline"> Contact </a>
        </div>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <a href="https://www.google.com/maps/place/Vellore+Institute+of+Technology/@12.9820918,79.129811,13.5z/data=!4m15!1m8!3m7!1s0x3bad47105840b1a7:0x12ee1fcb23de3412!2z4K6V4K6-4K6f4K-N4K6q4K6-4K6f4K6_LCDgrrXgr4fgrrLgr4LgrrDgr40sIOCupOCuruCuv-CutOCvjSDgrqjgrr7grp_gr4E!3b1!8m2!3d12.9734246!4d79.1369301!16zL20vMDZzcjFw!3m5!1s0x3bad479f0ccbe067:0xfef222e5f36ecdeb!8m2!3d12.9692232!4d79.1559336!16zL20vMDZzcHNo?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
          VIT, Katpadi, Vellore, Tamil Nadu</a>       
        <a href="mailto:vkoct2002@gmail.com" className=" hover:underline">vkoct2002@gmail.com</a>
        <a href="mailto:reckinator9@gmail.com" className="hover:underline">reckinator9@gmail.com</a>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 INSTA INSIGHT</p>
    </div>
  </div>
);

export default Footer;