import React from 'react'
import { assets, footer_data } from '../assets/assets';

const Footer = () => {


  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary-dull/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 ">
                <div>
                   <div className="flex justify-center font-bold text-3xl">
                             <img className="h-9" src={assets.logo} alt="Logo" />
                             <strong className="pt-1">Ayushdocs</strong>
                           </div>
                    <p className="max-w-[410px] mt-6 text-xl">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-xl text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-md space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-8 text-center text-md md:text-xl text-black">
                Copyright {new Date().getFullYear()} © Ayush Patwal All Right Reserved.
            </p>
        </div>
  )
}

export default Footer
