import { imgUrl2 } from './constants';

export function HeroImg() {

  return (
    <div className='h-screen overflow-hidden relative'>
      <div className='absolute top-32 flex flex-col justify-center items-center w-full'>
        <p className='text-white text-6xl' >Give people what they need</p>
        <p className='text-white text-6xl' >to solve their problem, </p>
        <p className='text-white text-6xl' >and nothing more.</p>
        <p className='text-2xl mt-4 text-slate-300' >『Asher Yang, a software developer』</p>
      </div>
      <div className='overlay bg-gray-700 w-full h-full absolute opacity-30'></div>
      <img className='object-cover w-full' src={imgUrl2} alt="lamp" />
    </div>
  )
}
