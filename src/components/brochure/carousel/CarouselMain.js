import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {Image, Icon, Button} from 'semantic-ui-react'
import Slider from 'react-slick'

const sampleImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/1215201531538PMHedges-Park--Condominium-Interior-Design-01.jpg?alt=media&token=96be9951-fae9-484c-84a1-02fa3d5b4292'

const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true
    }

class Carousell extends React.Component {

  render () {
    return (
      <div id='carousell-box'>
        <Slider {...settings}>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
          <div style={{padding: '5px'}}><Image src={sampleImage} /></div>
        </Slider>
      </div>
    )
  }

}

export default Carousell
