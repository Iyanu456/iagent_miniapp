

export default function WalletTab(props: any) {
  

  return (
    <main className='w-[100vw] grid h-[100vh] pt-[7.5em]'>
         <div className="flex flex-col gap-[0.6em] text-center">
          <p className="text-gray-400">Balance:</p>
      {props.balance !== null && (
        <p className="font-semibold text-[2.2em] text-center">{props.balance} INJ</p>
      )}
      
      {/*address && <p className="text-gray-700">Address: {address}</p>*/}
      {props.error && <p className="text-white">{props.error}</p>}
    </div>
    </main>
   
  );
}
