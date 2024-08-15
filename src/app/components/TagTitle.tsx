import '../sass/TagTitle.scss'
function TagTitle({title} : any) {
    
    
    return ( <>
    <div className='wapperTagTitle mt-3'>
        <div   className='bg-black  h-10 boxtagtitle flex justify-center items-center overtitle' >
            <h3 className='text-xl font-bold '>{title}</h3>
        </div>
    </div>
    </> );
}

export default TagTitle;