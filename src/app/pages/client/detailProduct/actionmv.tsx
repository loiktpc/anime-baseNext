import { FaBookmark, FaPlay, FaThumbsUp } from "react-icons/fa";

function ActionBtn() {
    return ( <>
        <div className="boxStartMovie flex justify-between p-3">
                <div className="flex">
                    <div className="PlayMovie">
                       <button className="py-2 px-4 btnmovie playmv">
                       <FaPlay/>
                       </button>
                    </div>
                    <div className="FlowMovie">
                       <button className="py-2 px-4 btnmovie flowmv">
                       <FaBookmark/>
                       </button>
                    </div>
                </div>
                <div>
                    <button className="py-2 px-4 btnmovie likemv">
                        <FaThumbsUp />
                    </button>
                </div>
            </div>
    </> );
}

export default ActionBtn;