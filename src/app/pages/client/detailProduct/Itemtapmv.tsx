import Link from "next/link";

function ItemTap({data , idmv} : any ,) {
    
    
    return ( <>
    <Link href={`/pages/client/watchmovie?video=${data.link}&tap=${data.name_practice}&id=${idmv}`} className="w-[25%]">
    <div className="itemTap">{data?.name_practice}</div>
    </Link>
    </> );
}

export default ItemTap;