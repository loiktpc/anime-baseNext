function LinkMovie({data} : any) 
{ 

    return ( <>
        <div className="WparperLinkMV">
            <h2>Phim Liên Kết</h2>
            <div className="listLinkMv">
                {data.map((e :any , index : number)=>{
                    return (
                        <div key={index}>
                        <button className="btnLinkmv ">Phần {e.name_practice}</button>
                    </div>
                    )
                })}
               
               
            </div>
        </div>
    </> );
}

export default LinkMovie;