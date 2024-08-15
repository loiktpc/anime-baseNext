async function PostData(endpoind : string , formData : string) {
    const res = await fetch(`https://wd18303ecmascript-default-rtdb.firebaseio.com/${endpoind}.json`, {
        method: 'POST',
        body: formData,
      })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
  export default PostData ;