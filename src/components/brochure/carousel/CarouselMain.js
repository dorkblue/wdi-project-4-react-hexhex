import React from 'react'
import {Carousel} from 'react-responsive-carousel'

class Carousell extends React.Component {

  render () {
    return (
      <div>
        <Carousel>
          <div>
            <img src='https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554' />
            <p className='legend'>Legend 1</p>
          </div>
          <div>
            <img src='https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554' />
            <p className='legend'>Legend 2</p>
          </div>
          <div>
            <img src='https://firebasestorage.googleapis.com/v0/b/project-hex-hex.appspot.com/o/Alfons.png?alt=media&token=c897dfd1-882b-4792-9d7a-beb6227c1554' />
            <p className='legend'>Legend 3</p>
          </div>
        </Carousel>
      </div>
    )
  }

}

export default Carousell
