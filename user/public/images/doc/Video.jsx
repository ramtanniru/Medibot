import React from 'react'
import Contact from '../components/Abt_comp/Contact'
import History from '../components/Abt_comp/History'
 import H5 from '../components/P1_comp/h5'
import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import img7 from './7.jpg'
import img8 from './8.jpg'
import Doc from '../components/Doc'
const Video = () => {
    const arr = [
        {name:'Ram',
    spec:'orthopedic',
    img: img1,
},
        {name:'Kadambini',
    spec:'Neurologist',
    img: img2,
},
        {name:'Jemison ',
    spec:'Pediatrician',
    img: img3,
},
        {name:'Roberta ',
    spec:'Physician',
    img: img4,
},
        {name:'Samu',
    spec:'Paramedic ',
    img: img5,
},
        {name:'Tafadzwa ',
    spec:'Surgeon ',
    img: img6,
},
        {name:'Capricia ',
    spec:'ENT ',
    img: img7,
},
        {name:'Vlasis  ',
    spec:'Nurse ',
    img: img8,
},
    ];
  return (
    <div>
      <h3>These are Your Docs</h3>
    <div className='p-3 d-flex flex-wrap gap-3 justify-content-between '>
      

        {
            arr.map((x,i)=>(
                <Doc arr = {x}/>
            ))
        }
    </div>
    </div>
  )
}

export default Video
