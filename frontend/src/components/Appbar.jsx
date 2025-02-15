export const Appbar = ()=>{
    return(
      <div className="flex justify-between items-center">
      <div className="text-3xl font-bold flex flex-col p-5">
      Payments App
      </div>
      
      <div className="flex p-5 pr-10 text-xl items-center">
          <div className="pr-3">Hello, User</div>
      
        <div className="flex p-3 rounded-full w-10 h-10 bg-red-100 ">
                <button className="flex justify-center items-center  ">U</button>
        </div>

        
      </div>
          
      </div>
      
    )
}