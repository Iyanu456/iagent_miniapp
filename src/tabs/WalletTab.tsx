import { ArrowDown, ArrowLeftRight, ArrowUp, Copy } from "lucide-react";
import { useEffect, useState


 } from "react";
export default function WalletTab(props: any) {
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const formatAddress = (address: any) => {
    if (!address) return '';

    // Get the first 5 letters, last 3 letters, and add ellipsis in between
    const firstThree = address.slice(0, 5);
    const lastThree = address.slice(-3);
    return `${firstThree}...${lastThree}`;
  };

  const handleCopyAddress = () => {
    if (props.address) {
      navigator.clipboard.writeText(props.address);
      setShowCopied(true);
      //alert("Address copied to clipboard!"); // You can replace this with a toast or another notification
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showCopied]);

  return (
    <main className="w-[100vw] grid h-[100vh] pt-[6em] relative">
      <div className="flex flex-col gap-[0em] text-center">
        
        

        {props.balance !== null && (
          <p className="font-semibold text-[2.2em] mt-4 text-center">{props.balance} INJ</p>
        )}

        {/*props.error && <p className="text-white">{props.error}</p>*/}

        {props.address !== null && (
          <div className="relative flex items-center gap-2 justify-center px-4 mt-2  bg-gray-800 w-[fit-content] mx-auto rounded-2xl">
            <p className="text-center">{formatAddress(props.address)}</p>
            <button
              onClick={handleCopyAddress}
              className="grid place-items-center hover:bg-gray-700  rounded-full transition"
              aria-label="Copy Address"
            >
              <Copy className="text-white" height={16} width={16} />
            </button>
            {showCopied && <p className="absolute w-[100vw] top-[3.5em] text-gray-500 left-auto right-auto">copied!</p>}
          </div>
        )}

        <div className="grid gap-[2.5em] grid-cols-3 mx-auto mt-[10em] place-items-center">
          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowUp className="" height={27} width={27} color="black" />
            </div>
            <p className="text-[0.9em]">Send</p>
          </button>

          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowDown className="" height={27} width={27} color="black" />
            </div>
            <p className="text-[0.9em]">Receive</p>
          </button>

          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowLeftRight className="" height={24} width={24} color="black" />
            </div>
            <p className="text-[0.9em]">Stake</p>
          </button>
        </div>
      </div>
    </main>
  );
}
