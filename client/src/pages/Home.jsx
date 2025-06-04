import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='bg-light'>
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter/>
      <Footer />
    </div>
  )
}

export default Home