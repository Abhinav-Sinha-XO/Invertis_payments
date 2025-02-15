import { Dashboard } from "../pages/Dashboard"

export const Balance = ({balance,error}) => {
  return(
    <div>
      <div>
        <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
      </div>
      <div>
        <div className="p-6 flex">
      <div className="flex  font-bold text-2xl justify-center">
        Your Balance...
      </div>
      
      <div className="flex justify-center pl-5 pt-1 font-bold text-xl">$
        {error && <div className="text-red-500">{error}</div>}
        {balance !==null ? (<div>{balance}</div>
      ):(
        <div>Loading...</div>
      )}
      </div>

    </div>
      </div>
    </div>
  )

}