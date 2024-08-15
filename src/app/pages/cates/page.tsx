// "use client"
'use client'
import "./cate.css";
import PostData from "../../service/postData";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from 'axios'



function Cates() {
    const [name , setname] = useState<any>() ;
    const [age , setage] = useState<any>() ;
    const fetcher = (url:string) => axios.get(url).then(res => res.data)
    

    const { data, error, isLoading } = useSWR(
        "https://wd18303ecmascript-default-rtdb.firebaseio.com/categories.json",
        fetcher,{
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
          }
      );
    
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";
      

    const nonNumericKeys = Object.keys(data).filter((key: string | number) => key);
    
    
    
    
    const handleClick =  (id : number) => {
        console.log(id);
        
        axios.delete(`https://wd18303ecmascript-default-rtdb.firebaseio.com/categories/${id}.json`)
        .then((res) => {
            console.log(res);
            
        });
      };
    const handleSubmit = (e : any) =>{
        
        console.log(name);
        console.log(age);
        
        
        // axios.post('/user', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }  
    return (
        <>
            <h1>A Fancy Table</h1>

            <table className="customers">
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>age</th>
                        <th>name</th>
                        <th>img</th>
                        <th>thao tác</th>
                    </tr>
                    {nonNumericKeys.map((key : any, index: number) => {          
                                const item = data[key];           
                        return (
                            <>
                                <tr key={key}>
                                    <td>{index}</td>
                                    <td>{item.age}</td>
                                    <td>{item.name}</td>
                                    <td>img</td>
                                    <td>
                                        <button  className="button">sửa</button>
                                        <button onClick={()=>{
                                            handleClick(key)
                                        }} className="button button5" >
                                            xóa 
                                        </button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">name:</label>
                <input type="text" onChange={(e)=>{
                    setname(e.target.value)
                }}/>
                <br />
                <label htmlFor="">img</label>
                <input type="file"  onChange={(e)=>{
                    setage(e.target.value)
                }}/>
                <button className="button" type="submit">
                    xác nhận
                </button>
            </form>
        </>
    );
}

export default Cates;
