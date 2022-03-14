import React from 'react'
import Slider from 'react-slick'

const TopSliderCard = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 750,
    autoplaySpeed: 5000,
    arrows: false,
  }

  return (
    <div className="slidbg   top-slider">
      <div className="h-full">
        <Slider {...sliderSettings} className=" ">
          <div className="">
            <div className="grid grid-cols-2  h-128 ">
              <div className='col-start-2 p-4 topslider   '>
                <div className="text-white  text-2xl mt-24 mb-4 leading-7">
                The Cross-Chain DEX on BSC network with a STEEM, RIZON Blockchain.
                </div>
                <div className="text-gray-300 text-lg  leading-6">
                RobiniaSwap utilizes a cross-chain bridge to make DeFi services more accessible to various users.
                </div>
              </div>
            </div>
          </div>
          {/* <div className="h-full  md:h-full lg:h-96">
            <div className="grid grid-cols-2    h-128">
              <div className='col-start-2 p-4 topslider'>
                <div className="text-white text-2xl mt-24 mb-4 leading-7">
                The Cross-Chain DEX on BSC network with a STEEM, RIZON Blockchain.
                </div>
                <div className="text-gray-300 text-lg leading-6">
                RobiniaSwap utilizes a cross-chain bridge to make DeFi services more accessible to various users.
                </div>
              </div>
            </div>
          </div> */}
        </Slider>
      </div>
    </div>
  )
}

export default TopSliderCard
