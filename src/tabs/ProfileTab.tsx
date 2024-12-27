


export default function ProfileTab(props: any) {
    return (
        <div className="w-[100vw] h-[90vh] grid place-items-center">
            <h2>Profile Tab</h2>
            {props.address !== null && (<>
        <p className="py-1 mt-[2em] bg-gray-800  mx-auto rounded-2xl text-center">{props.address}</p>
        <p className="py-1 mt-[2em] bg-gray-800  mx-auto rounded-2xl text-center">{props.telegramUserId}</p>
      </>)}
        </div>
    );
}