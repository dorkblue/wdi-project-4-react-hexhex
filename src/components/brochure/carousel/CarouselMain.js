import React from 'react'
import {Carousel} from 'react-responsive-carousel'

const sampleImage = 'https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/1215201531538PMHedges-Park--Condominium-Interior-Design-01.jpg?alt=media&token=96be9951-fae9-484c-84a1-02fa3d5b4292'

class Carousell extends React.Component {

  render () {
    return (
      <div style={{width: '55%'}}>
        <Carousel>
          <div>
            <img src={sampleImage} />
            <p className='legend'>Legend 1</p>
          </div>
          <div>
            <img src={sampleImage} />
            <p className='legend'>Legend 2</p>
          </div>
          <div>
            <img src={sampleImage} />
            <p className='legend'>Legend 3</p>
          </div>
        </Carousel>

      </div>
    )
  }

}

export default Carousell
