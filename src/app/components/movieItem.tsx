import "../sass/movieItem.scss";

function MovieItem(e : any) {
   
    
    
    return (
        <>
            <div className="moviesItem">
                <div className="practice">{e.data?.total_tap}</div>
                <img 
                    className="h-[266px]"
                    src={e.data?.img}
                    alt=""
                />
                <div className="Evaluate">{e.data?.star_mv}</div>
            </div>
        </>
    );
}

export default MovieItem;
