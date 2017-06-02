import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {Image, Icon, Button, Input, Header} from 'semantic-ui-react'
import Slider from 'react-slick'
import Pictures from '../pictures/Pictures'

const sampleImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/1215201531538PMHedges-Park--Condominium-Interior-Design-01.jpg?alt=media&token=96be9951-fae9-484c-84a1-02fa3d5b4292'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true
}

const returnImage = (allCarouselPic, number) => {
  console.log('inside returnImage', allCarouselPic[number])
  if (allCarouselPic.length !== 0) {
    if (allCarouselPic[number].url !== '') {
      return allCarouselPic[number].url
    } else {
      return sampleImage
    }
  } else {
    return sampleImage
  }
}

class Caro extends React.Component {
  render () {
    console.log('props inside carousel', this.props.data)
    const allCarouselPic = this.props.data
    // console.log('carousel key', allCarouselPic[0].key)
    const buttonIcon = this.props.edit ? 'remove' : 'wizard'
    if (this.props.edit) {
      return (
        <div>
          <div id='carousel-header'>
            <Header as='h2'>
              <Icon name='image' />
              <Header.Content>
                Photos of Property
              </Header.Content>
            </Header>
            <Button icon={buttonIcon} onClick={this.props.togglePictureEdit} />
          </div>
          <div id='carousel-box'>
            <Slider {...settings}>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[0].key, 0)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 0)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[1].key, 1)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 1)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[2].key, 2)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 2)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[3].key, 3)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 3)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[4].key, 4)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 4)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <div>
                  <Input onChange={(e) => this.props.saveCarouselPic(e, allCarouselPic[5].key, 5)} style={{width: '100%'}}type='file' />
                </div>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 5)} />
              </div>
            </Slider>
          </div>

        </div>
      )
    } else {
      return (
        <div>
          <div id='carousel-header'>
            <Header as='h2'>
              <Icon name='image' />
              <Header.Content>
                Photos of Property
              </Header.Content>
            </Header>
            <Button icon={buttonIcon} onClick={this.props.togglePictureEdit} />
          </div>
          <div id='carousel-box'>
            <Slider {...settings}>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 0)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 1)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 2)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 3)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 4)} />
              </div>
              <div className='carousel-pic-box' style={{padding: '5px'}}>
                <Image className='carousel-pic' src={returnImage(allCarouselPic, 5)} />
              </div>
            </Slider>
          </div>
        </div>

      )
    }
  }

}

export default Caro
