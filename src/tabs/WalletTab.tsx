import { ArrowDown, ArrowLeftRight, ArrowUp, Copy } from "lucide-react";

export default function WalletTab(props: any) {
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
      alert("Address copied to clipboard!"); // You can replace this with a toast or another notification
    }
  };

  return (
    <main className="w-[100vw] grid h-[100vh] pt-[7.5em]">
      <div className="flex flex-col gap-[0.6em] text-center">
        {props.walletName !== null && (
          <div className="flex gap-3 px-6 py-1 bg-gray-800 mx-auto rounded-2xl w-[7em] justify-center">
            <img src="/wallet white.svg" className="max-h-[22px] max-w-[22px]" />
            <p className="text-center">{props.walletName}</p>
          </div>
        )}

        {props.balance !== null && (
          <p className="font-semibold text-[2.2em] text-center">{props.balance} INJ</p>
        )}

        {/*props.error && <p className="text-white">{props.error}</p>*/}

        {props.address !== null && (
          <div className="flex items-center gap-2 justify-center px-6 py-1 mt-[2em] bg-gray-800 w-[fit-content] mx-auto rounded-2xl">
            <p className="text-center">{formatAddress(props.address)}</p>
            <button
              onClick={handleCopyAddress}
              className="grid place-items-center hover:bg-gray-700 p-2 rounded-full transition"
              aria-label="Copy Address"
            >
              <Copy className="text-white" height={16} width={16} />
            </button>
          </div>
        )}

        <div className="grid gap-[2.5em] grid-cols-3 mx-auto mt-5 place-items-center">
          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowUp className="" height={27} width={27} color="black" />
            </div>
            <p>Send</p>
          </button>

          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowDown className="" height={27} width={27} color="black" />
            </div>
            <p>Receive</p>
          </button>

          <button className="grid place-items-center">
            <div className="grid place-items-center mb-1 w-[3em] h-[3em] bg-[#51b0fd] rounded-full">
              <ArrowLeftRight className="" height={24} width={24} color="black" />
            </div>
            <p>Stake</p>
          </button>
        </div>
      </div>
    </main>
  );
}
