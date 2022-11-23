import React from 'react';

export interface HomePageProps {
  
}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const [modal, setModal] = React.useState(false);
const handleContact = () => {
  setModal((p) => !p); 
}

  return (
    <>
  {
    modal &&  
    <div
          className=" z-20 fixed flex flex-col w-full h-1/4 rounded-md justify-center items-center"
        >

<div className="fixed w-1/2 bg-gray-400 flex flex-col mx-auto p-10 justify-center">
    <button onClick={handleContact} className="absolute top-0 bg-red-700 text-white rounded-md p-1">X</button>

    <textarea defaultValue="write someThing ... " className=" rounded-md outline-none w-3/4 p-2 mx-auto mb-2"/>

    <button className="bg-gray-800 p-2 rounded-md text-white w-16 mx-auto">Submit</button>
   </div>

        </div>
  }

  
      <div className="bg-gray-100 m-3 p-4 rounded-sm">
          <div className="flex flex-row w-full justify-between ">
            <button className="bg-green-800 p-2 rounded-md text-white" onClick={handleContact}>Contact</button>
            <button className="bg-gray-800 p-2 rounded-md text-white">Auth</button>
          </div>
          
          <div className=" rounded-md w-4/5 h-72 bg-gray-200 mx-auto flex flex-row justify-center items-center">
            <h1 className="text-3xl">Lorem ipsum dolor sit amet consectetur</h1>
          </div>
          
          
          <div className="rounded-md w-4/5 bg-gray-200 mt-10 mx-auto flex flex-col">
          <div className="mx-auto p-4 ">
              <input type="text" placeholder="Search ... " className=" rounded-md outline-none w-full p-2"/>
          </div>
          <div className="mx-auto mt-10 w-4/5 grid grid-cols-4 gap-3">
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
            <div className="bg-gray-800 h-96">
                <h1>HELLO</h1>
            </div>
          </div>
          </div>
        
       
        
        
        </div>
        <div className="bg-black text-white p-3 w-full">
            <h1>made with love</h1>
          </div>
    </>
  );
}

export default HomePage;