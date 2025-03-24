import axios from "axios";
//интеграция стиля REST через сервис MOKKY.DEV

const API_BASE_URL = "https://c126588c87fabf26.mokky.dev"; //основной api адресс

export const getAll = async (params:{}) => { //функция для получения элементов для таблицы, их фильтрации
    const response = await axios.get(`${API_BASE_URL}/fancyPlaces`, {
        params,
    });
    return response.data;
};

export const post = async(obj:{}) => { //функция для отправки в бд элемента таблицы, созданного админом 
    await axios.post(`${API_BASE_URL}/fancyPlaces`, obj);
};

export const edit = async(obj:{}, id:number) => { //функция для изменения элементов таблицы
    await axios.patch(`${API_BASE_URL}/fancyPlaces/${id}`, obj)
};

export const del = async(id:number) => { //функция для удаления элементов
    await axios.delete(`${API_BASE_URL}/fancyPlaces/${id}`)
};