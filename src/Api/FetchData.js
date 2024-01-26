async function fetchCallList(date_start, date_end, in_out) {
  const baseUrl = 'https://api.skilla.ru/mango/getList'; 
  let url = `${baseUrl}?date_start=${date_start}&date_end=${date_end}&${in_out}&limit=500`; 

  try {
    const response = await fetch(url,
      // `https://api.skilla.ru/mango/getList?${in_out}&limit=500`,
      // `https://api.skilla.ru/mango/getList?date_start=${date_start}&date_end=${date_end}&in_out=${in_out}`,
      
      {
        headers: {
          Authorization: "Bearer testtoken",
        },
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return  response.json(); 
   
 
   
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error; 
  } 
}

export { fetchCallList };