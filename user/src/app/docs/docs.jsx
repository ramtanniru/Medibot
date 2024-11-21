import Image from "next/image";
import Link from "next/link";
const Doc = ({ doctor }) => {
  const roomId = doctor.email.split('@')[0];
  return (
    <div className='flex flex-col gap-3 rounded-md shadow p-5 border-slate-700 border'>
      <div className="overflow-hidden h-72">
        <Image
        src={doctor.image}
        alt={doctor.name}
        className="dark:block"
        height={250}
        width={250}
          />
      </div>
  
      <div className='flex flex-col gap-3'>

        <h4 className='text-xl font-bold m-0'>
          Dr. {doctor.name}
        </h4>
        <div className='flex flex-row justify-between items-center gap-3'>
          <p className='m-0'>{doctor.specialization}</p>
          <div className="flex flex-row items center gap-3">
            <Link className=' bg-green-700 rounded-lg text-white p-2' href={`https://api.whatsapp.com/send?phone=${doctor.phone}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
               <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </Link>
            <Link className={`bg-primary rounded-lg p-2 text-white ${doctor.status==='inactive' && `hidden`}`} href={`https://medibot-doctor.vercel.app/room/${roomId}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/>
                </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doc;
