


export default function ProfileTab(props: any) {
    return (
        <div className="w-[100vw] h-[100vh] grid place-items-center">
            <h2>Profile Tab</h2>
            {props.address !== null && (
        <p className=" px-6 py-1 mt-[2em] bg-gray-800 w-[fit-content] mx-auto rounded-2xl text-center">{props.address}</p>
      )}
        </div>
    );
}