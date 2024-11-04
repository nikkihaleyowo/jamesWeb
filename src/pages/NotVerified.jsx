import React from 'react'

import { IoIosAlert } from "react-icons/io";
import emailjs from '@emailjs/browser'


const NotVerified = () => {

  function sendEmail(e){
    e.preventDefault();
    console.log("owo")
    emailjs.sendForm('service_3tj0xc8', 'template_y0gwkx9', e.target, '_KhwUIb5_DH8bzMn0' )
  }

  return (
    <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] m-auto relative z-0 h-screen overflow-y-auto text-white ...">
      
      <div className="text-white text-4xl text-center underline">Notice:</div>
      <div className="bg-neutral-500 mt-4">
      <IoIosAlert className='size-12' />
      <h2 className="text-2xl text-center mt-2 bg-neutral-600">You are not yet verified to use this product.</h2>
      <h2 className="text-2xl text-center bg-neutral-600">If you think something went wrong or are looking</h2>
      <h2 className="text-2xl text-center bg-neutral-600 pb-2">to be added to the user list please email use bellow</h2>
      </div>

      <section class="">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
            <form action="#" class="space-y-8" onSubmit={sendEmail}>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input type="email" name='email_from' id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                    <input type="text" name='subject' id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea id="message" rows="6" name='message' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
            </form>
        </div>
      </section>

    </div>
    
    

  )
}

export default NotVerified