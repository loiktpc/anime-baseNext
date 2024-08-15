function ItemInfoMovie({data} : any) {
    console.log(data);
    
    return (
        <>
            <div className="flex p-2 gach">
                <div className=" flex-1"> {data?.topic}</div>{" "}
                <div className="flex-1">
                    {" "}
                   {data?.name}{" "}
                </div>
            </div>
        </>
    );
}

export default ItemInfoMovie;
